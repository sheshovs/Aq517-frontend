import { Container } from '@/common/components'
import { Button, Grid, Link, Typography, useTheme } from '@mui/material'
import React from 'react'

const CTA = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        backgroundSize: `100% 100%`,
        backgroundPosition: `0px 0px,0px 0px,0px 0px,0px 0px,0px 0px`,
        backgroundImage: `repeating-linear-gradient(315deg, #00FFFF2E 92%, #073AFF00 100%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 1% 93%, #B000FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #00C9FFFF 0%, #5E00FFFF 100%)`,
        color: main.white,
      }}
    >
      <Grid
        container
        justifyContent="center"
        paddingY={4}
        paddingX={2}
        sx={{
          background: `rgba( 0, 0, 0, 0.15 )`,
          backdropFilter: `blur( 15px )`,
        }}
      >
        <Container gap={{ xs: 4, lg: 10 }} justifyContent="center" alignItems="center">
          <Typography variant="h2" textTransform="uppercase" textAlign="center">
            ¡Sala Aqviles Disponible!
          </Typography>

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
        </Container>
      </Grid>
    </Grid>
  )
}

export default CTA
