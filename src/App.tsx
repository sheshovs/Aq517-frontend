import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeConfig from './common/theme'
import Home from './modules/home'
import { CartProvider } from './common/context/CartContext'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { socket } from './config/io'
import './global.css'
import Login from './modules/login'
import { AuthProvider } from './common/context/AuthContext'
import Dashboard from './modules/dashboard'
import MercadoPago from './modules/transaction/mercadopago'
import Transbank from './modules/transaction/transbank'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
})

socket.on(`connect`, () => {
  console.log(`Socket connected`)
})

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: `top`,
          horizontal: `right`,
        }}
        maxSnack={1}
      >
        <ThemeConfig>
          <AuthProvider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transaction/mp" element={<MercadoPago />} />
                  <Route path="/transaction/tb" element={<Transbank />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </ThemeConfig>
      </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default App
