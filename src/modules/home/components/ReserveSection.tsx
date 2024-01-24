import { Container } from '@/common/components'
import { Divider, Grid, Typography, useTheme } from '@mui/material'
import useReserve from '../hooks/useReserve'
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'

const ReserveSection = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  const {
    state,
    hours,
    rooms,
    handleChange,
    setStep,
    setSelectedDate,
    setRoomSelected,
    setHoursSelected,
    onClickHour,
    onAddToCart,
  } = useReserve()
  const { step, userInfo } = state

  return (
    <Grid
      id="reserve"
      container
      justifyContent="center"
      sx={{
        backgroundSize: `100% 100%`,
        backgroundPosition: `0px 0px,0px 0px,0px 0px,0px 0px,0px 0px`,
        backgroundImage: `repeating-linear-gradient(315deg, #00FFFF2E 92%, #073AFF00 100%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 1% 93%, #B000FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #00C9FFFF 0%, #5E00FFFF 100%)`,
        color: main.white,
      }}
    >
      <Grid
        container
        justifyContent="center"
        sx={{
          background: `rgba( 0, 0, 0, 0.15 )`,
          backdropFilter: `blur( 15px )`,
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
            marginBottom={{ xs: 4, lg: 8 }}
          >
            <Grid item xs>
              <Divider
                sx={{
                  borderColor: main.white,
                  borderWidth: 2.5,
                }}
              />
            </Grid>
            <Typography variant="h1" textAlign="center">
              Reservar
            </Typography>
            <Grid item xs>
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
                rooms={rooms}
                hours={hours}
                setStep={setStep}
                setRoomSelected={setRoomSelected}
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
