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
  } = useReserve()
  const { step, userInfo } = state

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        background: `linear-gradient(90deg, ${black.main} -10%, ${primary.main} 50%, ${black.main} 110%);`,
        color: main.white,
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
            />
          )}
        </Grid>
      </Container>
    </Grid>
  )
}

export default ReserveSection
