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
    onClickHour,
    onClickAccesory,
    onAddToCart,
  } = useReserve()
  const { step, userInfo } = state

  return (
    <Grid id="reserve" container justifyContent="center" paddingBottom={4}>
      <Grid container justifyContent="center">
        <Container justifyContent="center" alignItems="center" paddingY={6.25} paddingX={4}>
          <Grid
            container
            paddingTop={6}
            paddingBottom={6}
            sx={{
              border: `1px solid white`,
              borderRadius: `16px`,
              backgroundColor: `rgba(0,0,0,.2)`,
            }}
          >
            <Grid
              container
              item
              md={12}
              justifyContent="center"
              alignItems="center"
              gap={3.75}
              paddingBottom={{ xs: 4, lg: 8 }}
            >
              <Grid container item xs justifyContent="flex-end">
                <Divider
                  sx={{
                    width: `60%`,
                    borderColor: main.white,
                    borderWidth: 2.5,
                  }}
                />
              </Grid>
              <Typography variant="h1" textAlign="center">
                Reservar
              </Typography>
              <Grid container item xs>
                <Divider
                  sx={{
                    width: `60%`,
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
                  setSelectedDate={setSelectedDate}
                  onClickHour={onClickHour}
                  onClickAccesory={onClickAccesory}
                  onAddToCart={onAddToCart}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  )
}

export default ReserveSection
