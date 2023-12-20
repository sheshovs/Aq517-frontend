import { Container } from '@/common/components'
import { Grid, IconButton, Link, Typography, useTheme } from '@mui/material'
import { FaInstagram, FaTiktok, FaWhatsapp, FaFacebookF } from 'react-icons/fa'
import LOGO_AQVILES from '../../../assets/logoAR.png'
import React from 'react'
import dayjs from '../../../common/settings/dayjs'

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
  const linkStyleIcon = {
    color: main.white,
    height: `24px`,
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
          md={4}
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
                  height: 100,
                  borderRadius: 100,
                }}
              />
            </Link>
            <Typography variant="subtitle2">
              Aqviles Records es una productora independiente radicada en Santiago de Chile, nacida
              de una banda musical del mismo nombre. El espacio AQ517, con su sala de ensayo, es el
              primer proyecto de Aqviles Records, el que busca apoyar y potenciar a los talentos
              artísticos.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          item
          md={6}
          xs={12}
          justifyContent={{
            xs: `center`,
            sm: `space-around`,
          }}
        >
          <Grid container item flexDirection="column" marginBottom={3} sm={5} xs={12}>
            <Typography
              variant="titleFooter"
              textTransform="uppercase"
              color={black.lightFooter}
              marginBottom={2}
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
              <Link href="/login" sx={linkStyle}>
                <Typography variant="footer">Iniciar sesión</Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid container item sm={5} xs={12} gap={3} alignItems="flex-start">
            <Grid container justifyContent="center">
              <Typography
                variant="titleFooter"
                textTransform="uppercase"
                color={black.lightFooter}
                marginBottom={2}
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
                  <a
                    href="https://web.facebook.com/aqvilesrecords"
                    style={linkStyleIcon}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebookF />
                  </a>
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
                  <a
                    href="https://www.instagram.com/aqviles_records"
                    style={linkStyleIcon}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram />
                  </a>
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
                  <a
                    href="https://www.tiktok.com/@aqviles.records"
                    style={linkStyleIcon}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTiktok />
                  </a>
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
                  <a
                    href="https://wa.me/56962190141"
                    style={linkStyleIcon}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp />
                  </a>
                </IconButton>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Typography
                variant="titleFooter"
                textTransform="uppercase"
                color={black.lightFooter}
                marginBottom={2}
                textAlign="center"
              >
                Dirección
              </Typography>
              <Grid container alignItems="center" gap={2.5} justifyContent="center">
                <Typography variant="footer" textAlign="center">
                  Seminario 517, Providencia, a pasos del metro Santa Isabel.
                </Typography>
              </Grid>
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
          {dayjs().format(`YYYY`)} Aqviles Records. Todos los derechos reservados.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
