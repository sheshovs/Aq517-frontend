import { Grid } from '@mui/material'
import Header from './components/Header'
import RoomSection from './components/RoomSection'

const Home = (): JSX.Element => {
  return (
    <Grid container justifyContent="center">
      <Header />
      <RoomSection />
    </Grid>
  )
}

export default Home
