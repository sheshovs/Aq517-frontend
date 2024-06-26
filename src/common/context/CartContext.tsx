import { createContext, useContext, useState } from 'react'
import API from '../api'
import { Order, PaymentMethods } from '../types/order'
import { EventResponse } from '../types'
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { API_QUERY_KEYS } from '../querys/keys'
import dayjs from '../settings/dayjs'

interface CartContextProps {
  openDrawer: boolean
  cartItems: EventResponse[]
  isLoading: boolean
}

interface ContextProps {
  cartState: CartContextProps
  setCartState: React.Dispatch<React.SetStateAction<CartContextProps>>
  addToCart: (events: EventResponse[]) => void
  deleteFromCart: (event: EventResponse) => void
  handleDrawer: (value: boolean) => void
  onPayButtonClick: (orderData: Order, paymentMethod: PaymentMethods) => Promise<void>
  deleteEvent: UseMutateFunction<AxiosResponse<any, any>, unknown, EventResponse, unknown>
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

  const queryClient = useQueryClient()

  const { mutate: deleteEvent } = useMutation(
    (event: EventResponse) => API.event.delete(event.uuid),
    {
      onSuccess: (_, event) => {
        const selectedDate = dayjs(event.date).format(`YYYY-MM-DD`) || ``
        const room = event.room || ``
        queryClient.invalidateQueries(API_QUERY_KEYS.getAllEvents(selectedDate, room.uuid))
        deleteFromCart(event)
      },
    },
  )

  const addToCart = (events: EventResponse[]): void => {
    const sortedEvents = [...cartItems, ...events].sort((a, b) => {
      const dateA = dayjs(`${dayjs(a.date).format(`YYYY-MM-DD`)} ${a.startTime}`)
      const dateB = dayjs(`${dayjs(b.date).format(`YYYY-MM-DD`)} ${b.startTime}`)

      return dateA.diff(dateB)
    })
    setCartState({ ...cartState, cartItems: sortedEvents, openDrawer: true })
  }

  const deleteFromCart = (event: EventResponse): void => {
    const newCartItems = cartItems.filter((item) => item.uuid !== event.uuid)
    setCartState({ ...cartState, cartItems: newCartItems })
  }

  const handleDrawer = (value: boolean): void => {
    setCartState({ ...cartState, openDrawer: value })
  }

  const onPayButtonClick = async (
    orderData: Order,
    paymentMethod: PaymentMethods,
  ): Promise<void> => {
    setCartState({ ...cartState, isLoading: true })
    if (paymentMethod === PaymentMethods.TRANSBANK) {
      const orderWithPayment = {
        ...orderData,
        paymentMethod,
      }

      try {
        const data = await API.transbank.create(orderWithPayment)

        if (data) {
          const url = data.data.url
          const token = data.data.token
          window.location.href = `${url}?token_ws=${token}`
          setCartState({ ...cartState, isLoading: false })
        }
      } catch (error) {
        setCartState({ ...cartState, isLoading: false })
      }
    }
    if (paymentMethod === PaymentMethods.MERCADO_PAGO) {
      const orderWithPayment = {
        ...orderData,
        paymentMethod,
      }
      try {
        const data = await API.createPreference(orderWithPayment)

        if (data) {
          const url = data.data.url
          window.location.href = url
          setCartState({ ...cartState, isLoading: false })
        }
      } catch (error) {
        setCartState({ ...cartState, isLoading: false })
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartState,
        setCartState,
        addToCart,
        deleteFromCart,
        handleDrawer,
        onPayButtonClick,
        deleteEvent,
      }}
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
