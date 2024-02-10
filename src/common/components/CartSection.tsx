import { Button, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Icon } from '.'
import { useCart } from '../context/CartContext'
import { RoomTypes } from '../types/room'
import { EventResponse } from '../types'
import dayjs from '../settings/dayjs'

interface CartSectionProps {
  items: EventResponse[]
  type: RoomTypes
  price: number
}

const CartSection = ({ items, type, price }: CartSectionProps): JSX.Element => {
  const {
    palette: { main, black },
  } = useTheme()
  const { deleteEvent } = useCart()
  const [moreDetails, setMoreDetails] = React.useState(false)
  return (
    <Grid container alignItems="flex-start">
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
                {type === RoomTypes.MUSIC ? `Sala Aqviles` : `Sala La Joya`}
              </Typography>
              <Grid container flexDirection="column" flexWrap="nowrap">
                {items.map((item, i) => (
                  <Grid key={i} container item md={12}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1">
                        {`${dayjs(item.date).format(`dddd DD`)} - ${item.startTime.slice(
                          0,
                          -3,
                        )} a ${item.endTime.slice(0, -3)}`}
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
                    <Grid container flexDirection="column">
                      {moreDetails && item.accesories.length > 0
                        ? item.accesories.map((accesory) => (
                          <Typography key={accesory.uuid} variant="subtitle2" paddingLeft={2}>
                            - {accesory.name}
                          </Typography>
                        ))
                        : null}
                      {items.length > 1 && i !== items.length - 1 ? (
                        <Divider
                          sx={{
                            width: `100%`,
                            borderColor: `${black.light}26`,
                            marginTop: `${moreDetails && item.accesories.length > 0 ? 8 : 4}px`,
                            marginBottom: `${moreDetails && item.accesories.length > 0 ? 8 : 4}px`,
                          }}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item width="fit-content" marginTop={0.6}>
          <Typography variant="h4" fontWeight={400} color={black.dark} textAlign="right">
            ${price.toLocaleString(`es-CL`)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container paddingTop={2} paddingBottom={1}>
        <Button
          color="primary"
          sx={{
            textTransform: `none`,
          }}
          onClick={() => setMoreDetails(!moreDetails)}
        >
          {moreDetails ? `Ocultar` : `Más`} detalles
        </Button>
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
