import { Container } from '@/common/components'
import { Grid, IconButton, Link, Typography, useTheme } from '@mui/material'
import { FaInstagram, FaTiktok, FaWhatsapp, FaFacebookF } from 'react-icons/fa'
import LOGO_AQVILES from '../../../assets/logoAR.png'
import React from 'react'

const Footer = (): JSX.Element => {
  const {
    palette: { main, black },
  } = useTheme()
  const linkStyle = {
    textDecoration: `none`,
    color: main.white,
    textAlign: {
      xs: `center`,
      sm: `left`,
    },
  }
  return (
    <Grid
      container
      bgcolor={black.mainFooter}
      justifyContent="center"
      sx={{
        color: main.white,
      }}
    >
      <Container
        height={{ xs: `auto`, lg: 310 }}
        paddingY={6.25}
        paddingX={4}
        justifyContent="space-between"
      >
        <Grid
          container
          item
          md={6}
          xs={12}
          justifyContent={{
            xs: `center`,
            sm: `flex-start`,
          }}
          marginBottom={{
            xs: 4,
            md: 0,
          }}
        >
          <Typography variant="h2" textTransform="uppercase" marginBottom={1.25} textAlign="center">
            Aqviles records
          </Typography>
          <Grid
            container
            flexWrap="nowrap"
            gap={3}
            justifyContent="center"
            flexDirection={{
              xs: `column`,
              sm: `row`,
            }}
          >
            <Link href="/" textAlign="center">
              <img
                src={LOGO_AQVILES}
                alt="Logo Aqviles"
                style={{
                  height: 150,
                  borderRadius: 100,
                }}
              />
            </Link>
            <Typography variant="subtitle2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae dignissim nibh.
              Praesent rhoncus dui et lacus faucibus maximus. Nullam a ligula nec dolor auctor
              blandit. Praesent rhoncus dui et lacus faucibus maximus. Nullam a ligula nec dolor
              auctor blandit.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          md={4}
          xs={12}
          flexDirection={{
            xs: `column`,
            sm: `row`,
          }}
          justifyContent={{
            xs: `center`,
            sm: `space-around`,
          }}
        >
          <Grid flexDirection="column" marginBottom={4}>
            <Typography
              variant="titleFooter"
              textTransform="uppercase"
              color={black.lightFooter}
              marginBottom={3.25}
              textAlign={{
                xs: `center`,
                sm: `left`,
              }}
            >
              Links
            </Typography>
            <Grid container gap={1.875} flexDirection="column" paddingTop={0.5}>
              <Link href="#home" sx={linkStyle}>
                <Typography variant="footer">Inicio</Typography>
              </Link>
              <Link href="#room" sx={linkStyle}>
                <Typography variant="footer">Salas</Typography>
              </Link>
              <Link href="#about" sx={linkStyle}>
                <Typography variant="footer">Nosotros</Typography>
              </Link>
              <Link href="#reserve" sx={linkStyle}>
                <Typography variant="footer">Reservar</Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid justifyContent="center">
            <Typography
              variant="titleFooter"
              textTransform="uppercase"
              color={black.lightFooter}
              marginBottom={3.25}
              textAlign="center"
            >
              Redes sociales
            </Typography>
            <Grid container alignItems="center" gap={2.5} justifyContent="center">
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
        <Typography variant="footer" fontWeight={600} textAlign="center">
          2023 Aqviles Records. Todos los derechos reservados.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
