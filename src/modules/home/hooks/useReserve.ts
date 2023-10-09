import { useMemo, useState } from 'react'
import dayjs from '../../../common/settings/dayjs'
import { Dayjs } from 'dayjs'

interface InitialState {
  step: number
  selectedDate: Dayjs | null
  room: string
  hoursSelected: Dayjs[]
}

const initialState = {
  step: 1,
  selectedDate: dayjs(),
  room: `music`,
  hoursSelected: [],
}
const useReserve = () => {
  const [state, setState] = useState<InitialState>(initialState)

  const { selectedDate } = state

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

  const setStep = (step: number): void => {
    setState({ ...state, step })
  }

  const setSelectedDate = (selectedDate: dayjs.Dayjs | null): void => {
    setState({ ...state, selectedDate })
  }

  const setRoom = (room: string): void => {
    setState({ ...state, room })
  }

  const onClickHour = (hour: Dayjs): void => {
    const { hoursSelected } = state
    const index = hoursSelected.findIndex((item) => item.isSame(hour))
    if (index === -1) {
      setState({ ...state, hoursSelected: [...hoursSelected, hour] })
    } else {
      hoursSelected.splice(index, 1)
      setState({ ...state, hoursSelected: [...hoursSelected] })
    }
  }

  return { state, hours, setStep, setSelectedDate, setRoom, onClickHour }
}

export default useReserve
