import { Container } from '@/common/components'
import { Grid, IconButton, Typography, useTheme } from '@mui/material'
import { FaInstagram, FaTiktok, FaWhatsapp, FaFacebookF } from 'react-icons/fa'
import React from 'react'

const Footer = (): JSX.Element => {
  const {
    palette: { main, black },
  } = useTheme()
  return (
    <Grid
      container
      bgcolor={black.mainFooter}
      justifyContent="center"
      sx={{
        color: main.white,
      }}
    >
      <Container height={310} paddingY={6.25} paddingX={4} justifyContent="space-between">
        <Grid width={350}>
          <Typography variant="h2" textTransform="uppercase" marginBottom={1.25}>
            Aqviles records
          </Typography>
          <Typography variant="subtitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae dignissim nibh.
            Praesent rhoncus dui et lacus faucibus maximus. Nullam a ligula nec dolor auctor
            blandit. Mauris scelerisque elit eget scelerisque ultricies. Cras ut eros urna. Quisque
            nisl velit, consequat id arcu ac, dictum facilisis odio.Curabitur et nulla vitae dolor
            egestas condimentum.
          </Typography>
        </Grid>
        <Grid container maxWidth={410} justifyContent="space-between">
          <Grid flexDirection="column">
            <Typography
              variant="titleFooter"
              textTransform="uppercase"
              color={black.lightFooter}
              marginBottom={3.25}
            >
              Links
            </Typography>
            <Grid container gap={1.875} flexDirection="column" paddingTop={0.5}>
              <Typography variant="footer">Inicio</Typography>
              <Typography variant="footer">Salas</Typography>
              <Typography variant="footer">Nosotros</Typography>
              <Typography variant="footer">Reservar</Typography>
            </Grid>
          </Grid>
          <Grid>
            <Typography
              variant="titleFooter"
              textTransform="uppercase"
              color={black.lightFooter}
              marginBottom={3.25}
            >
              Redes sociales
            </Typography>
            <Grid container alignItems="center" gap={2.5}>
              <IconButton
                sx={{
                  padding: `4px`,
                  borderRadius: `4px`,
                  color: main.white,
                  transition: `all .3s ease`,
                  '& .MuiTouchRipple-root .MuiTouchRipple-child': {
                    borderRadius: `4px`,
                  },
                  '&:hover': {
                    backgroundColor: `${main.whiteBackground}33`,
                  },
                }}
              >
                <FaFacebookF />
              </IconButton>
              <IconButton
                sx={{
                  padding: `4px`,
                  borderRadius: `4px`,
                  color: main.white,
                  transition: `all .3s ease`,
                  '& .MuiTouchRipple-root .MuiTouchRipple-child': {
                    borderRadius: `4px`,
                  },
                  '&:hover': {
                    backgroundColor: `${main.whiteBackground}33`,
                  },
                }}
              >
                <FaInstagram />
              </IconButton>
              <IconButton
                sx={{
                  padding: `4px`,
                  borderRadius: `4px`,
                  color: main.white,
                  transition: `all .3s ease`,
                  '& .MuiTouchRipple-root .MuiTouchRipple-child': {
                    borderRadius: `4px`,
                  },
                  '&:hover': {
                    backgroundColor: `${main.whiteBackground}33`,
                  },
                }}
              >
                <FaTiktok />
              </IconButton>
              <IconButton
                sx={{
                  padding: `4px`,
                  borderRadius: `4px`,
                  color: main.white,
                  transition: `all .3s ease`,
                  '& .MuiTouchRipple-root .MuiTouchRipple-child': {
                    borderRadius: `4px`,
                  },
                  '&:hover': {
                    backgroundColor: `${main.whiteBackground}33`,
                  },
                }}
              >
                <FaWhatsapp />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Grid
        container
        bgcolor={black.darkFooter}
        justifyContent="center"
        alignItems="center"
        height={60}
      >
        <Typography variant="footer" fontWeight={600}>
          2023 Aqviles Records. Todos los derechos reservados.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
