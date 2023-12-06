import { Container } from '@/common/components'
import { Grid, Typography, useTheme } from '@mui/material'
import FOTO_AQVILES from './../../../assets/aqviles.webp'
import FOTO_AQVILES2 from './../../../assets/aqviles2.webp'
import React from 'react'

const AboutSection = (): JSX.Element => {
  const {
    palette: { primary },
  } = useTheme()
  return (
    <Container id="about" paddingTop={6.25} paddingBottom={12} paddingX={4}>
      <Grid container justifyContent="center" gap={3.75}>
        <Typography
          variant="h1"
          textAlign="center"
          sx={{
            '&:after': {
              content: `""`,
              display: `block`,
              margin: `auto`,
              width: `140px`,
              height: `5px`,
              backgroundColor: primary.main,
            },
          }}
        >
          Nosotros
        </Typography>
        <Grid
          container
          flexDirection="row"
          justifyContent={{
            xs: `center`,
            sm: `space-between`,
          }}
          gap={3}
        >
          <Grid
            container
            item
            md={3.2}
            xs={12}
            alignItems="flex-start"
            justifyContent="center"
            height={{
              xs: `300px`,
              md: `400px`,
            }}
          >
            <img
              src={FOTO_AQVILES}
              alt="Aqviles"
              loading="lazy"
              style={{
                borderRadius: `8px`,
                width: `auto`,
                height: `100%`,
              }}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography variant="text" marginBottom={2}>
              Había una vez una banda llamada Aqviles, que luego de lanzar su segundo EP y cuarto
              trabajo de estudio titulado “III”, entendió que sus inquietudes iban más allá de las
              composiciones musicales. Así fue como se lanzaron en la búsqueda de una nueva piedra
              filosofal y en junio de 2023 abrieron AQ517 en pleno Barrio Italia para recoger la
              inquietud de los artistas y músicos, con el objetivo de crear un espacio donde la
              cultura y las artes fluyan. Esa alquimia caracteriza a Aqviles Records, un lugar donde
              fluyen y conviven distintas disciplinas, artes y saberes.
            </Typography>
          </Grid>
          <Grid
            container
            item
            md={3.2}
            xs={12}
            alignItems="flex-start"
            justifyContent="center"
            height={{
              xs: `300px`,
              md: `400px`,
            }}
          >
            <img
              src={FOTO_AQVILES2}
              alt="Aqviles"
              loading="lazy"
              style={{
                borderRadius: `8px`,
                width: `auto`,
                height: `100%`,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutSection
