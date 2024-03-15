import { LoadingButton } from '@mui/lab'
import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import LOGO_AQVILES from './../../assets/logoAR.png'
import { Icon } from '@/common/components'
import { useAuth } from '@/common/context/AuthContext'
import API from '@/common/api'
import { useSnackbar } from 'notistack'
import { emailRegex } from '@/common/utils/regex'

const Login = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = React.useState({
    email: ``,
    password: ``,
    viewPassword: false,
    isLoading: false,
  })
  const { email, password, viewPassword, isLoading } = state

  const { logIn } = useAuth()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleViewPassword = (): void => {
    setState({
      ...state,
      viewPassword: !viewPassword,
    })
  }
  const handleSubmit = async (): Promise<void> => {
    const submitEmail = email.toLowerCase().trim()
    if (submitEmail.toLowerCase().trim() === ``) {
      enqueueSnackbar(`Ingrese un correo electrónico`, { variant: `error` })
      return
    }
    if (!emailRegex.test(submitEmail.toLowerCase().trim())) {
      enqueueSnackbar(`Ingrese un correo electrónico válido`, { variant: `error` })
      return
    }
    if (password.trim() === ``) {
      enqueueSnackbar(`Ingrese una contraseña`, { variant: `error` })
      return
    }

    setState({ ...state, isLoading: true })
    try {
      const authorizedUser = await API.login(email.toLocaleLowerCase(), password)
      logIn(authorizedUser.data)
      window.location.href = `/dashboard`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setState({ ...state, isLoading: false })
      enqueueSnackbar(error.response.data.error, { variant: `error` })
      return
    }
  }

  return (
    <Grid
      container
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundSize: `100% 100%`,
        backgroundPosition: `0px 0px,0px 0px,0px 0px,0px 0px,0px 0px`,
        backgroundImage: `repeating-linear-gradient(315deg, #00FFFF2E 92%, #073AFF00 100%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 1% 93%, #B000FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #00C9FFFF 0%, #5E00FFFF 100%)`,
      }}
    >
      <Grid
        container
        height="100%"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: `rgba( 0, 0, 0, 0.20 )`,
          backdropFilter: `blur( 15px )`,
        }}
      >
        <Grid container item xs={10} md={6} lg={4}>
          <Paper
            elevation={3}
            sx={{
              width: `100%`,
              borderRadius: 2,
            }}
          >
            <Grid container paddingY={4} paddingX={6} marginBottom={2}>
              <Grid container item xs={12} paddingBottom={3} flexDirection="column" gap={2}>
                <Grid container justifyContent="center">
                  <Link
                    href="/"
                    sx={{
                      width: `auto`,
                      height: `85%`,
                    }}
                  >
                    <img
                      src={LOGO_AQVILES}
                      alt="Logo Aqviles Records"
                      height={100}
                      style={{
                        borderRadius: 100,
                      }}
                    />
                  </Link>
                </Grid>
                <Grid container justifyContent="center">
                  <Typography variant="h2">Iniciar sesión</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12} gap={3} justifyContent="center">
                <Grid container gap={1}>
                  <InputLabel>Correo electrónico</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="example@aq517.cl"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid container gap={1}>
                  <InputLabel>Contraseña</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="********"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    type={viewPassword ? `text` : `password`}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleViewPassword}>
                          <Icon icon={viewPassword ? `hidePassword` : `showPassword`} />
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>

                <LoadingButton
                  fullWidth
                  variant="contained"
                  loading={isLoading}
                  onClick={handleSubmit}
                  sx={{
                    height: `50px`,
                  }}
                >
                  Iniciar sesión
                </LoadingButton>
                <Grid container item xs={6} justifyContent="center">
                  <Link
                    href="/"
                    sx={{
                      width: `100%`,
                      textDecoration: `none`,
                      color: `black !important`,
                    }}
                  >
                    <Button fullWidth>Volver</Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
