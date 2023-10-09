import { Container, Icon } from '@/common/components'
import { Button, Divider, Grid, TextField, Typography, useTheme } from '@mui/material'
import GoogleCalendarLogo from '../../../assets/google-calendar.webp'
import React, { useState } from 'react'

const ReserveSection = (): JSX.Element => {
  const {
    palette: { main, primary, black },
  } = useTheme()
  const [step, setStep] = useState(1)
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
              <Grid container item md={10} justifyContent="center">
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
