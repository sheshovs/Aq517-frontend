/* eslint-disable camelcase */
import { Icon } from '@/common/components'
import CartSection from '@/common/components/CartSection'
import { useCart } from '@/common/context/CartContext'
import {
  Order,
  PaymentMethodColors,
  PaymentMethodLabels,
  PaymentMethods,
} from '@/common/types/order'
import { RoomTypes } from '@/common/types/room'
import { LoadingButton } from '@mui/lab'
import {
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useMemo } from 'react'
import dayjs from '../../../common/settings/dayjs'

const Cart = (): JSX.Element => {
  const {
    palette: { main, black, primary },
  } = useTheme()
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethods>(PaymentMethods.TRANSBANK)
  const { cartState, handleDrawer, onPayButtonClick } = useCart()
  const { cartItems, isLoading } = cartState

  const { musicItems, danceItems, orderData, totalPrice, musicPrice, dancePrice } = useMemo(() => {
    const musicItems = cartItems
      .filter((item) => item.room.type === RoomTypes.MUSIC)
      .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)))
    const danceItems = cartItems
      .filter((item) => item.room.type === RoomTypes.DANCE)
      .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)))

    const userData = {
      attendant: musicItems[0]?.attendant || danceItems[0]?.attendant || ``,
      email: musicItems[0]?.email || danceItems[0]?.email || ``,
      phone: musicItems[0]?.phone || danceItems[0]?.phone || ``,
    }

    const allAccesories = [
      ...musicItems.map((item) => item.accesories).flat(),
      ...danceItems.map((item) => item.accesories).flat(),
    ]

    const orderData: Order = {
      items: [
        ...musicItems.map((item) => {
          const startTime = dayjs(`${item.date} ${item.startTime}`)
          const endTime = dayjs(`${item.date} ${item.endTime}`)
          const hoursQuantity = endTime.diff(startTime, `hour`)
          return {
            id: item.uuid,
            title: `Sala Aqviles`,
            quantity: hoursQuantity,
            unit_price: item.room.price,
            currency_id: `CLP`,
          }
        }),
        ...danceItems.map((item) => {
          const startTime = dayjs(`${item.date} ${item.startTime}`)
          const endTime = dayjs(`${item.date} ${item.endTime}`)
          const hoursQuantity = endTime.diff(startTime, `hour`)
          return {
            id: item.uuid,
            title: `Sala La Joya`,
            quantity: hoursQuantity,
            unit_price: item.room.price,
            currency_id: `CLP`,
          }
        }),
        ...allAccesories.map((accesory) => {
          return {
            title: accesory.name,
            quantity: 1,
            unit_price: accesory.price,
            currency_id: `CLP`,
          }
        }),
      ],
      ...userData,
    }

    let musicPrice = 0
    musicItems.forEach((item) => {
      const startTime = dayjs(`${item.date} ${item.startTime}`)
      const endTime = dayjs(`${item.date} ${item.endTime}`)
      const hoursQuantity = endTime.diff(startTime, `hour`)
      musicPrice += item.room.price * hoursQuantity
      if (item.accesories.length > 0) {
        item.accesories.forEach((accesory) => {
          musicPrice += accesory.price
        })
      }
    })
    let dancePrice = 0
    danceItems.forEach((item) => {
      const startTime = dayjs(`${item.date} ${item.startTime}`)
      const endTime = dayjs(`${item.date} ${item.endTime}`)
      const hoursQuantity = endTime.diff(startTime, `hour`)
      dancePrice += item.room.price * hoursQuantity
      if (item.accesories.length > 0) {
        item.accesories.forEach((accesory) => {
          dancePrice += accesory.price
        })
      }
    })

    const totalPrice = (musicPrice + dancePrice).toLocaleString(`es-CL`)

    return { musicItems, danceItems, orderData, totalPrice, musicPrice, dancePrice }
  }, [cartItems])

  return (
    <Grid
      width={{ xs: `100%`, sm: 448 }}
      height="100%"
      paddingY={2.625}
      paddingLeft={3.625}
      paddingRight={2}
    >
      <Grid container height="100%" flexDirection="column" justifyContent="space-between">
        <Grid container gap={{ lg: 3.75, xs: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center" paddingRight={1.625}>
            <Typography variant="h1">Articulos</Typography>
            <IconButton
              sx={{
                padding: `4px`,
                borderRadius: `4px`,
              }}
              onClick={() => handleDrawer(false)}
            >
              <Icon icon="close" />
            </IconButton>
          </Grid>
          <Grid
            container
            gap={1.875}
            maxHeight="70vh"
            paddingRight={1.25}
            sx={{
              overflowY: `auto`,
              '&::-webkit-scrollbar': {
                width: `8px`,
              },
              '&::-webkit-scrollbar-track': {
                background: main.whiteBackground,
                borderRadius: `3.5px`,
              },
              '&::-webkit-scrollbar-thumb': {
                background: primary.main,
                borderRadius: `3.5px`,
              },
            }}
          >
            {musicItems.length > 0 && (
              <CartSection items={musicItems} type={RoomTypes.MUSIC} price={musicPrice} />
            )}
            {danceItems.length > 0 && (
              <CartSection items={danceItems} type={RoomTypes.DANCE} price={dancePrice} />
            )}
          </Grid>
          {musicItems.length === 0 && danceItems.length === 0 && (
            <Grid container>
              <Typography variant="h3" textAlign="center">
                ¡No existen articulos en el carrito!
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid container gap={2.5} paddingRight={1.625}>
          {(musicItems.length > 0 || danceItems.length > 0) && (
            <>
              <Grid container flexDirection="column" gap={1}>
                <Typography variant="h6">Selecciona el método de pago</Typography>
                <Divider />
                <Grid container>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethods)}
                  >
                    <FormControlLabel
                      value={PaymentMethods.TRANSBANK}
                      control={<Radio />}
                      label="Transbank"
                    />
                    <FormControlLabel
                      value={PaymentMethods.MERCADO_PAGO}
                      control={<Radio />}
                      label="Mercado Pago"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h2" color={black.dark}>
                  Total:
                </Typography>
                <Typography variant="h2" color={black.dark}>
                  ${totalPrice}
                </Typography>
              </Grid>
              <Grid container>
                <LoadingButton
                  fullWidth
                  disabled={musicItems.length === 0 && danceItems.length === 0}
                  loading={isLoading}
                  variant="contained"
                  sx={{
                    height: `50px`,
                    textTransform: `none`,
                    bgcolor: PaymentMethodColors[paymentMethod].background,
                    '&:hover': {
                      bgcolor: PaymentMethodColors[paymentMethod].hover,
                    },
                  }}
                  onClick={() => {
                    onPayButtonClick(orderData, paymentMethod)
                  }}
                >
                  <Typography marginLeft={1.5} fontWeight={500}>
                    Pagar con {PaymentMethodLabels[paymentMethod]}
                  </Typography>
                </LoadingButton>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Cart
