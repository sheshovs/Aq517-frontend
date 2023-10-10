import { useMemo, useState } from 'react'
import dayjs from '../../../common/settings/dayjs'
import { Dayjs } from 'dayjs'
import { emailRegex, numberRegex } from '@/common/utils/regex'
import { useSnackbar } from 'notistack'

export interface ReserveInitialState {
  userInfo: {
    name: string
    email: string
    phone: string
  }
  step: number
  selectedDate: Dayjs | null
  room: string
  hoursSelected: { hour: Dayjs; room: string }[]
}

const initialState = {
  userInfo: {
    name: ``,
    email: ``,
    phone: ``,
  },
  step: 1,
  selectedDate: dayjs(),
  room: `music`,
  hoursSelected: [],
}
const useReserve = () => {
  const [state, setState] = useState<ReserveInitialState>(initialState)
  const { enqueueSnackbar } = useSnackbar()

  const {
    selectedDate,
    userInfo: { name, email, phone },
  } = state

  const startTime = `10:00`
  const endTime = `20:00`

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

  const setRoom = (room: string): void => {
    setState({ ...state, room })
  }

  const setHoursSelected = (hoursSelected: { hour: Dayjs; room: string }[]): void => {
    setState({ ...state, hoursSelected })
  }

  const onClickHour = (hour: Dayjs): void => {
    const { hoursSelected } = state
    const index = hoursSelected.findIndex(
      (item) => item.hour.isSame(hour) && item.room === state.room,
    )
    if (index === -1) {
      setState({
        ...state,
        hoursSelected: [
          ...hoursSelected,
          {
            hour,
            room: state.room,
          },
        ],
      })
    } else {
      hoursSelected.splice(index, 1)
      setState({ ...state, hoursSelected: [...hoursSelected] })
    }
  }

  return {
    state,
    hours,
    handleChange,
    setStep,
    setSelectedDate,
    setRoom,
    setHoursSelected,
    onClickHour,
  }
}

export default useReserve
