import { Badge, Grid, IconButton, Link, Typography, useTheme } from '@mui/material'
import { Icon } from '.'
import { useCart } from '../context/CartContext'
import LOGO_AQVILES from '../../assets/logoAR.png'

const Navbar = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  const { cartState, handleDrawer } = useCart()
  const { cartItems } = cartState
  const linkStyle = {
    textDecoration: `none`,
    color: main.white,
    paddingX: 2.5,
    paddingY: 1.25,
    border: `2px solid white`,
    '-webkit-mask': `conic-gradient(from 180deg at top 8px right 8px, #000 90deg,#000 0)
    var(--_i,200%) 0  /200% var(--_i,8px) border-box no-repeat,
   conic-gradient(at bottom 8px left  8px,  #000 90deg,#000 0)
    0   var(--_i,200%)/var(--_i,8px) 200% border-box no-repeat,
   linear-gradient(#000 0 0) padding-box no-repeat`,
    transition: `.1s, -webkit-mask-position .1s .1s`,
    '&:hover': {
      '--_i': `100%`,
      transition: `.1s, -webkit-mask-size .1s .1s`,
    },
  }
  return (
    <Grid container height={80}>
      <Grid item xs />
      <Grid
        item
        xs={9}
        display="flex"
        position="relative"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href="#home" sx={linkStyle}>
          <Typography fontWeight={500}>Inicio</Typography>
        </Link>
        <Link href="#room" sx={linkStyle}>
          <Typography fontWeight={500}>Salas</Typography>
        </Link>

        <Link href="/">
          <img
            src={LOGO_AQVILES}
            alt="Logo Aqviles Records"
            height={90}
            style={{
              borderRadius: 100,
            }}
          />
        </Link>
        <Link href="#about" sx={linkStyle}>
          <Typography fontWeight={500}>Nosotros</Typography>
        </Link>

        <Link href="#reserve" sx={linkStyle}>
          <Typography fontWeight={500}>Reservar</Typography>
        </Link>
      </Grid>
      <Grid item xs display="flex" justifyContent="flex-end" alignItems="center">
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
                color: main.white,
              }}
            />
          </IconButton>
        </Badge>
      </Grid>
    </Grid>
  )
}

export default Navbar
