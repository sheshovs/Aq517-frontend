import { Container, Navbar } from '@/common/components'
import { Button, Grid, Skeleton, Typography, useTheme } from '@mui/material'
import React from 'react'

const Header = (): JSX.Element => {
  const {
    palette: { main, primary },
  } = useTheme()
  return (
    <Grid
      container
      justifyContent="center"
      height={700}
      padding={4}
      sx={{
        color: `white`,
        background: `linear-gradient(180deg, ${main.blackBackground} -16.43%, ${primary.main} 104.64%);`,
      }}
    >
      <Grid container maxWidth={1000}>
        <Navbar />
      </Grid>

      <Container height="350px" justifyContent="space-between" alignItems="center">
        <Grid item md={6}>
          <Grid container marginBottom={3.125}>
            <Typography variant="h1" textTransform="uppercase" marginBottom={1}>
              lacus vel facilisis volutpat est velit egestas ornare
            </Typography>
            <Typography variant="subtitle1" maxWidth={410}>
              Velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl
              suscipit adipiscing bibendum est ultricies
            </Typography>
          </Grid>
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: 170,
              borderColor: main.white,
              color: main.white,
              ':hover': {
                borderColor: main.white,
              },
            }}
          >
            RESERVAR
          </Button>
        </Grid>
        <Grid item md={6}>
          <Skeleton
            sx={{ maxWidth: 600, height: 350, bgcolor: `#ffffff33`, borderRadius: 2 }}
            animation="wave"
            variant="rectangular"
          />
        </Grid>
      </Container>
    </Grid>
  )
}

export default Header
