import { Grid, Typography, useTheme } from '@mui/material'
import { Icon } from '.'

const Navbar = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  return (
    <Grid container height={80}>
      <Grid container position="relative" justifyContent="space-between" alignItems="center">
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
        <Grid position="absolute" right="-150px">
          <Icon icon="shoppingCart" />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Navbar
