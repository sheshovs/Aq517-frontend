import { Icon } from '@/common/components'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import useDashboard from '../hooks/useDashboard'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CustomButtonDashboard from '@/common/components/ButtonDashboard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface NewOrderProps {
  open: boolean
  onClose: () => void
}

const NewOrder = ({ open, onClose }: NewOrderProps): JSX.Element => {
  const {
    palette: { black, primary, main },
  } = useTheme()
  const {
    name,
    email,
    phone,
    rooms,
    selectedRoom,
    date,
    hours,
    disabledHours,
    hoursSelected,
    accesoriesSelected,
    sessions,
    totalPrice,
    handleChange,
    handleRoomChange,
    handleDateChange,
    onClickHour,
    onClickAccesory,
    resetState,
    onAddOrder,
  } = useDashboard({ onClose })
  const [expanded, setExpanded] = useState<string>(``)

  return (
    <Drawer open={open} onClose={resetState} anchor="right">
      <Grid
        container
        paddingX={5}
        paddingY={4}
        maxWidth={550}
        width="100%"
        minHeight="100vh"
        gap={3}
        flexDirection="column"
        flexWrap="nowrap"
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h2">Nueva orden</Typography>
          <IconButton
            onClick={onClose}
            sx={{
              padding: `4px`,
              borderRadius: `4px`,
            }}
          >
            <Icon icon="close" />
          </IconButton>
        </Grid>
        <Grid container gap={1.5}>
          <Typography variant="h4" marginBottom={0.5}>
            Datos del cliente
          </Typography>
          <Grid container gap={0.5}>
            <Typography variant="body1" color={black.light} fontWeight={500}>
              Nombre completo
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Grid>
          <Grid container gap={0.5}>
            <Typography variant="body1" color={black.light} fontWeight={500}>
              Correo electrónico
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Grid>
          <Grid container gap={0.5}>
            <Typography variant="body1" color={black.light} fontWeight={500}>
              Teléfono
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="phone"
              value={phone}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography
                      sx={{
                        color: black.lightFooter,
                      }}
                    >
                      +569
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container gap={1.5}>
          <Typography variant="h4" marginBottom={0.5}>
            Datos de la reserva
          </Typography>
          <Grid container justifyContent="space-between">
            <Grid container item gap={0.5} xs={5.8}>
              <Typography variant="body1" color={black.light} fontWeight={500}>
                Sala
              </Typography>
              <TextField
                select
                fullWidth
                variant="outlined"
                size="small"
                value={selectedRoom}
                onChange={handleRoomChange}
              >
                {rooms.map((room) => (
                  <MenuItem key={room.uuid} value={room as unknown as string}>
                    {room.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid container item gap={0.5} xs={5.8}>
              <Typography variant="body1" color={black.light} fontWeight={500}>
                Fecha
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DatePicker
                  value={date}
                  format="DD/MM/YYYY"
                  onChange={handleDateChange}
                  showDaysOutsideCurrentMonth
                  dayOfWeekFormatter={(dayOfWeek) =>
                    dayOfWeek[0].toUpperCase() + dayOfWeek.slice(1, 3)
                  }
                  sx={{
                    width: `100%`,
                    div: {
                      height: `40px`,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container gap={0.5}>
            <Typography variant="body1" color={black.light} fontWeight={500}>
              Horas
            </Typography>
            <Grid container gap={{ lg: 1, xs: 1 }}>
              {hours.map((hour, i) => {
                const index = hoursSelected.findIndex(
                  (item) => item.hour.isSame(hour) && item.room.uuid === selectedRoom?.uuid,
                )
                const isSelected = index !== -1
                const disabled = disabledHours.includes(hour.format(`HH:mm:ss`))
                return (
                  <CustomButtonDashboard
                    key={i}
                    text={hour.format(`HH:mm`)}
                    onClick={() => onClickHour(hour)}
                    disabled={disabled}
                    variant={isSelected ? `contained` : `outlined`}
                    width={70}
                  />
                )
              })}
            </Grid>
          </Grid>
          {sessions.length > 0 ? (
            <Grid container gap={0.5}>
              <Typography variant="body1" color={black.light} fontWeight={500}>
                Sesiones
              </Typography>
              <Grid container gap={0.5}>
                {sessions.map((session, i) => {
                  return (
                    <Accordion
                      key={i}
                      disableGutters
                      expanded={expanded === `${i}`}
                      onChange={() => {
                        if (expanded === `${i}`) {
                          setExpanded(``)
                          return
                        }
                        setExpanded(`${i}`)
                      }}
                      sx={{
                        backgroundColor: `transparent`,
                        width: `100%`,
                        borderRadius: `5px`,
                        boxShadow: `none`,
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          backgroundColor: main.white,
                          border: `1px solid ${primary.main}`,
                          borderRadius: expanded === `${i}` ? `5px 5px 0 0` : `5px`,
                        }}
                      >
                        <Typography variant="h6">
                          {session.startTime} a {session.endTime} | {session.date.format(`DD`)} de
                          {` `}
                          {session.date.format(`MMMM`)}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          border: `1px solid #00000033`,
                          paddingY: 1.25,
                          borderRadius: `0 0 5px 5px`,
                        }}
                      >
                        <Grid container gap={{ lg: 1, xs: 1 }}>
                          {selectedRoom?.items.map((accessory, i) => {
                            const index = accesoriesSelected.findIndex(
                              (item) =>
                                item.name === accessory.name &&
                                item.session.date.isSame(session.date) &&
                                item.session.startTime === session.startTime &&
                                item.session.endTime === session.endTime,
                            )
                            const isSelected = index !== -1
                            return (
                              <CustomButtonDashboard
                                key={i}
                                text={accessory.name}
                                disabled={!accessory.isActive}
                                variant={isSelected ? `contained` : `outlined`}
                                onClick={() => {
                                  const accesory = {
                                    uuid: accessory.uuid,
                                    name: accessory.name,
                                    price: accessory.price,
                                    session: session,
                                  }
                                  onClickAccesory(accesory)
                                }}
                              />
                            )
                          })}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" paddingBottom={4}>
          <Typography variant="h3">Total: ${totalPrice.toLocaleString(`es-CL`)}</Typography>
          <Button variant="contained" size="large" onClick={onAddOrder}>
            Crear orden
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  )
}

export default NewOrder
