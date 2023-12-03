import { Badge, Divider, Grid, IconButton, Link, Slide, Typography, useTheme } from '@mui/material'
import LOGO_AQVILES from '../../assets/logoAR.png'
import React from 'react'
import Icon from './Icon'
import { useCart } from '../context/CartContext'

const ResponsiveNavbar = (): JSX.Element => {
  const {
    palette: { main, black },
  } = useTheme()
  const { cartState, handleDrawer } = useCart()
  const { cartItems } = cartState
  const [menuOpen, setMenuOpen] = React.useState(false)
  const handleMenu = (): void => {
    setMenuOpen(!menuOpen)
  }
  return (
    <>
      <Grid
        container
        position="fixed"
        top={0}
        width="100%"
        zIndex={10}
        justifyContent="space-between"
        alignItems="center"
        paddingTop={1.5}
        paddingBottom={1}
        paddingX={4}
        sx={{
          backgroundColor: black.mainFooter,
        }}
      >
        <IconButton
          onClick={handleMenu}
          sx={{
            padding: `4px`,
            borderRadius: `4px`,
          }}
        >
          <Icon
            icon={menuOpen ? `close` : `menuExpand`}
            sx={{
              fontSize: `32px`,
              color: main.white,
            }}
          />
        </IconButton>
        <Link
          href="#home"
          sx={{
            width: `auto`,
            height: `85%`,
          }}
        >
          <img
            src={LOGO_AQVILES}
            alt="Logo Aqviles Records"
            height={60}
            style={{
              borderRadius: 100,
            }}
          />
        </Link>
        <Badge badgeContent={cartItems.length} color="primary">
          <IconButton
            sx={{
              padding: `4px`,
              borderRadius: `4px`,
              transition: `all .3s ease`,
              '&:hover': {
                backgroundColor: `${main.whiteBackground}33`,
              },
              '& .MuiTouchRipple-root .MuiTouchRipple-child': {
                borderRadius: `4px`,
                backgroundColor: main.whiteBackground,
              },
            }}
            onClick={() => handleDrawer(true)}
          >
            <Icon
              icon="shoppingCart"
              sx={{
                fontSize: `26px`,
                color: main.white,
              }}
            />
          </IconButton>
        </Badge>
      </Grid>
      <Slide in={menuOpen} direction="down">
        <Grid
          container
          position="fixed"
          top={87}
          width="100%"
          height={window.innerHeight - 87}
          bgcolor="common.white"
          flexDirection="column"
          justifyContent="space-between"
          flexWrap="nowrap"
          zIndex={9}
        >
          <Grid container flexDirection="column" alignItems="center" justifyContent="center">
            <Link
              href="#home"
              paddingY={2}
              sx={{
                textDecoration: `none`,
                width: `100%`,
                textAlign: `center`,
                transition: `all .3s ease`,
                color: black.main,
              }}
              onClick={handleMenu}
            >
              <Typography>Inicio</Typography>
            </Link>
            <Divider
              sx={{
                width: `100%`,
              }}
            />
            <Link
              href="#room"
              paddingY={2}
              sx={{
                textDecoration: `none`,
                width: `100%`,
                textAlign: `center`,
                transition: `all .3s ease`,
                color: black.main,
              }}
              onClick={handleMenu}
            >
              <Typography>Salas</Typography>
            </Link>
            <Divider
              sx={{
                width: `100%`,
              }}
            />
            <Link
              href="#about"
              paddingY={2}
              sx={{
                textDecoration: `none`,
                width: `100%`,
                textAlign: `center`,
                transition: `all .3s ease`,
                color: black.main,
              }}
              onClick={handleMenu}
            >
              <Typography>Nosotros</Typography>
            </Link>
            <Divider
              sx={{
                width: `100%`,
              }}
            />
            <Link
              href="#reserve"
              paddingY={2}
              sx={{
                textDecoration: `none`,
                width: `100%`,
                textAlign: `center`,
                transition: `all .3s ease`,
                color: black.main,
              }}
              onClick={handleMenu}
            >
              <Typography>Reservar</Typography>
            </Link>
            <Divider
              sx={{
                width: `100%`,
              }}
            />
          </Grid>
        </Grid>
      </Slide>
    </>
  )
}

export default ResponsiveNavbar
