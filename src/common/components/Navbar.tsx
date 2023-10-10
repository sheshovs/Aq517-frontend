import { Badge, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { Icon } from '.'
import { useCart } from '../context/CartContext'

const Navbar = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  const { cartItems, handleDrawer } = useCart()
  return (
    <Grid container height={80}>
      <Grid item md />
      <Grid
        item
        md={9}
        display="flex"
        position="relative"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography textTransform="uppercase">Inicio</Typography>
        <Typography textTransform="uppercase">Salas</Typography>
        <Typography
          textTransform="uppercase"
          sx={{
            border: `1px solid ${main.white}`,
            paddingX: 2,
            paddingY: 3,
            borderRadius: 100,
          }}
        >
          Logo
        </Typography>
        <Typography textTransform="uppercase">Nosotros</Typography>
        <Typography textTransform="uppercase">Reservar</Typography>
      </Grid>
      <Grid item md display="flex" justifyContent="flex-end" alignItems="center">
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
