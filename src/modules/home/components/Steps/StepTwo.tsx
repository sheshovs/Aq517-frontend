import { Icon } from '@/common/components'
import { Button, Grid, Typography, useTheme } from '@mui/material'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSnackbar } from 'notistack'
import CustomButton from '@/common/components/Button'
import { Dayjs } from 'dayjs'
import { ReserveInitialState } from '../../hooks/useReserve'
import { useEventsQuery } from '@/common/querys/useEventQuery'
import { useMemo } from 'react'
import { RoomTypes } from '@/common/types'

interface StepTwoProps {
  state: ReserveInitialState
  hours: Dayjs[]
  setStep: (step: number) => void
  setSelectedDate: (selectedDate: Dayjs | null) => void
  setRoom: (room: RoomTypes) => void
  setHoursSelected: (
    hoursSelected: {
      hour: Dayjs
      room: RoomTypes
    }[],
  ) => void
  onClickHour: (hour: Dayjs) => void
  onAddToCart: () => void
}

const StepTwo = ({
  state,
  hours,
  setStep,
  setSelectedDate,
  setRoom,
  setHoursSelected,
  onClickHour,
  onAddToCart,
}: StepTwoProps): JSX.Element => {
  const {
    palette: { main, primary, black },
  } = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const { selectedDate, room, hoursSelected } = state

  const { data: events } = useEventsQuery({
    date: selectedDate?.format(`YYYY-MM-DD`) || ``,
    room: room || ``,
    options: { enabled: !!selectedDate },
  })

  const disabledHours = useMemo(() => {
    if (!events?.data) return []
    const hours = events.data.map((event) => event.startTime)
    return hours
  }, [events?.data])

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
                <CustomButton
                  variant={room === RoomTypes.MUSIC ? `contained` : `outlined`}
                  onClick={() => setRoom(RoomTypes.MUSIC)}
                  text="Aqviles"
                />
                {/* <CustomButton
                  variant={room === RoomTypes.DANCE ? `contained` : `outlined`}
                  onClick={() => setRoom(RoomTypes.DANCE)}
                  text="Joya"
                /> */}
              </Grid>
            </Grid>
            <Grid container paddingY={1.25} gap={2.5}>
              <Typography variant="h5" width="60px">
                Horas:
              </Typography>

              <Grid container item xs gap={1.25}>
                <Grid container gap={{ lg: 2.5, xs: 2 }}>
                  {hours.map((hour, i) => {
                    const index = hoursSelected.findIndex(
                      (item) => item.hour.isSame(hour) && item.room === room,
                    )
                    const isSelected = index !== -1
                    return (
                      <CustomButton
                        key={i}
                        text={hour.format(`HH:mm`)}
                        onClick={() => onClickHour(hour)}
                        disabled={disabledHours.includes(hour.format(`HH:mm:ss`))}
                        variant={isSelected ? `contained` : `outlined`}
                      />
                    )
                  })}
                </Grid>
                {hoursSelected.length > 0 && (
                  <Grid container>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Horas seleccionadas: {hoursSelected.length}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12} paddingY={1.25} gap={2.5} alignItems="center">
            <Typography variant="h5" width="60px">
              Valor:
            </Typography>

            <Typography variant="h2">
              ${(hoursSelected.length * 8000).toLocaleString(`es-CL`)}
            </Typography>
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
            onAddToCart()
            setHoursSelected([])
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
