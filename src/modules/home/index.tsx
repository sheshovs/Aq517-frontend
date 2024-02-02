import { Drawer, Grid, Theme, useMediaQuery, useTheme } from '@mui/material'
import Header from './components/Header'
import RoomSection from './components/RoomSection'
import CTA from './components/CTA'
import Footer from './components/Footer'
import AboutSection from './components/AboutSection'
import ReserveSection from './components/ReserveSection'
import { useCart } from '@/common/context/CartContext'
import Cart from './components/Cart'
import ResponsiveNavbar from '@/common/components/ResponsiveNavbar'

const Home = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  const {
    cartState: { openDrawer },
    handleDrawer,
  } = useCart()
  const mobileWidth = useMediaQuery((theme: Theme) => theme.breakpoints.down(`md`))
  return (
    <>
      {mobileWidth ? <ResponsiveNavbar /> : null}
      <Drawer anchor="right" open={openDrawer} onClose={() => handleDrawer(false)}>
        <Cart />
      </Drawer>
      <Grid
        container
        item
        md={12}
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
            background: `rgba( 0, 0, 0, 0.20 )`,
            backdropFilter: `blur( 15px )`,
          }}
        >
          <Header />
          <RoomSection />
          <CTA />
          <AboutSection />
          <ReserveSection />
          <Footer />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
