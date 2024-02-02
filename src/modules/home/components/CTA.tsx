import { Container } from '@/common/components'
import { Button, Grid, Link, Typography, useTheme } from '@mui/material'
import React from 'react'

const CTA = (): JSX.Element => {
  const {
    palette: { main, black },
  } = useTheme()
  return (
    <Grid container justifyContent="center">
      <Container paddingY={2} paddingX={4}>
        <Grid
          container
          gap={{ xs: 4, lg: 10 }}
          justifyContent="center"
          alignItems="center"
          paddingY={4}
          sx={{
            backgroundColor: main.white,
            borderRadius: `16px`,
          }}
        >
          <Typography variant="h2" textTransform="uppercase" textAlign="center" color={black.main}>
            ¡Sala Aqviles Disponible!
          </Typography>

          <Link href="#reserve">
            <Button
              variant="outlined"
              size="large"
              sx={{
                width: 170,
                borderColor: black.main,
                color: black.main,
                ':hover': {
                  borderColor: black.main,
                  backgroundColor: `${black.light}33`,
                },
              }}
            >
              RESERVAR
            </Button>
          </Link>
        </Grid>
      </Container>
    </Grid>
  )
}

export default CTA
