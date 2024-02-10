import { Icon } from '@/common/components'
import { useOrdersQuery } from '@/common/querys/useOrderQuery'
import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useMemo } from 'react'
import OrderItem from './components/OrderItem'
import { useAuth } from '@/common/context/AuthContext'
import DashboardCalendar from './components/DashboardCalendar'
import { useEventMonthQuery } from '@/common/querys/useEventQuery'
import { EventCalendar } from '@/common/types'
import dayjs from '../../common/settings/dayjs'

const Dashboard = (): JSX.Element => {
  const { logOut } = useAuth()
  const { data: orderQuery } = useOrdersQuery({})
  const [state, setState] = React.useState({
    month: dayjs().format(`YYYY-MM`),
  })
  const { month } = state
  const { data: eventsQuery } = useEventMonthQuery({
    month: month,
    options: {
      enabled: !!month,
    },
  })

  const orders = useMemo(() => {
    if (!orderQuery?.data) {
      return []
    }
    return orderQuery.data
  }, [orderQuery?.data])

  const events = useMemo(() => {
    if (!eventsQuery?.data) {
      return []
    }
    const formattedEvents: EventCalendar[] = eventsQuery.data.map((event) => ({
      ...event,
      start: dayjs(event.date)
        .hour(Number(event.startTime.split(`:`)[0]))
        .minute(0)
        .toDate(),
      end: dayjs(event.date)
        .hour(Number(event.endTime.split(`:`)[0]))
        .minute(0)
        .toDate(),
    }))
    return formattedEvents
  }, [eventsQuery?.data])

  return (
    <Grid
      container
      minHeight="100vh"
      position="relative"
      sx={{
        backgroundSize: `100% 100%`,
        backgroundPosition: `0px 0px,0px 0px,0px 0px,0px 0px,0px 0px`,
        backgroundImage: `repeating-linear-gradient(315deg, #00FFFF2E 92%, #073AFF00 100%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 1% 93%, #B000FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #00C9FFFF 0%, #5E00FFFF 100%)`,
      }}
    >
      <Grid
        container
        height="50px"
        bgcolor="black.main"
        paddingX={4}
        justifyContent="flex-end"
        position="fixed"
        zIndex={1000}
      >
        <Button
          onClick={logOut}
          variant="text"
          sx={{
            paddingX: 2,
            color: `white !important`,
            textTransform: `none`,
          }}
          startIcon={
            <Icon
              icon="logout"
              sx={{
                color: `white !important`,
              }}
            />
          }
        >
          Salir
        </Button>
      </Grid>
      <Grid
        container
        padding={4}
        paddingTop={10}
        justifyContent="space-between"
        gap={{ xs: 2, lg: 0 }}
        sx={{
          background: `rgba( 0, 0, 0, 0.20 )`,
          backdropFilter: `blur( 15px )`,
        }}
      >
        <Grid
          container
          item
          lg={4.5}
          xs={12}
          bgcolor="main.white"
          borderRadius={2}
          padding={4}
          flexDirection="column"
          gap={3}
          sx={{
            boxShadow: `0px 5px 5px rgba( 0, 0, 0, 0.20 )`,
          }}
        >
          <Typography variant="h2">Órdenes</Typography>
          <Grid
            container
            gap={2}
            sx={{
              overflowY: `auto`,
              maxHeight: `calc(100vh - 300px)`,
            }}
          >
            {orders.map((order) => (
              <OrderItem key={order.uuid} order={order} />
            ))}
          </Grid>
          {orders.length === 0 ? (
            <Grid container>
              <Typography variant="h4">No existen órdenes</Typography>
            </Grid>
          ) : null}
        </Grid>
        <Grid
          container
          item
          lg={7}
          xs={12}
          bgcolor="main.white"
          borderRadius={2}
          padding={4}
          flexDirection="column"
          gap={3}
          sx={{
            boxShadow: `0px 5px 5px rgba( 0, 0, 0, 0.20 )`,
          }}
        >
          <Typography variant="h2">Calendario</Typography>
          <Grid container>
            <DashboardCalendar events={events} setState={setState} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Dashboard
