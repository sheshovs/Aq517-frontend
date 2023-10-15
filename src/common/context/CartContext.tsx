import { Dayjs } from 'dayjs'
import { useSnackbar } from 'notistack'
import { createContext, useContext, useState } from 'react'
import API from '../api'
import { Order } from '../types/order'

interface CartContextProps {
  openDrawer: boolean
  cartItems: { hour: Dayjs; room: string }[]
  isLoading: boolean
}

interface ContextProps {
  cartState: CartContextProps
  setCartState: React.Dispatch<React.SetStateAction<CartContextProps>>
  addToCart: (hoursSelected: { hour: Dayjs; room: string }[]) => void
  deleteFromCart: (hour: { hour: Dayjs; room: string }) => void
  handleDrawer: (value: boolean) => void
  onPayButtonClick: (orderData: Order) => Promise<void>
}

const CartContext = createContext({} as ContextProps)

const initialState = {
  openDrawer: false,
  cartItems: [],
  isLoading: false,
}

const CartProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [cartState, setCartState] = useState<CartContextProps>(initialState)
  const { cartItems } = cartState

  const { enqueueSnackbar } = useSnackbar()

  const addToCart = (hoursSelected: { hour: Dayjs; room: string }[]): void => {
    setCartState({ ...cartState, cartItems: [...cartItems, ...hoursSelected], openDrawer: true })
    enqueueSnackbar(`Se agregaron horas correctamente`, {
      variant: `success`,
    })
  }

  const deleteFromCart = (hour: { hour: Dayjs; room: string }): void => {
    const newCartItems = cartItems.filter((item) => item !== hour)
    setCartState({ ...cartState, cartItems: newCartItems })
  }

  const handleDrawer = (value: boolean): void => {
    setCartState({ ...cartState, openDrawer: value })
  }

  const onPayButtonClick = async (orderData: Order): Promise<void> => {
    setCartState({ ...cartState, isLoading: true })
    try {
      const data = await API.createPreference(orderData)

      if (data) {
        const url = data.data.url
        window.location.href = url
        setCartState({ ...cartState, isLoading: false })
      }
    } catch (error) {
      console.log(error)
      setCartState({ ...cartState, isLoading: false })
    }
  }

  return (
    <CartContext.Provider
      value={{ cartState, setCartState, addToCart, deleteFromCart, handleDrawer, onPayButtonClick }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = (): ContextProps => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`)
  }
  return context
}

export { CartProvider, useCart }
