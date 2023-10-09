import { Container, Icon } from '@/common/components'
import { Button, Divider, Grid, TextField, Typography, useTheme } from '@mui/material'
import GoogleCalendarLogo from '../../../assets/google-calendar.webp'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import useReserve from '../hooks/useReserve'

const ReserveSection = (): JSX.Element => {
  const {
    palette: { main, primary, black },
  } = useTheme()
  const { state, hours, setStep, setSelectedDate, setRoom, onClickHour } = useReserve()
  const { step, selectedDate, room, hoursSelected } = state

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        background: `linear-gradient(90deg, ${black.main} -10%, ${primary.main} 50%, ${black.main} 110%);`,
        color: main.white,
      }}
    >
      <Container justifyContent="center" alignItems="center" paddingY={6.25} paddingX={4}>
        <Grid
          container
          item
          md={10}
          justifyContent="center"
          alignItems="center"
          gap={3.75}
          marginBottom={8}
        >
          <Grid item md>
            <Divider
              sx={{
                borderColor: main.white,
                borderWidth: 2.5,
              }}
            />
          </Grid>
          <Typography variant="h1" textAlign="center" textTransform="uppercase">
            Reservar
          </Typography>
          <Grid item md>
            <Divider
              sx={{
                borderColor: main.white,
                borderWidth: 2.5,
              }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          {step === 1 && (
            <>
              <Grid container item md={10} justifyContent="space-between" marginBottom={8}>
                <Grid container flexDirection="column" gap={2.5} alignItems="center" maxWidth={482}>
                  <Typography variant="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut congue odio.
                    Donec tincidunt interdum lorem tempor maximus. Donec ac dolor in nibh dapibus
                    pulvinar. In hac habitasse platea dictumst. Vivamus ac dolor vel libero aliquet
                    dapibus.
                  </Typography>
                  <Typography variant="text">
                    Vestibulum nec ex non tortor hendrerit accumsan. Curabitur placerat porta nulla,
                    eu volutpat mi sagittis vitae.
                  </Typography>
                  <img src={GoogleCalendarLogo} width={70} />
                  <Typography variant="text">
                    Maecenas mattis, urna tempus varius efficitur, mauris tortor iaculis sem, sit
                    amet eleifend ex mauris aliquam elit. Curabitur in augue quis erat finibus
                    posuere.
                  </Typography>
                </Grid>
                <Grid container flexDirection="column" gap={1.25} maxWidth={350}>
                  <Grid container>
                    <Typography variant="text" marginBottom={1.25}>
                      Nombre
                    </Typography>
                    <TextField
                      fullWidth
                      sx={{
                        fieldset: {
                          borderColor: main.white,
                          backgroundColor: `${main.whiteBackground}33`,
                        },
                        input: {
                          color: main.white,
                        },
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: main.white,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: main.white,
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid container>
                    <Typography variant="text" marginBottom={1.25}>
                      Correo electrónico
                    </Typography>
                    <TextField
                      fullWidth
                      sx={{
                        fieldset: {
                          borderColor: main.white,
                          backgroundColor: `${main.whiteBackground}33`,
                        },
                        input: {
                          color: main.white,
                        },
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: main.white,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: main.white,
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid container>
                    <Typography variant="text" marginBottom={1.25}>
                      Teléfono
                    </Typography>
                    <TextField
                      fullWidth
                      sx={{
                        fieldset: {
                          borderColor: main.white,
                          backgroundColor: `${main.whiteBackground}33`,
                        },
                        input: {
                          color: main.white,
                        },
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: main.white,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: main.white,
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item md={10} justifyContent="center" alignItems="center">
                <Button
                  variant="outlined"
                  endIcon={<Icon icon="arrowForward" />}
                  onClick={() => setStep(2)}
                  sx={{
                    width: 220,
                    height: 54,
                    paddingLeft: 4,
                    paddingRight: 2.5,
                    borderColor: main.white,
                    color: main.white,
                    ':hover': {
                      borderColor: main.white,
                      backgroundColor: `${main.whiteBackground}33`,
                    },
                  }}
                >
                  SIGUIENTE
                </Button>
              </Grid>
            </>
          )}
          {step === 2 && (
            <>
              <Grid
                container
                item
                md={10}
                gap={12.5}
                justifyContent="space-between"
                marginBottom={8}
              >
                <Grid>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="es"
                    dateFormats={{
                      monthAndYear: `MMMM YYYY`,
                    }}
                  >
                    <DateCalendar
                      defaultValue={selectedDate}
                      showDaysOutsideCurrentMonth
                      disablePast
                      onChange={(date) => setSelectedDate(date)}
                      sx={{
                        minHeight: 362,
                        bgcolor: `#fff`,
                        color: `#000`,
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
                      dayOfWeekFormatter={(dayOfWeek) =>
                        dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1, 3)
                      }
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid container item md flexDirection="column" justifyContent="space-between">
                  <Grid container item md flexDirection="column" gap={1.25}>
                    <Typography variant="h4">
                      {selectedDate?.format(`dddd DD [de] MMMM`)}
                    </Typography>
                    <Grid container paddingY={1.25} gap={2.5}>
                      <Typography variant="h5" width="60px">
                        Sala:
                      </Typography>

                      <Grid container item md gap={2.5}>
                        <Button
                          variant={room === `music` ? `contained` : `outlined`}
                          onClick={() => setRoom(`music`)}
                          sx={{
                            fontSize: `13px`,
                            width: 70,
                            height: 30,
                            '&.MuiButton-contained': {
                              backgroundColor: `${main.white} !important`,
                              color: `${black.main} !important`,
                            },
                            '&.MuiButton-outlined': {
                              borderColor: main.white,
                              color: main.white,
                              '&:hover': {
                                backgroundColor: `${main.whiteBackground}33`,
                              },
                            },
                          }}
                        >
                          Música
                        </Button>
                        <Button
                          variant={room === `dance` ? `contained` : `outlined`}
                          onClick={() => setRoom(`dance`)}
                          sx={{
                            fontSize: `13px`,
                            width: 70,
                            height: 30,
                            '&.MuiButton-contained': {
                              backgroundColor: `${main.white} !important`,
                              color: `${black.main} !important`,
                            },
                            '&.MuiButton-outlined': {
                              borderColor: main.white,
                              color: main.white,
                              '&:hover': {
                                backgroundColor: `${main.whiteBackground}33`,
                              },
                            },
                          }}
                        >
                          Danza
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container paddingY={1.25} gap={2.5}>
                      <Typography variant="h5" width="60px">
                        Horas:
                      </Typography>

                      <Grid container item md gap={1.25}>
                        <Grid container gap={2.5}>
                          {hours.map((hour, i) => {
                            const index = hoursSelected.findIndex((item) => item.isSame(hour))
                            const isSelected = index !== -1
                            return (
                              <Button
                                key={i}
                                variant={isSelected ? `contained` : `outlined`}
                                onClick={() => onClickHour(hour)}
                                sx={{
                                  fontSize: `13px`,
                                  width: 70,
                                  height: 30,
                                  '&.MuiButton-contained': {
                                    backgroundColor: `${main.white} !important`,
                                    color: `${black.main} !important`,
                                  },
                                  '&.MuiButton-outlined': {
                                    borderColor: main.white,
                                    color: main.white,
                                    '&:hover': {
                                      backgroundColor: `${main.whiteBackground}33`,
                                    },
                                  },
                                }}
                              >
                                {hour.format(`HH:mm`)}
                              </Button>
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
                  <Grid container paddingY={1.25} gap={2.5} alignItems="center">
                    <Typography variant="h5" width="60px">
                      Valor:
                    </Typography>

                    <Typography variant="h2">
                      ${(hoursSelected.length * 8000).toLocaleString(`es-CL`)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item md={10} justifyContent="center" gap={2}>
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
          )}
        </Grid>
      </Container>
    </Grid>
  )
}

export default ReserveSection
