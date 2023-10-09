import { Container } from '@/common/components'
import { Button, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

const CTA = (): JSX.Element => {
  const {
    palette: { main, primary, black },
  } = useTheme()
  return (
    <Grid
      container
      height={100}
      justifyContent="center"
      sx={{
        background: `linear-gradient(90deg, ${black.main} -10%, ${primary.main} 50%, ${black.main} 110%);`,
        color: main.white,
      }}
    >
      <Container gap={10} justifyContent="center" alignItems="center">
        <Typography variant="h2" textTransform="uppercase">
          lacus vel facilisis volutpat est velit egestas
        </Typography>
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
      </Container>
    </Grid>
  )
}

export default CTA
