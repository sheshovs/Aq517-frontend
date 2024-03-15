import API from '@/common/api'
import { API_QUERY_KEYS } from '@/common/querys/keys'
import { useEventsQuery } from '@/common/querys/useEventQuery'
import { useRoomQuery } from '@/common/querys/useRoomQuery'
import {
  Accesory,
  Event,
  Hour,
  OrderWithEvents,
  PaymentMethods,
  RoomResponse,
  Session,
} from '@/common/types'
import { hoursByDate } from '@/common/utils/format'
import dayjs, { Dayjs } from 'dayjs'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface DashboardState {
  name: string
  email: string
  phone: string
  selectedRoom?: RoomResponse
  date: Dayjs
  hoursSelected: Hour[]
  accesoriesSelected: Accesory[]
}

interface UseDashboardProps {
  onClose: () => void
}

const useDashboard = ({ onClose }: UseDashboardProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState<DashboardState>({
    name: ``,
    email: ``,
    phone: ``,
    date: dayjs(),
    hoursSelected: [],
    accesoriesSelected: [],
  })

  const { data: roomData } = useRoomQuery({})
  const rooms = useMemo(() => {
    if (!roomData) return []
    return roomData.data
  }, [roomData])

  const { name, email, phone, date, selectedRoom, hoursSelected, accesoriesSelected } = state

  const { data: events } = useEventsQuery({
    date: date?.format(`YYYY-MM-DD`) || ``,
    roomId: selectedRoom?.uuid || ``,
    options: { enabled: !!date && !!selectedRoom?.uuid },
  })

  const startTime = `10:00`
  const endTime = `21:00`

  const hours = useMemo(() => {
    let start = dayjs(`${date?.format(`YYYY-MM-DD`)} ${startTime}`)
    const end = dayjs(`${date?.format(`YYYY-MM-DD`)} ${endTime}`)
    const hours = []

    while (start.isSameOrBefore(end)) {
      hours.push(start)
      start = start.add(1, `hour`)
    }
    return hours
  }, [date])

  const disabledHours = useMemo(() => {
    if (!events?.data) return []

    const disabledHours: string[] = []
    events.data.forEach((event) => {
      let start = dayjs(`${event.date} ${event.startTime}`)
      const end = dayjs(`${event.date} ${event.endTime}`)
      while (start.isBefore(end)) {
        disabledHours.push(start.format(`HH:mm:ss`))
        start = start.add(1, `hour`)
      }
    })
    return disabledHours
  }, [events?.data])

  const sessions = useMemo(() => {
    const sessions: Session[] = []
    if (hoursSelected.length === 0) return sessions

    const hoursSortedByDate = hoursByDate(hoursSelected)

    Object.keys(hoursSortedByDate).forEach((date) => {
      const hours = hoursSortedByDate[date]
      let sessionStartTime = hours[0].hour.format(`HH:mm`)
      let start = dayjs(`${date} ${sessionStartTime}`)
      hours.forEach((hour, i) => {
        if (hour.hour.format(`HH:mm`) !== start.format(`HH:mm`)) {
          sessions.push({
            startTime: sessionStartTime,
            endTime: start.format(`HH:mm`),
            date: hour.hour,
            room: hour.room,
          })

          while (hour.hour.format(`HH:mm`) !== start.subtract(1, `hour`).format(`HH:mm`)) {
            start = start.add(1, `hour`)
          }

          sessionStartTime = hour.hour.format(`HH:mm`)
        }

        if (i === hours.length - 1) {
          sessions.push({
            startTime: sessionStartTime,
            endTime: hour.hour.add(1, `hour`).format(`HH:mm`),
            date: hour.hour,
            room: hour.room,
          })
        }

        if (hour.hour.format(`HH:mm`) === start.format(`HH:mm`)) {
          sessionStartTime = sessionStartTime ? sessionStartTime : start.format(`HH:mm`)
          start = start.add(1, `hour`)
        }
      })
    })

    return sessions
  }, [hoursSelected])

  const totalPrice = useMemo(() => {
    let total = 0
    hoursSelected.forEach((hour) => {
      total += hour.room.price
    })

    accesoriesSelected.forEach((accesory) => {
      total += accesory.price
    })

    return total
  }, [hoursSelected, accesoriesSelected])

  useEffect(() => {
    if (!rooms.length) {
      return
    }
    setState((prevState) => ({
      ...prevState,
      selectedRoom: rooms[0],
    }))
  }, [rooms])

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      selectedRoom: e.target.value as unknown as RoomResponse,
    }))
  }

  const handleDateChange = (date: Dayjs | null): void => {
    if (date) {
      setState((prevState) => ({
        ...prevState,
        date,
      }))
    }
  }

  const resetState = (): void => {
    setState({
      name: ``,
      email: ``,
      phone: ``,
      date: dayjs(),
      hoursSelected: [],
      accesoriesSelected: [],
    })
    onClose()
  }

  const onAddOrder = (): void => {
    const events: Event[] = sessions.map((item) => {
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
    const order: OrderWithEvents = {
      attendant: name,
      email,
      phone: `+569${phone}`,
      events,
      totalPrice,
      paymentMethod: PaymentMethods.PRESENCIAL,
    }
    createOrderWithEvents(order)
  }
  const queryClient = useQueryClient()

  const { mutate: createOrderWithEvents } = useMutation(
    (payload: OrderWithEvents) => API.order.createWithEvents(payload),
    {
      onSuccess: (res) => {
        const date = res.data.date
        const month = dayjs(date).format(`YYYY-MM`)
        queryClient.invalidateQueries(API_QUERY_KEYS.getAllEventsByMonth(month))
        queryClient.invalidateQueries(API_QUERY_KEYS.getAllOrders)

        enqueueSnackbar(`Se creó la orden correctamente`, {
          variant: `success`,
        })
        resetState()
      },
      onError: () => {
        enqueueSnackbar(`Error al crear orden`, {
          variant: `error`,
        })
      },
    },
  )

  return {
    ...state,
    rooms,
    hours,
    disabledHours,
    sessions,
    totalPrice,
    handleChange,
    handleRoomChange,
    handleDateChange,
    onClickHour,
    onClickAccesory,
    resetState,
    onAddOrder,
  }
}

export default useDashboard
