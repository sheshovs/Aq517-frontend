import Navbar from '@/common/components/Navbar'
import { Grid } from '@mui/material'

const Home = (): JSX.Element => {
  return (
    <Grid container>
      <Grid container justifyContent="center" height={700}>
        <Grid container maxWidth={1200}>
          <Navbar />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
