import { Dayjs } from 'dayjs'
import { useSnackbar } from 'notistack'
import { createContext, useContext, useState } from 'react'

interface CartContextProps {
  openDrawer: boolean
  cartItems: { hour: Dayjs; room: string }[]
}

interface ContextProps extends CartContextProps {
  addToCart: (hoursSelected: { hour: Dayjs; room: string }[]) => void
  deleteFromCart: (hour: { hour: Dayjs; room: string }) => void
  handleDrawer: (value: boolean) => void
}

const CartContext = createContext({} as ContextProps)

const initialState = {
  openDrawer: false,
  cartItems: [],
}

const CartProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, setState] = useState<CartContextProps>(initialState)
  const { cartItems } = state

  const { enqueueSnackbar } = useSnackbar()

  const addToCart = (hoursSelected: { hour: Dayjs; room: string }[]): void => {
    setState({ ...state, cartItems: [...cartItems, ...hoursSelected], openDrawer: true })
    enqueueSnackbar(`Se agregaron horas correctamente`, {
      variant: `success`,
    })
  }

  const deleteFromCart = (hour: { hour: Dayjs; room: string }): void => {
    const newCartItems = cartItems.filter((item) => item !== hour)
    setState({ ...state, cartItems: newCartItems })
  }

  const handleDrawer = (value: boolean): void => {
    setState({ ...state, openDrawer: value })
  }

  return (
    <CartContext.Provider value={{ ...state, addToCart, deleteFromCart, handleDrawer }}>
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
