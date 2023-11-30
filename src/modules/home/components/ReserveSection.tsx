import { Container } from '@/common/components'
import { Divider, Grid, Typography, useTheme } from '@mui/material'
import useReserve from '../hooks/useReserve'
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'

const ReserveSection = (): JSX.Element => {
  const {
    palette: { main, primary, black },
  } = useTheme()
  const {
    state,
    hours,
    handleChange,
    setStep,
    setSelectedDate,
    setRoom,
    setHoursSelected,
    onClickHour,
    onAddToCart,
  } = useReserve()
  const { step, userInfo } = state

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        backgroundSize: `100% 100%`,
        backgroundPosition: `0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px`,
        backgroundImage: `radial-gradient(18% 28% at 5% 96%, #CEFAFFFF 4%, #073AFF00 100%),radial-gradient(70% 53% at 10% 93%, #73F2FFFF 0%, #073AFF00 100%),radial-gradient(21% 37% at 79% 17%, #FF6DFE9C 24%, #073AFF00 100%),radial-gradient(35% 56% at 90% 93%, #8A4FFFF5 9%, #073AFF00 100%),radial-gradient(74% 86% at 67% 38%, #E86DFFF5 24%, #073AFF00 100%),linear-gradient(162deg, #FFFFFFFF 1%, #4C00FCFF 100%)`,
        color: main.white,
      }}
    >
      <Grid
        container
        justifyContent="center"
        sx={{
          background: `rgba( 0, 0, 0, 0.25 )`,
          backdropFilter: `blur( 14px )`,
        }}
      >
        <Container justifyContent="center" alignItems="center" paddingY={6.25} paddingX={4}>
          <Grid
            container
            item
            md={10}
            justifyContent="center"
            alignItems="center"
            gap={3.75}
            marginBottom={8}
          >
            <Grid item md>
              <Divider
                sx={{
                  borderColor: main.white,
                  borderWidth: 2.5,
                }}
              />
            </Grid>
            <Typography variant="h1" textAlign="center" textTransform="uppercase">
              Reservar
            </Typography>
            <Grid item md>
              <Divider
                sx={{
                  borderColor: main.white,
                  borderWidth: 2.5,
                }}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            {step === 1 && (
              <StepOne userInfo={userInfo} handleChange={handleChange} setStep={setStep} />
            )}
            {step === 2 && (
              <StepTwo
                state={state}
                hours={hours}
                setStep={setStep}
                setRoom={setRoom}
                setHoursSelected={setHoursSelected}
                setSelectedDate={setSelectedDate}
                onClickHour={onClickHour}
                onAddToCart={onAddToCart}
              />
            )}
          </Grid>
        </Container>
      </Grid>
    </Grid>
  )
}

export default ReserveSection
