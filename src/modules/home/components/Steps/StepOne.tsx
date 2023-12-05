import { Button, Grid, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { Icon } from '@/common/components'

interface StepOneProps {
  userInfo: {
    name: string
    email: string
    phone: string
  }
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setStep: (step: number) => void
}

const StepOne = ({ userInfo, handleChange, setStep }: StepOneProps): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  const { name, email, phone } = userInfo
  return (
    <>
      <Grid
        container
        item
        md={10}
        xs={12}
        justifyContent={{ xs: `center`, lg: `space-between` }}
        marginBottom={8}
        gap={4}
      >
        <Grid container flexDirection="column" gap={2.5} alignItems="center" maxWidth={482}>
          <Typography variant="text">
            AQ517 tiene una sala de ensayo disponible, la que cuenta con implementos necesarios para
            músicos y bandas. Amplia, equipada y a pasos de Metro Santa Isabel.
          </Typography>
          <Typography variant="text">
            Puedes reservar las horas que quieras en esta plataforma, pagando a través de Mercado
            Pago el valor de $8.000 (ocho mil pesos) por hora.
          </Typography>
          <Typography variant="text">
            Lee nuestros Términos y Condiciones antes de reservar. Al concretar tu reserva, habrás
            accedido a seguir nuestras normas y políticas.
          </Typography>
          <Typography variant="text">¡Te esperamos!</Typography>
        </Grid>
        <Grid container flexDirection="column" gap={1.25} maxWidth={350}>
          <Grid container>
            <Typography variant="text" marginBottom={1.25}>
              Nombre
            </Typography>
            <TextField
              fullWidth
              name="name"
              value={name}
              onChange={handleChange}
              sx={{
                fieldset: {
                  borderColor: main.white,
                  backgroundColor: `${main.whiteBackground}33`,
                },
                input: {
                  color: main.white,
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: main.white,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: main.white,
                  },
                },
              }}
            />
          </Grid>
          <Grid container>
            <Typography variant="text" marginBottom={1.25}>
              Correo electrónico
            </Typography>
            <TextField
              fullWidth
              name="email"
              value={email}
              onChange={handleChange}
              sx={{
                fieldset: {
                  borderColor: main.white,
                  backgroundColor: `${main.whiteBackground}33`,
                },
                input: {
                  color: main.white,
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: main.white,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: main.white,
                  },
                },
              }}
            />
          </Grid>
          <Grid container>
            <Typography variant="text" marginBottom={1.25}>
              Teléfono
            </Typography>
            <TextField
              fullWidth
              name="phone"
              value={phone}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography
                      sx={{
                        color: main.whiteBackground,
                      }}
                    >
                      +569
                    </Typography>
                  </InputAdornment>
                ),
              }}
              sx={{
                fieldset: {
                  borderColor: main.white,
                  backgroundColor: `${main.whiteBackground}33`,
                },
                input: {
                  color: main.white,
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: main.white,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: main.white,
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item md={10} justifyContent="center" alignItems="center">
        <Button
          variant="outlined"
          endIcon={<Icon icon="arrowForward" />}
          onClick={() => setStep(2)}
          sx={{
            width: 220,
            height: 54,
            paddingLeft: 4,
            paddingRight: 2.5,
            borderColor: main.white,
            color: main.white,
            ':hover': {
              borderColor: main.white,
              backgroundColor: `${main.whiteBackground}33`,
            },
          }}
        >
          SIGUIENTE
        </Button>
      </Grid>
    </>
  )
}

export default StepOne
