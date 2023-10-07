import { Grid, useTheme } from '@mui/material'
import Header from './components/Header'
import RoomSection from './components/RoomSection'

const Home = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  return (
    <Grid container item md={12} justifyContent="center" bgcolor={main.whiteBackground}>
      <Header />
      <RoomSection />
    </Grid>
  )
}

export default Home
