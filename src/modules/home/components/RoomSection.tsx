import { Container } from '@/common/components'
import RoomModal from '@/common/components/RoomModal'
import { Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

export interface RoomInformation {
  title: string
  description: string
}

const RoomInformation: Record<string, RoomInformation> = {
  aqviles: {
    title: `Aqviles`,
    description: `Sala destinada para bandas y solistas. <br />
    Tiene una superficie de 12 m<sup>2</sup> aprox. <br />
    Cuenta con el siguiente backline:
    <ul>
    <li>Batería Gretsch Renegade plateada Medidas: Bombo 20', Toms: 10', 12', 14' y 16', Caja de 14', Atriles de HH, y tres atriles de platos</li>
    <li>2 amplificadores de guitarra Laney LX120RTwin</li>
    <li>Amplificador de bajo ASHDOWN STUDIO12</li>
    <li>Hasta 4 micrófonos</li>
    <li>Power y cajas Laney, PA in a Box, Concept, 5 Channel 160W CDPA-2</li>
    </ul>
    `,
  },
  // joya: {
  //   title: `La Joya`,
  // description: `Sala destinada para quienes practican las artes escénicas tales
  // como danza árabe, fusión, contemporánea, pilates, zumba, etc. También es un espacio
  // para talleres de teatro o actuación. Además puede ser utilizada para artes marciales. <br />
  //   Cuenta con espejo pegado a pared y un parlante con bluetooth. `,
  // },
}

const RoomSection = (): JSX.Element => {
  const {
    palette: { primary, main },
  } = useTheme()
  const [room, setRoom] = React.useState<string>(``)
  const handleOpen = (room: string): void => {
    setRoom(room)
  }
  const handleClose = (): void => {
    setRoom(``)
  }

  return (
    <>
      <RoomModal roomInformation={RoomInformation[room]} open={room !== ``} onClose={handleClose} />
      <Container id="room" paddingTop={6.25} paddingBottom={12} paddingX={4}>
        <Grid container justifyContent="center" gap={3.75}>
          <Typography
            variant="h1"
            textAlign="center"
            sx={{
              '&:after': {
                content: `""`,
                display: `block`,
                margin: `auto`,
                width: `80px`,
                height: `5px`,
                backgroundColor: primary.main,
              },
            }}
          >
            Salas
          </Typography>
          <Grid container>
            <Grid container position="relative" minHeight={457}>
              <Grid
                container
                height={457}
                sx={{
                  position: `absolute`,
                  borderRadius: 2,
                  bgcolor: main.white,
                  // clipPath: {
                  //   xs: `polygon(100% 0, 100% 45%, 0 55%, 0 55%, 0 0);`,
                  //   sm: `polygon(100% 0, 100% 0, 0 100%, 0 100%, 0 0);`,
                  // },
                  transition: `all .5s ease`,
                  zIndex: 1,
                  '&:hover': {
                    cursor: `pointer`,
                    clipPath: `polygon(100% 0, 100% 100%, 100% 100%, 0 100%, 0 0);`,
                    zIndex: 100,
                  },
                }}
                onClick={() => handleOpen(`aqviles`)}
              >
                <Grid
                  container
                  padding={2.5}
                  sx={{
                    borderRadius: 2,
                    background: {
                      xs: `linear-gradient(175deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.05) 45%);`,
                      sm: `linear-gradient(145deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.05) 45%);`,
                      md: `linear-gradient(160deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.05) 45%);`,
                    },
                  }}
                >
                  <Grid
                    container
                    flexDirection="column"
                    width="320px"
                    gap={1}
                    sx={{
                      color: main.white,
                    }}
                  >
                    <Typography variant="h1">Aqviles</Typography>
                    <Typography variant="subtitle2">
                      Sala destinada para bandas y solistas
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid
                container
                height={457}
                sx={{
                  position: `absolute`,
                  borderRadius: 2,
                  bgcolor: main.white,
                  clipPath: {
                    xs: `polygon(100% 44%, 100% 100%, 0 100%, 0 55%, 100% 45%);`,
                    sm: `polygon(100% 0, 100% 100%, 0 100%, 0 100%, 100% 0);`,
                  },
                  transition: `all .5s ease`,
                  zIndex: 1,
                  '&:hover': {
                    cursor: `pointer`,
                    clipPath: `polygon(100% 0, 100% 100%, 0 100%, 0 0, 0 0);`,
                  },
                }}
                onClick={() => handleOpen(`joya`)}
              >
                <Grid
                  container
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  padding={2.5}
                  sx={{
                    borderRadius: 2,
                    background: {
                      xs: `linear-gradient(355deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.05) 45%);`,
                      sm: `linear-gradient(325deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.05) 45%);`,
                      md: `linear-gradient(340deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.05) 45%);`,
                    },
                  }}
                >
                  <Grid
                    container
                    flexDirection="column"
                    width="320px"
                    gap={1}
                    sx={{
                      color: main.white,
                    }}
                  >
                    <Typography variant="h1">La Joya</Typography>
                    <Typography variant="subtitle2">
                      Sala destinada para quienes practican las artes escénicas tales como danza
                      árabe, fusión, contemporánea, pilates, zumba, etc.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default RoomSection
