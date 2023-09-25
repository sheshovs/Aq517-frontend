import { Grid, Typography } from '@mui/material'
import Icon from './Icon'

const Navbar = (): JSX.Element => {
  return (
    <Grid container height={100}>
      <Grid container position="relative" justifyContent="space-between" alignItems="center">
        <Typography>Inicio</Typography>
        <Typography>Salas</Typography>
        <Typography>Logo</Typography>
        <Typography>Nosotros</Typography>
        <Typography>Reservar</Typography>
        <Grid position="absolute" right="-150px">
          <Icon
            icon="shoppingCart"
            sx={{
              color: `#000`,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Navbar
