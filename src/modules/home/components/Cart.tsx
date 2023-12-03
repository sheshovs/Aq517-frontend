/* eslint-disable camelcase */
import { Icon } from '@/common/components'
import CartSection from '@/common/components/CartSection'
import { useCart } from '@/common/context/CartContext'
import { Order } from '@/common/types/order'
import { RoomPrices, RoomTypes } from '@/common/types/room'
import { LoadingButton } from '@mui/lab'
import { Grid, IconButton, Typography, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import MercadoPagoIcon from '@/assets/mercado-pago-logo.png'
import dayjs from 'dayjs'

const Cart = (): JSX.Element => {
  const {
    palette: { main, black, primary },
  } = useTheme()
  const { cartState, handleDrawer, onPayButtonClick } = useCart()
  const { cartItems, isLoading } = cartState

  const { musicItems, danceItems, orderData, totalPrice } = useMemo(() => {
    const musicItems = cartItems
      .filter((item) => item.room === RoomTypes.MUSIC)
      .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)))
    const danceItems = cartItems
      .filter((item) => item.room === RoomTypes.DANCE)
      .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)))

    const orderData: Order = {
      items: [
        ...musicItems.map((item) => ({
          id: item.uuid,
          title: `Sala Aqviles`,
          quantity: 1,
          unit_price: RoomPrices.MUSIC,
          currency_id: `CLP`,
        })),
        ...danceItems.map((item) => ({
          id: item.uuid,
          title: `Sala La Joya`,
          quantity: 1,
          unit_price: RoomPrices.DANCE,
          currency_id: `CLP`,
        })),
      ],
    }

    const totalPrice = (
      musicItems.length * RoomPrices.MUSIC +
      danceItems.length * RoomPrices.DANCE
    ).toLocaleString(`es-CL`)

    return { musicItems, danceItems, orderData, totalPrice }
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
            {musicItems.length > 0 && <CartSection items={musicItems} type={RoomTypes.MUSIC} />}
            {danceItems.length > 0 && <CartSection items={danceItems} type={RoomTypes.DANCE} />}
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
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h2" color={black.dark}>
                Total:
              </Typography>
              <Typography variant="h2" color={black.dark}>
                ${totalPrice}
              </Typography>
            </Grid>
          )}
          <Grid container>
            <LoadingButton
              fullWidth
              disabled={musicItems.length === 0 && danceItems.length === 0}
              loading={isLoading}
              variant="contained"
              sx={{
                height: `50px`,
                textTransform: `none`,
                bgcolor: `#019ee3`,
                '&:hover': {
                  bgcolor: `#007eb5`,
                },
              }}
              onClick={() => {
                onPayButtonClick(orderData)
              }}
            >
              <img src={MercadoPagoIcon} height={18} />
              <Typography marginLeft={1.5} fontWeight={500}>
                Pagar con Mercado Pago
              </Typography>
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Cart
