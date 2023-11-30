import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeConfig from './common/theme'
import Home from './modules/home'
import { CartProvider } from './common/context/CartContext'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { socket } from './config/io'

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
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ThemeConfig>
      </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default App
