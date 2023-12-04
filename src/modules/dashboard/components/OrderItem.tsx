import { OrderResponse, OrderStatusesColors, OrderStatusesLabels, RoomNames } from '@/common/types'
import { Button, Chip, Grid, Typography, useTheme } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'

interface OrderItemProps {
  order: OrderResponse
}

const OrderItem = ({ order }: OrderItemProps): JSX.Element => {
  const {
    palette: { primary, black },
  } = useTheme()

  const [open, setOpen] = useState(false)

  return (
    <Grid
      container
      key={order.uuid}
      padding={2}
      sx={{
        border: `2px solid ${primary.main}`,
        borderRadius: 2,
        boxShadow: `0px 5px 5px ${black.main}33`,
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid container alignItems="center">
        <Grid container item xs gap={1}>
          <Typography variant="h4">{order.attendant}</Typography>
          <Chip
            color={OrderStatusesColors[order.status]}
            label={OrderStatusesLabels[order.status]}
          />
        </Grid>

        <Typography variant="h4">${order.total_price.toLocaleString(`es-CL`)}</Typography>
      </Grid>
      <Grid container marginTop={open ? 1 : 0}>
        {open ? (
          <>
            <Grid container flexDirection="column" marginBottom={0.5} gap={0.5}>
              <Typography variant="subtitle1">{`Email: ${order.email}`}</Typography>
              <Typography variant="subtitle1">{`Teléfono: ${order.phone}`}</Typography>
            </Grid>
            {order.events.length > 0 ? (
              <Typography variant="subtitle1">Horarios:</Typography>
            ) : null}
            {order.events.length > 0 &&
              order.events.map((event) => (
                <Grid container key={event.uuid} marginBottom={0.5} paddingLeft={4}>
                  <Typography variant="subtitle1">{`Sala ${RoomNames[event.room]}, ${dayjs(
                    event.date,
                  ).format(`dddd DD`)} - ${event.startTime.slice(0, -3)}`}</Typography>
                </Grid>
              ))}
          </>
        ) : null}
      </Grid>
      <Grid container marginTop={!open ? 1 : 0}>
        <Button
          onClick={() => setOpen(!open)}
          sx={{
            textTransform: `none`,
          }}
        >
          {open ? `Ocultar` : `Ver`} detalle
        </Button>
      </Grid>
    </Grid>
  )
}

export default OrderItem
