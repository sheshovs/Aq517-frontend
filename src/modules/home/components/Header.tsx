import { Container, Navbar } from '@/common/components'
import { Button, Grid, Link, Theme, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const Header = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  const mobileWidth = useMediaQuery((theme: Theme) => theme.breakpoints.down(`md`))
  return (
    <Grid id="home" container justifyContent="center">
      <Grid container padding={4} justifyContent="center" position="relative">
        {mobileWidth ? null : (
          <Container>
            <Navbar />
          </Container>
        )}

        <Container
          marginTop={mobileWidth ? 20 : 10}
          height="350px"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container item md={8} xs={12} justifyContent="center">
            <Grid container marginBottom={3.125} justifyContent="center">
              <Typography
                variant="h1"
                textTransform="uppercase"
                marginBottom={1}
                textAlign="center"
              >
                TODO ARTISTA NECESITA UN ESPACIO PARA CREAR. AQ517 PUEDE SER EL TUYO!
              </Typography>
              <Typography variant="subtitle1" maxWidth={410} textAlign="center">
                Conoce nuestra sala de ensayo para músicos y bandas. Úsala como quieras.
              </Typography>
            </Grid>
            <Link href="#reserve">
              <Button
                variant="outlined"
                size="large"
                sx={{
                  width: 170,
                  borderColor: main.white,
                  color: main.white,
                  ':hover': {
                    borderColor: main.white,
                    backgroundColor: `${main.whiteBackground}33`,
                  },
                }}
              >
                RESERVAR
              </Button>
            </Link>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  )
}

export default Header
