import { Icon } from '@/common/components'
import { useOrdersQuery } from '@/common/querys/useOrderQuery'
import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useMemo } from 'react'
import OrderItem from './components/OrderItem'
import { useAuth } from '@/common/context/AuthContext'
import DashboardCalendar from './components/DashboardCalendar'
import { useEventMonthQuery } from '@/common/querys/useEventQuery'
import dayjs from 'dayjs'
import { EventCalendar } from '@/common/types'

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
    <Grid container minHeight="100vh" bgcolor="main.whiteBackground" position="relative">
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
