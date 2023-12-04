import dayjs from 'dayjs'
import React from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import { Grid, Typography, Popover, useTheme } from '@mui/material'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { EventCalendar, RoomNames, RoomTypes } from '@/common/types'

const localizer = dayjsLocalizer(dayjs)

interface DashboardCalendarProps {
  events: EventCalendar[]
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

const DashboardCalendar = ({ events }: DashboardCalendarProps): JSX.Element => {
  const {
    palette: { black },
  } = useTheme()
  const minHour = dayjs().hour(10).minute(0).toDate()
  const maxHour = dayjs().hour(21).minute(0).toDate()

  const [selectedEvent, setSelectedEvent] = React.useState<EventCalendar | null>(null)
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ width: `100%` }}
      defaultView="week"
      views={[`month`, `week`, `day`]}
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
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <>
                <Grid
                  container
                  height="100%"
                  onClick={(e) => {
                    setSelectedEvent(event)
                    bindTrigger(popupState).onClick(e)
                  }}
                  {...bindTrigger(popupState).onTouchStart}
                  bgcolor={event.room === RoomTypes.MUSIC ? `black.mainFooter` : `primary.main`}
                  paddingY={0.25}
                  paddingX={0.625}
                  sx={{
                    border: `1px solid ${black.main}33`,
                  }}
                >
                  <Typography variant="subtitle1">{event.title}</Typography>
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
                  <Grid
                    container
                    maxWidth={400}
                    paddingX={4}
                    paddingY={3}
                    gap={2}
                    flexDirection="column"
                  >
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
                        <Typography variant="subtitle1">{`${
                          RoomNames[selectedEvent?.room || ``]
                        }`}</Typography>
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
        ),
      }}
    />
  )
}

export default DashboardCalendar
