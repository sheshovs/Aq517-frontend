import { useMemo, useState, useEffect } from 'react'
import dayjs from '../../../common/settings/dayjs'
import { Dayjs } from 'dayjs'
import { emailRegex, numberRegex } from '@/common/utils/regex'
import { useSnackbar } from 'notistack'
import { Accesory, Event, EventResponse, Hour, RoomResponse, Session } from '@/common/types'
import { useMutation, useQueryClient } from 'react-query'
import API from '@/common/api'
import { useCart } from '@/common/context/CartContext'
import { API_QUERY_KEYS } from '@/common/querys/keys'
import axios from 'axios'
import { socket } from '@/config/io'
import { useRoomQuery } from '@/common/querys/useRoomQuery'

export interface ReserveInitialState {
  userInfo: {
    name: string
    email: string
    phone: string
  }
  step: number
  selectedDate: Dayjs | null
  selectedRoom?: RoomResponse
  hoursSelected: Hour[]
  accesoriesSelected: Accesory[]
}

const initialState = {
  userInfo: {
    name: ``,
    email: ``,
    phone: ``,
  },
  step: 1,
  selectedDate: dayjs(),
  hoursSelected: [],
  accesoriesSelected: [],
}
const useReserve = () => {
  const [state, setState] = useState<ReserveInitialState>(initialState)
  const { enqueueSnackbar } = useSnackbar()
  const { cartState, addToCart, setCartState } = useCart()
  const { data: roomData } = useRoomQuery({})

  const {
    selectedDate,
    userInfo: { name, email, phone },
  } = state

  const rooms = useMemo(() => {
    if (!roomData) return []
    return roomData.data
  }, [roomData])

  const startTime = `10:00`
  const endTime = `21:00`

  const hours = useMemo(() => {
    let start = dayjs(`${selectedDate?.format(`YYYY-MM-DD`)} ${startTime}`)
    const end = dayjs(`${selectedDate?.format(`YYYY-MM-DD`)} ${endTime}`)
    const hours = []

    while (start.isSameOrBefore(end)) {
      hours.push(start)
      start = start.add(1, `hour`)
    }
    return hours
  }, [selectedDate])

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!rooms.length) {
      return
    }
    setRoomSelected(rooms[0])
  }, [rooms])

  useEffect(() => {
    socket.on(`deleteEvent`, (eventUuidsToDelete: string[]) => {
      const { cartItems } = cartState
      const eventsFiltered = cartItems.filter((item) => !eventUuidsToDelete.includes(item.uuid))
      setCartState({ ...cartState, cartItems: eventsFiltered })
      const roomId = `${state.selectedRoom?.uuid}`
      const date = selectedDate?.format(`YYYY-MM-DD`) || ``
      queryClient.invalidateQueries(API_QUERY_KEYS.getAllEvents(date, roomId))
    })

    return () => {
      socket.off(`deleteEvent`)
    }
  }, [socket])

  const { mutate: createEvents } = useMutation((payload: Event[]) => API.event.block(payload), {
    onSuccess: (res) => {
      const events: EventResponse[] = res.data.events
      const date = selectedDate?.format(`YYYY-MM-DD`) || ``
      const roomId = `${state.selectedRoom?.uuid}`
      queryClient.invalidateQueries(API_QUERY_KEYS.getAllEvents(date, roomId))
      addToCart(events)
      enqueueSnackbar(`Se agregaron horas correctamente`, {
        variant: `success`,
      })
    },
    onError: (error) => {
      const roomId = `${state.selectedRoom?.uuid}`
      queryClient.invalidateQueries(
        API_QUERY_KEYS.getAllEvents(selectedDate?.format(`YYYY-MM-DD`) || ``, roomId),
      )
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(error.response?.data.message, {
          variant: `error`,
        })
      }
    },
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target

    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [name]: value,
      },
    })
  }

  const setStep = (step: number): void => {
    if (name.trim().length < 3) {
      enqueueSnackbar(`El nombre debe tener al menos 3 caracteres`, { variant: `error` })
      return
    }
    if (!emailRegex.test(email)) {
      enqueueSnackbar(`El correo electrónico no es válido`, { variant: `error` })
      return
    }
    if (!numberRegex.test(phone)) {
      enqueueSnackbar(`El teléfono no es válido`, { variant: `error` })
      return
    }
    if (phone.trim().length !== 8) {
      enqueueSnackbar(`El teléfono debe tener 8 dígitos`, { variant: `error` })
      return
    }
    if (name.trim() === `` || email.trim() === `` || phone.trim() === ``) {
      enqueueSnackbar(`Todos los campos son obligatorios`, { variant: `error` })
      return
    }
    setState({ ...state, step })
  }

  const setSelectedDate = (selectedDate: dayjs.Dayjs | null): void => {
    setState({ ...state, selectedDate })
  }

  const setRoomSelected = (room: RoomResponse): void => {
    setState({ ...state, selectedRoom: room })
  }

  const setHoursSelected = (hoursSelected: Hour[]): void => {
    setState({ ...state, hoursSelected })
  }

  const setAccesoriesSelected = (accesoriesSelected: Accesory[]): void => {
    setState({ ...state, accesoriesSelected })
  }

  const onClickHour = (hour: Dayjs): void => {
    const { hoursSelected } = state
    const index = hoursSelected.findIndex(
      (item) => item.hour.isSame(hour) && item.room.uuid === state.selectedRoom?.uuid,
    )
    if (index === -1 && state.selectedRoom?.uuid) {
      setState({
        ...state,
        hoursSelected: [
          ...hoursSelected,
          {
            hour,
            room: state.selectedRoom,
          },
        ],
        accesoriesSelected: [],
      })
    } else {
      hoursSelected.splice(index, 1)
      setState({ ...state, hoursSelected: [...hoursSelected], accesoriesSelected: [] })
    }
  }

  const onClickAccesory = (accesory: Accesory): void => {
    const { accesoriesSelected } = state
    const index = accesoriesSelected.findIndex(
      (item) => item.name === accesory.name && item.session === accesory.session,
    )
    if (index === -1) {
      setState({
        ...state,
        accesoriesSelected: [...accesoriesSelected, accesory],
      })
    } else {
      accesoriesSelected.splice(index, 1)
      setState({ ...state, accesoriesSelected: [...accesoriesSelected] })
    }
  }

  const onAddToCart = (sessions: Session[]): void => {
    const payload: Event[] = sessions.map((item) => {
      const accesories = state.accesoriesSelected.filter((accesory) => accesory.session === item)
      return {
        title: `Sala ${item.room.name}`,
        date: item.date.format(`YYYY-MM-DD`),
        startTime: item.startTime,
        endTime: item.endTime,
        email,
        phone: `+569${phone}`,
        attendant: name,
        room: item.room,
        accesories,
      }
    })
    createEvents(payload)
    setState({
      ...state,
      hoursSelected: [],
      accesoriesSelected: [],
    })
  }

  return {
    state,
    rooms,
    hours,
    handleChange,
    setStep,
    setSelectedDate,
    setRoomSelected,
    setHoursSelected,
    setAccesoriesSelected,
    onClickHour,
    onClickAccesory,
    onAddToCart,
  }
}

export default useReserve
