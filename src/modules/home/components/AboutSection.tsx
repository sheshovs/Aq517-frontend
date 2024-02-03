import { Container } from '@/common/components'
import { Grid, Typography } from '@mui/material'
import FOTO_AQVILES2 from './../../../assets/aqviles2.webp'
import FOTO_AQVILES3 from './../../../assets/aqviles3.webp'
import React from 'react'

const AboutSection = (): JSX.Element => {
  return (
    <Container id="about" paddingTop={8} paddingBottom={8} paddingX={4}>
      <Grid container justifyContent="center" gap={3.75}>
        <Grid
          container
          flexDirection="row"
          justifyContent={{
            xs: `center`,
            sm: `space-between`,
          }}
          gap={3}
        >
          <Grid container item md xs={12} gap={3}>
            <Grid
              container
              padding={4}
              sx={{
                borderRadius: `16px`,
                backgroundColor: `rgba(0,0,0,.1)`,
                boxShadow: `0 0 10px rgba(255,255,255,.5)`,
              }}
            >
              <Typography variant="h1">Nosotros</Typography>
              <Typography variant="text">
                Había una vez una banda llamada Aqviles, que luego de lanzar su segundo EP y cuarto
                trabajo de estudio titulado “III”, entendió que sus inquietudes iban más allá de las
                composiciones musicales. Así fue como se lanzaron en la búsqueda de una nueva piedra
                filosofal y en junio de 2023 abrieron AQ517 en pleno Barrio Italia para recoger la
                inquietud de los artistas y músicos, con el objetivo de crear un espacio donde la
                cultura y las artes fluyan. Esa alquimia caracteriza a Aqviles Records, un lugar
                donde fluyen y conviven distintas disciplinas, artes y saberes.
              </Typography>
            </Grid>
            <Grid
              container
              padding={2}
              sx={{
                borderRadius: `16px`,
                backgroundColor: `rgba(0,0,0,.1)`,
                boxShadow: `0 0 10px rgba(255,255,255,.5)`,
              }}
            >
              <img
                src={FOTO_AQVILES3}
                alt="Aqviles"
                loading="lazy"
                style={{
                  borderRadius: `8px`,
                  width: `100%`,
                  height: `auto`,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            md
            xs={12}
            alignItems="flex-start"
            justifyContent="center"
            padding={2}
            sx={{
              borderRadius: `16px`,
              backgroundColor: `rgba(0,0,0,.1)`,
              boxShadow: `0 0 10px rgba(255,255,255,.5)`,
            }}
          >
            <img
              src={FOTO_AQVILES2}
              alt="Aqviles"
              loading="lazy"
              style={{
                borderRadius: `8px`,
                width: `100%`,
                height: `auto`,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutSection
