import { Button, Divider, Grid, Link, Paper, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import LOGO_AQVILES from './../../../assets/logoAR.png'
import { useTransbankConfirmQuery } from '@/common/querys/useTransbankQuery'
import { TransactionStatusLabel } from '@/common/types/transaction'
import { useOrderQuery } from '@/common/querys/useOrderQuery'
import dayjs from '../../../common/settings/dayjs'
import { toJpeg } from 'html-to-image'

const Transbank = (): JSX.Element => {
  const transactionRef = React.useRef<HTMLDivElement>(null)
  const queryParams = new URLSearchParams(window.location.search)
  const transactionToken = queryParams.get(`token_ws`)
  const orderId = queryParams.get(`orderId`)

  const { data: transbankData } = useTransbankConfirmQuery({
    token: `${transactionToken}`,
    options: { enabled: !!transactionToken },
  })

  const { data: orderData } = useOrderQuery({
    orderId: `${orderId}`,
    options: { enabled: !!orderId },
  })
  const transaction = useMemo(() => {
    if (!transbankData?.data) return null
    return transbankData.data
  }, [transbankData?.data])

  const order = useMemo(() => {
    if (!orderData?.data) return null
    return orderData.data
  }, [orderData])

  const handleDownload = (): void => {
    toJpeg(transactionRef.current as HTMLElement, { quality: 0.95 }).then((dataUrl) => {
      const link = document.createElement(`a`)
      link.download = `comprobante_${transaction?.buy_order || `AQ`}.jpeg`
      link.href = dataUrl
      link.click()
    })
  }

  return (
    <Grid
      container
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundSize: `100% 100%`,
        backgroundPosition: `0px 0px,0px 0px,0px 0px,0px 0px,0px 0px`,
        backgroundImage: `repeating-linear-gradient(315deg, #00FFFF2E 92%, #073AFF00 100%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 1% 93%, #B000FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #00C9FFFF 0%, #5E00FFFF 100%)`,
      }}
    >
      <Grid
        container
        height="100%"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: `rgba( 0, 0, 0, 0.20 )`,
          backdropFilter: `blur( 15px )`,
        }}
      >
        <Grid container item xs={12} md={6} lg={4} gap={3}>
          <Paper
            ref={transactionRef}
            elevation={3}
            sx={{
              width: `100%`,
              borderRadius: 2,
            }}
          >
            <Grid container paddingY={4} paddingX={6}>
              <Grid container item xs={12} paddingBottom={3} flexDirection="column">
                <Grid container justifyContent="center">
                  <Link
                    href="/"
                    sx={{
                      width: `auto`,
                      height: `85%`,
                    }}
                  >
                    <img
                      src={LOGO_AQVILES}
                      alt="Logo Aqviles Records"
                      height={100}
                      style={{
                        borderRadius: 100,
                      }}
                    />
                  </Link>
                </Grid>
                <Grid container justifyContent="center" marginBottom={2}>
                  <Typography variant="h2">
                    Transacción {transaction?.status && TransactionStatusLabel[transaction.status]}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">N° de pedido:</Typography>
                  <Typography variant="h6">{transaction?.buy_order}</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">Código de autorización:</Typography>
                  <Typography variant="h6">{transaction?.authorization_code}</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">Fecha:</Typography>
                  <Typography variant="h6">
                    {dayjs(transaction?.transaction_date).format(`DD/MM/YYYY`)}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">Hora:</Typography>
                  <Typography variant="h6">
                    {dayjs(transaction?.transaction_date).format(`HH:mm`)}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">N° de tarjeta:</Typography>
                  <Typography variant="h6">{transaction?.card_detail?.card_number}</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">Cuotas:</Typography>
                  <Typography variant="h6">{transaction?.installments_number}</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography variant="h6">Monto:</Typography>
                  <Typography variant="h6" fontWeight={700}>
                    ${transaction?.amount?.toLocaleString(`es-CL`)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container flexDirection="column" gap={1} alignItems="center" marginBottom={2}>
                <Typography variant="h5" fontWeight={700}>
                  Detalles de la compra
                </Typography>
                <Divider
                  sx={{
                    width: `100%`,
                  }}
                />
                <Grid container paddingX={1}>
                  {order?.events.map((event) => {
                    const startTime = dayjs(`${event.date} ${event.startTime}`)
                    const endTime = dayjs(`${event.date} ${event.endTime}`)
                    const hoursQuantity = endTime.diff(startTime, `hour`)

                    return (
                      <Grid container key={event.uuid} marginBottom={1}>
                        <Grid container justifyContent="space-between">
                          <Typography fontWeight={600}>
                            {`${dayjs(event.date).format(`dddd DD`)} - ${event.startTime.slice(
                              0,
                              -3,
                            )} a ${event.endTime.slice(0, -3)}`}
                          </Typography>
                          <Typography fontWeight={600}>
                            ${(event.room.price * hoursQuantity).toLocaleString(`es-CL`)}
                          </Typography>
                        </Grid>
                        {event.accesories.map((accesory) => (
                          <Grid container key={accesory.uuid} justifyContent="space-between">
                            <Typography paddingLeft={2}>- {accesory.name}</Typography>
                            <Typography fontWeight={400}>
                              ${accesory.price.toLocaleString(`es-CL`)}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    )
                  })}
                </Grid>
                <Divider
                  sx={{
                    width: `100%`,
                  }}
                />
                <Grid container justifyContent="space-between" alignItems="center" paddingX={1}>
                  <Typography variant="h4">Total:</Typography>
                  <Typography variant="h4">
                    ${order?.total_price.toLocaleString(`es-CL`)}
                  </Typography>
                </Grid>
                <Divider
                  sx={{
                    width: `100%`,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
          <Grid container item xs={12} gap={3} justifyContent="center">
            <Grid container item xs={6} justifyContent="center">
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="info"
                onClick={handleDownload}
              >
                Descargar comprobante
              </Button>
            </Grid>
            <Grid container item xs={6} justifyContent="center">
              <Link
                href="/"
                sx={{
                  width: `100%`,
                }}
              >
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    color: `white`,
                    '&:hover': {
                      background: `rgba(255,255,255,0.2)`,
                    },
                  }}
                >
                  Volver
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Transbank
