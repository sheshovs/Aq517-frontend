import { OrderResponse, OrderStatusesColors, OrderStatusesLabels } from '@/common/types'
import { Button, Chip, Collapse, Grid, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import dayjs from '../../../common/settings/dayjs'

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
      <Collapse in={open}>
        <Grid container marginTop={1}>
          <Grid container flexDirection="column" marginBottom={0.5} gap={0.5}>
            <Typography variant="subtitle1">{`Email: ${order.email}`}</Typography>
            <Typography variant="subtitle1">{`Teléfono: ${order.phone}`}</Typography>
          </Grid>
          {order.events.length > 0 ? <Typography variant="subtitle1">Horarios:</Typography> : null}
          {order.events.length > 0 &&
            order.events.map((event) => (
              <>
                <Grid container key={event.uuid} paddingLeft={4}>
                  <Typography variant="subtitle1" fontWeight={500}>{`Sala ${event.room.name
                    }, ${dayjs(event.date).format(`dddd DD`)} - ${event.startTime.slice(
                      0,
                      -3,
                    )} a ${event.endTime.slice(0, -3)}`}</Typography>
                </Grid>
                {event.accesories.length > 0 ? (
                  <>
                    <Grid container paddingLeft={6}>
                      <Typography variant="subtitle1">
                        Accesorios:{` `}
                        {event.accesories.map((accesory, i) =>
                          i === event.accesories.length - 1
                            ? `${accesory.name}`
                            : `${accesory.name}, `,
                        )}
                      </Typography>
                    </Grid>
                  </>
                ) : null}
              </>
            ))}
        </Grid>
      </Collapse>
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
