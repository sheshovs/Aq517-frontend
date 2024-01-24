import React from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import {
  Grid,
  Typography,
  Popover,
  useTheme,
  useMediaQuery,
  Theme,
  Black,
  ButtonGroup,
  Button,
} from '@mui/material'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { EventCalendar, RoomNames } from '@/common/types'
import dayjs from '../../../common/settings/dayjs'

interface ComponentEventProps {
  event: EventCalendar
  setSelectedEvent: (event: EventCalendar) => void
  selectedEvent: EventCalendar | null
  black: Black
}

const ComponentEvent = ({
  event,
  setSelectedEvent,
  selectedEvent,
  black,
}: ComponentEventProps): JSX.Element => {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <>
          <Grid container height="100%">
            <Grid
              container
              height="95%"
              bgcolor={event.room.name === RoomNames.AQVILES ? `black.mainFooter` : `primary.main`}
              onClick={(e) => {
                setSelectedEvent(event)
                bindTrigger(popupState).onClick(e)
              }}
              {...bindTrigger(popupState).onTouchStart}
              paddingY={0.25}
              paddingX={0.625}
              sx={{
                borderRadius: 1,
                border: `1px solid ${black.main}33`,
              }}
            >
              <Typography variant="subtitle1">{event.title}</Typography>
            </Grid>
          </Grid>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: `bottom`,
              horizontal: `center`,
            }}
            transformOrigin={{
              vertical: `top`,
              horizontal: `center`,
            }}
          >
            <Grid container maxWidth={400} paddingX={4} paddingY={3} gap={2} flexDirection="column">
              <Grid container gap={0.5}>
                <Grid container>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    Información de la reserva
                  </Typography>
                </Grid>
                <Grid container gap={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Dia:
                  </Typography>
                  <Typography variant="subtitle1">
                    {dayjs(selectedEvent?.date).format(`dddd DD`)}
                  </Typography>
                </Grid>
                <Grid container gap={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Sala:
                  </Typography>
                  <Typography variant="subtitle1">{`${selectedEvent?.room.name}`}</Typography>
                </Grid>
                <Grid container gap={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Horario:
                  </Typography>
                  <Typography variant="subtitle1">{`${selectedEvent?.startTime.slice(
                    0,
                    5,
                  )} - ${selectedEvent?.endTime.slice(0, 5)}`}</Typography>
                </Grid>
              </Grid>
              <Grid container gap={0.5}>
                <Grid container>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    Información del cliente
                  </Typography>
                </Grid>
                <Grid container gap={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Por:
                  </Typography>
                  <Typography variant="subtitle1">{selectedEvent?.attendant}</Typography>
                </Grid>
                <Grid container gap={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Email:
                  </Typography>
                  <Typography variant="subtitle1">{selectedEvent?.email}</Typography>
                </Grid>
                <Grid container gap={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Teléfono:
                  </Typography>
                  <Typography variant="subtitle1">{selectedEvent?.phone}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Popover>
        </>
      )}
    </PopupState>
  )
}

interface CalendarToolbarProps {
  toolbar: any
  view: `day` | `week` | `month`
  setView: (view: `day` | `week` | `month`) => void
  mobileWidth: boolean
  setState: React.Dispatch<
    React.SetStateAction<{
      month: string
    }>
  >
}

const CalendarToolbar = ({
  toolbar,
  view,
  setView,
  mobileWidth,
  setState,
}: CalendarToolbarProps): JSX.Element => {
  const goToBack = (): void => {
    if (view === `month`) {
      const month = dayjs(toolbar.date).subtract(1, `month`).format(`YYYY-MM`)
      setState({ month })
    }
    if (view === `week`) {
      const month = dayjs(toolbar.date).subtract(1, `week`).format(`YYYY-MM`)
      setState({ month })
    }
    if (view === `day`) {
      const month = dayjs(toolbar.date).subtract(1, `day`).format(`YYYY-MM`)
      setState({ month })
    }
    toolbar.onNavigate(`PREV`)
  }

  const goToNext = (): void => {
    if (view === `month`) {
      const month = dayjs(toolbar.date).add(1, `month`).format(`YYYY-MM`)
      setState({ month })
    }
    if (view === `week`) {
      const month = dayjs(toolbar.date).add(1, `week`).format(`YYYY-MM`)
      setState({ month })
    }
    if (view === `day`) {
      const month = dayjs(toolbar.date).add(1, `day`).format(`YYYY-MM`)
      setState({ month })
    }
    toolbar.onNavigate(`NEXT`)
  }

  const goToCurrent = (): void => {
    const month = dayjs().format(`YYYY-MM`)
    setState({ month })
    toolbar.onNavigate(`TODAY`)
  }

  const label = () => {
    const toolbarDate = dayjs(toolbar.date)
    if (toolbar.view === `day`) {
      return (
        <span>
          <b>{toolbarDate.format(`dddd`)}</b>
          <span> {toolbarDate.format(`DD`)}</span>
        </span>
      )
    }
    if (toolbar.view === `week`) {
      return (
        <span>
          <b>Semana </b>
          del
          <span>
            {` `}
            {toolbarDate.day(1).format(`DD`)} al{` `}
            {toolbarDate.add(6, `day`).format(`DD`)}
          </span>
        </span>
      )
    }
    if (toolbar.view === `month`) {
      return (
        <span>
          <b>{toolbarDate.format(`MMMM`)}</b>
          <span> {toolbarDate.format(`YYYY`)}</span>
        </span>
      )
    }
  }

  return (
    <Grid container justifyContent="space-between" alignItems="center" marginBottom={3} gap={2}>
      <Grid container item md xs={12} justifyContent="center" flexDirection="column" gap={1}>
        <Typography variant="h6" textAlign="center">
          Navegación
        </Typography>
        <Grid container justifyContent="center">
          <ButtonGroup variant="contained">
            <Button variant="outlined" onClick={goToBack}>
              Anterior
            </Button>
            <Button variant="outlined" onClick={goToCurrent}>
              Hoy
            </Button>
            <Button variant="outlined" onClick={goToNext}>
              Siguiente
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid container item md xs={12} justifyContent="center">
        <Typography variant="h6">{label()}</Typography>
      </Grid>
      {!mobileWidth ? (
        <Grid container item md xs justifyContent="center" flexDirection="column" gap={1}>
          <Typography variant="h6" textAlign="center">
            Vista
          </Typography>
          <Grid container justifyContent="center">
            <ButtonGroup variant="contained">
              {toolbar.views.map((viewOption: any) => (
                <Button
                  variant={view === viewOption ? `contained` : `outlined`}
                  key={viewOption}
                  onClick={() => {
                    toolbar.onView(viewOption)
                    setView(viewOption)
                  }}
                >
                  {viewOption === `day` && `Día`}
                  {viewOption === `week` && `Semana`}
                  {viewOption === `month` && `Mes`}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  )
}

const localizer = dayjsLocalizer(dayjs)

interface DashboardCalendarProps {
  events: EventCalendar[]
  setState: React.Dispatch<
    React.SetStateAction<{
      month: string
    }>
  >
}

const messages = {
  allDay: `Todo el día`,
  previous: `Anterior`,
  next: `Siguiente`,
  today: `Hoy`,
  month: `Mes`,
  week: `Semana`,
  day: `Día`,
  agenda: `Agenda`,
  date: `Fecha`,
  time: `Hora`,
  event: `Evento`,
  noEventsInRange: `No hay eventos en este rango`,
  showMore: (total: number) => `+ ${total} eventos`,
}

const DashboardCalendar = ({ events, setState }: DashboardCalendarProps): JSX.Element => {
  const {
    palette: { black },
  } = useTheme()
  const mobileWidth = useMediaQuery((theme: Theme) => theme.breakpoints.down(`md`))
  const minHour = dayjs().hour(10).minute(0).toDate()
  const maxHour = dayjs().hour(22).minute(0).toDate()

  const [selectedEvent, setSelectedEvent] = React.useState<EventCalendar | null>(null)
  const [view, setView] = React.useState<`day` | `week` | `month`>(mobileWidth ? `day` : `week`)

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ width: `100%` }}
      defaultView={mobileWidth ? `day` : `week`}
      view={mobileWidth ? `day` : view}
      views={mobileWidth ? [`day`] : [`month`, `week`, `day`]}
      timeslots={1}
      step={60}
      min={minHour}
      max={maxHour}
      messages={messages}
      formats={{
        dayFormat: (date) => dayjs(date).format(`dddd DD`),
        dayHeaderFormat: (date) => dayjs(date).format(`dddd DD`),
        weekdayFormat: (date) => dayjs(date).format(`dddd DD`),
      }}
      components={{
        event: ({ event }: any) => (
          <ComponentEvent
            event={event}
            setSelectedEvent={setSelectedEvent}
            selectedEvent={selectedEvent}
            black={black}
          />
        ),
        toolbar: (toolbar: any) => (
          <CalendarToolbar
            toolbar={toolbar}
            view={view}
            setView={setView}
            mobileWidth={mobileWidth}
            setState={setState}
          />
        ),
      }}
    />
  )
}

export default DashboardCalendar
