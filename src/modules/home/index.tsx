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
      <Grid container item md={12} justifyContent="center" bgcolor={main.white}>
        <Header />
        <RoomSection />
        <CTA />
        <AboutSection />
        <ReserveSection />
        <Footer />
      </Grid>
    </>
  )
}

export default Home
