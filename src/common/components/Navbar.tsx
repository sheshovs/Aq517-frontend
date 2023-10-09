import { Grid, IconButton, Typography, useTheme } from '@mui/material'
import { Icon } from '.'

const Navbar = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
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
        <IconButton
          sx={{
            padding: `4px`,
            borderRadius: `4px`,
          }}
        >
          <Icon
            icon="shoppingCart"
            sx={{
              color: main.white,
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Navbar
