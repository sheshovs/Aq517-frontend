import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeConfig from './common/theme'
import Home from './modules/home'
import { CartProvider } from './common/context/CartContext'
import { SnackbarProvider } from 'notistack'

const App = (): JSX.Element => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: `top`,
        horizontal: `right`,
      }}
    >
      <ThemeConfig>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeConfig>
    </SnackbarProvider>
  )
}

export default App
