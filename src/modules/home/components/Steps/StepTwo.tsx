import { Icon } from '@/common/components'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSnackbar } from 'notistack'
import CustomButton from '@/common/components/Button'
import { Dayjs } from 'dayjs'
import { ReserveInitialState } from '../../hooks/useReserve'
import { useEventsQuery } from '@/common/querys/useEventQuery'
import { useMemo, useState } from 'react'
import { Accesory, RoomResponse, Session } from '@/common/types'
import dayjs from 'dayjs'
import { hoursByDate } from '../../../../common/utils/format'

enum Option {
  SI = `si`,
  NO = `no`,
}

interface StepTwoProps {
  state: ReserveInitialState
  rooms: RoomResponse[]
  hours: Dayjs[]
  setStep: (step: number) => void
  setSelectedDate: (selectedDate: Dayjs | null) => void
  setRoomSelected: (room: RoomResponse) => void
  onClickHour: (hour: Dayjs) => void
  onClickAccesory: (accesory: Accesory) => void
  onAddToCart: (sessions: Session[]) => void
}

const StepTwo = ({
  state,
  rooms,
  hours,
  setStep,
  setSelectedDate,
  setRoomSelected,
  onClickHour,
  onClickAccesory,
  onAddToCart,
}: StepTwoProps): JSX.Element => {
  const {
    palette: { main, primary, black },
  } = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const { selectedDate, selectedRoom, hoursSelected, accesoriesSelected } = state
  const [addAccesories, setAddAccesories] = useState(`no`)
  const [expanded, setExpanded] = useState<string>(``)
  const { data: events } = useEventsQuery({
    date: selectedDate?.format(`YYYY-MM-DD`) || ``,
    roomId: selectedRoom?.uuid || ``,
    options: { enabled: !!selectedDate },
  })

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
    if (addAccesories === Option.SI) {
      accesoriesSelected.forEach((accesory) => {
        total += accesory.price
      })
    }

    return total
  }, [hoursSelected, accesoriesSelected, addAccesories])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddAccesories(event.target.value)
  }

  return (
    <>
      <Grid
        container
        item
        lg={10}
        xs={12}
        gap={{ xs: 6, lg: 10.5 }}
        justifyContent="space-between"
        marginBottom={8}
      >
        <Grid container xs={12} md>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DateCalendar
              defaultValue={selectedDate}
              showDaysOutsideCurrentMonth
              disablePast
              onChange={(date) => setSelectedDate(date)}
              dayOfWeekFormatter={(dayOfWeek) => dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1, 3)}
              sx={{
                minHeight: 362,
                bgcolor: main.white,
                color: black.main,
                borderRadius: 1.25,
                boxShadow: `0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 5px 5px -3px rgba(0, 0, 0, 0.20);`,
                button: {
                  lineHeight: 1.5 + `!important`,
                  transition: `all .2s ease`,
                  '&:focus': {
                    backgroundColor: `${primary.main} !important`,
                  },
                  '&:hover': {
                    backgroundColor: `${primary.main}33 !important`,
                  },
                  '&.Mui-selected': {
                    backgroundColor: `${primary.main} !important`,
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid container item xs={12} md justifyContent="space-between">
          <Grid container item xs={12} flexDirection="column" gap={1.25}>
            <Typography variant="h4">{selectedDate?.format(`dddd DD [de] MMMM`)}</Typography>
            <Grid container paddingY={1.25} gap={2.5}>
              <Typography variant="h5" width="60px">
                Sala:
              </Typography>

              <Grid container item xs gap={{ lg: 2.5, xs: 2 }}>
                {rooms.map((room, i) => (
                  <CustomButton
                    key={i}
                    variant={selectedRoom?.name === room.name ? `contained` : `outlined`}
                    onClick={() => setRoomSelected(room)}
                    text={room.name}
                    width={70}
                  />
                ))}
              </Grid>
            </Grid>
            {selectedRoom?.name ? (
              <Grid container paddingY={1.25} gap={2.5}>
                <Typography variant="h5" width="60px">
                  Horas:
                </Typography>

                <Grid container item xs gap={1.25}>
                  <Grid container gap={{ lg: 2.5, xs: 2 }}>
                    {hours.map((hour, i) => {
                      const index = hoursSelected.findIndex(
                        (item) => item.hour.isSame(hour) && item.room.uuid === selectedRoom?.uuid,
                      )
                      const isSelected = index !== -1
                      const disabled = disabledHours.includes(hour.format(`HH:mm:ss`))
                      return (
                        <CustomButton
                          key={i}
                          text={hour.format(`HH:mm`)}
                          onClick={() => onClickHour(hour)}
                          disabled={disabled}
                          variant={isSelected ? `contained` : `outlined`}
                          width={70}
                        />
                      )
                    })}
                  </Grid>

                  <Collapse in={hoursSelected.length > 0}>
                    <Grid container>
                      <Typography variant="subtitle1" fontWeight={500}>
                        Horas seleccionadas: {hoursSelected.length}
                      </Typography>
                    </Grid>
                  </Collapse>
                </Grid>
              </Grid>
            ) : null}

            <Collapse in={sessions.length > 0}>
              <Grid container gap={2.5}>
                <FormControl>
                  <Grid container gap={1}>
                    <Typography variant="text">¿Desea añadir accesorios?</Typography>
                    <Tooltip title="Añadir texto sobre los accesorios" arrow placement="top">
                      <span>
                        <Icon
                          icon="help"
                          sx={{
                            cursor: `help`,
                            fontSize: 20,
                          }}
                        />
                      </span>
                    </Tooltip>
                  </Grid>
                  <RadioGroup row value={addAccesories} onChange={handleChange}>
                    <FormControlLabel
                      value={Option.SI}
                      control={
                        <Radio
                          sx={{
                            color: `common.white`,
                            '&.Mui-checked': {
                              color: `common.white`,
                            },
                          }}
                        />
                      }
                      label="Si"
                    />
                    <FormControlLabel
                      value={Option.NO}
                      control={
                        <Radio
                          sx={{
                            color: `common.white`,
                            '&.Mui-checked': {
                              color: `common.white`,
                            },
                          }}
                        />
                      }
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Collapse>
            <Collapse in={addAccesories === Option.SI && sessions.length > 0}>
              <Grid container paddingBottom={1.25} gap={1.5}>
                <Typography variant="h5">Sesiones: </Typography>
                <Grid container gap={1}>
                  {sessions.map((session, i) => {
                    return (
                      <Accordion
                        key={i}
                        disableGutters
                        expanded={expanded === `${i}`}
                        onChange={() => {
                          if (expanded === `${i}`) {
                            setExpanded(``)
                            return
                          }
                          setExpanded(`${i}`)
                        }}
                        sx={{
                          backgroundColor: `transparent`,
                          width: `100%`,
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{
                            backgroundColor: `common.white`,
                            borderRadius: expanded === `${i}` ? `5px 5px 0 0` : `5px`,
                          }}
                        >
                          <Typography variant="h6">
                            {session.startTime} a {session.endTime} | {session.date.format(`DD`)} de
                            {` `}
                            {session.date.format(`MMMM`)}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            border: `1px solid #fff`,
                            paddingY: 1.25,
                            borderRadius: `0 0 5px 5px`,
                          }}
                        >
                          <Grid container gap={{ lg: 2.5, xs: 2 }}>
                            {selectedRoom?.items.map((accessory, i) => {
                              const index = accesoriesSelected.findIndex(
                                (item) =>
                                  item.name === accessory.name &&
                                  item.session.date.isSame(session.date) &&
                                  item.session.startTime === session.startTime &&
                                  item.session.endTime === session.endTime,
                              )
                              const isSelected = index !== -1
                              return (
                                <CustomButton
                                  key={i}
                                  text={accessory.name}
                                  disabled={!accessory.isActive}
                                  variant={isSelected ? `contained` : `outlined`}
                                  onClick={() => {
                                    const accesory = {
                                      uuid: accessory.uuid,
                                      name: accessory.name,
                                      price: accessory.price,
                                      session: session,
                                    }
                                    onClickAccesory(accesory)
                                  }}
                                />
                              )
                            })}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    )
                  })}
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <Grid container item xs={12} paddingY={1.25} gap={2.5} alignItems="center">
            <Typography variant="h5" width="60px">
              Valor:
            </Typography>

            <Typography variant="h2">${totalPrice.toLocaleString(`es-CL`)}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        gap={2}
        alignItems={{
          xs: `center`,
          sm: `center`,
        }}
        flexDirection={{
          xs: `column-reverse`,
          sm: `row`,
        }}
      >
        <Button
          startIcon={<Icon icon="arrowBack" />}
          onClick={() => setStep(1)}
          sx={{
            width: 150,
            height: 54,
            paddingLeft: 1.5,
            paddingRight: 2,
            borderColor: main.white,
            color: main.white,
            ':hover': {
              borderColor: main.white,
              backgroundColor: `${main.whiteBackground}33`,
            },
          }}
        >
          Volver
        </Button>
        <Button
          variant="outlined"
          endIcon={<Icon icon="addShoppingCart" />}
          onClick={() => {
            if (hoursSelected.length === 0) {
              enqueueSnackbar(`Debes seleccionar al menos una hora`, { variant: `error` })
              return
            }
            onAddToCart(sessions)
          }}
          sx={{
            width: 220,
            height: 54,
            paddingLeft: 2,
            paddingRight: 2,
            borderColor: main.white,
            color: primary.main,
            backgroundColor: main.white,
            ':hover': {
              borderColor: main.white,
              backgroundColor: main.whiteBackground,
            },
          }}
        >
          Añadir al carrito
        </Button>
      </Grid>
    </>
  )
}

export default StepTwo
