import { Icon } from '@/common/components'
import CartSection from '@/common/components/CartSection'
import { useCart } from '@/common/context/CartContext'
import { RoomPrices, RoomTypes } from '@/common/types/room'
import { Button, Grid, IconButton, Typography, useTheme } from '@mui/material'
import React, { useMemo } from 'react'

const Cart = (): JSX.Element => {
  const {
    palette: { main, black, primary },
  } = useTheme()
  const { cartItems, handleDrawer } = useCart()

  const { musicItems, danceItems } = useMemo(() => {
    const musicItems = cartItems
      .filter((item) => item.room === `music`)
      .sort((a, b) => a.hour.diff(b.hour))
    const danceItems = cartItems
      .filter((item) => item.room === `dance`)
      .sort((a, b) => a.hour.diff(b.hour))
    return { musicItems, danceItems }
  }, [cartItems])
  return (
    <Grid width={448} height="100%" paddingY={2.625} paddingLeft={3.625} paddingRight={2}>
      <Grid container height="100%" flexDirection="column" justifyContent="space-between">
        <Grid container gap={3.75}>
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
                $
                {(
                  musicItems.length * RoomPrices.MUSIC +
                  danceItems.length * RoomPrices.DANCE
                ).toLocaleString(`es-CL`)}
              </Typography>
            </Grid>
          )}
          <Grid container>
            <Button
              disabled={musicItems.length === 0 && danceItems.length === 0}
              fullWidth
              variant="contained"
              sx={{
                height: `50px`,
              }}
            >
              Pagar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Cart
