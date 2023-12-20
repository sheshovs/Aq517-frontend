import { Divider, Grid, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Icon } from '.'
import { useCart } from '../context/CartContext'
import { RoomPrices, RoomTypes } from '../types/room'
import { EventResponse } from '../types'
import dayjs from '../settings/dayjs'

interface CartSectionProps {
  items: EventResponse[]
  type: RoomTypes
}

const CartSection = ({ items, type }: CartSectionProps): JSX.Element => {
  const {
    palette: { main, black },
  } = useTheme()
  const { deleteEvent } = useCart()
  return (
    <Grid container alignItems="flex-start" gap={2.5}>
      <Grid container>
        <Grid item xs>
          <Grid container gap={1.25} alignItems="flex-start">
            <IconButton
              disableRipple
              sx={{
                padding: `4px`,
                borderRadius: `4px`,
                border: `1px solid ${black.main}80`,
                '&:hover': {
                  backgroundColor: main.white,
                  cursor: `auto`,
                },
              }}
            >
              <Icon
                icon={type === RoomTypes.MUSIC ? `musicNote` : `yoga`}
                sx={{
                  fontSize: `1.875rem`,
                }}
              />
            </IconButton>
            <Grid container item xs marginTop={0.6} gap={1.25}>
              <Typography variant="h4" fontWeight={400} color={black.dark}>
                {type === RoomTypes.MUSIC
                  ? `Sala Aqviles x${items.length}`
                  : `Sala La Joya x${items.length}`}
              </Typography>
              <Grid container flexDirection="column" flexWrap="nowrap" gap={0.625}>
                {items.map((item, i) => (
                  <Grid
                    key={i}
                    container
                    item
                    md={10}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1">
                      {`${dayjs(item.date).format(`dddd DD`)} - ${item.startTime.slice(0, -3)}`}
                    </Typography>
                    <IconButton
                      sx={{
                        padding: 0,
                        borderRadius: `4px`,
                      }}
                    >
                      <Icon
                        onClick={() => deleteEvent(item)}
                        icon="close"
                        sx={{
                          fontSize: `1.125rem`,
                        }}
                      />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} marginTop={0.6}>
          <Typography variant="h4" fontWeight={400} color={black.dark} textAlign="right">
            {type === RoomTypes.MUSIC
              ? `$${(items.length * RoomPrices.MUSIC).toLocaleString(`es-CL`)}`
              : `$${(items.length * RoomPrices.DANCE).toLocaleString(`es-CL`)}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Divider
          sx={{
            width: `100%`,
            borderColor: `${black.dark}99`,
          }}
        />
      </Grid>
    </Grid>
  )
}

export default CartSection
