import { Container } from '@/common/components'
import RoomModal from '@/common/components/RoomModal'
import { Grid, Typography, useTheme } from '@mui/material'
import {
  SALA_AQVILES_1,
  SALA_AQVILES_2,
  SALA_AQVILES_3,
  SALA_AQVILES_4,
  SALA_AQVILES_5,
} from '@/assets'
import React, { useEffect } from 'react'

export interface RoomInformation {
  title: string
  description: string
}

export enum SectionRoomNames {
  AQVILES = `aqviles`,
}

const RoomNamesAllowed = Object.values(SectionRoomNames)

const RoomInformation: Record<SectionRoomNames, RoomInformation> = {
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
}

const RoomPhotos: Record<SectionRoomNames, string[]> = {
  aqviles: [SALA_AQVILES_1, SALA_AQVILES_2, SALA_AQVILES_3, SALA_AQVILES_4, SALA_AQVILES_5],
}

const RoomSection = (): JSX.Element => {
  const {
    palette: { main },
  } = useTheme()
  const [room, setRoom] = React.useState<SectionRoomNames | undefined>(undefined)
  const handleOpen = (room: SectionRoomNames): void => {
    history.pushState({}, ``, window.location.href + `?room=${room}`)
    setRoom(room)
  }
  const handleClose = (): void => {
    history.pushState({}, ``, window.location.href.split(`?`)[0])
    setRoom(undefined)
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    const urlRoom = url.href.split(`?`)[1]?.split(`=`)[1] as SectionRoomNames

    if (urlRoom && room === undefined && RoomNamesAllowed.includes(urlRoom)) {
      setRoom(urlRoom)
    } else {
      history.pushState({}, ``, window.location.href.split(`?`)[0])
    }
  }, [])

  return (
    <>
      <RoomModal
        roomInformation={RoomInformation[room as SectionRoomNames]}
        open={room !== undefined}
        onClose={handleClose}
        roomPhotos={RoomPhotos[room as SectionRoomNames]}
        room={room}
      />
      <Container id="room" paddingTop={6.25} paddingBottom={8} paddingX={4}>
        <Grid container justifyContent="center" gap={3.75}>
          <Grid
            container
            padding={2}
            sx={{
              borderRadius: `16px`,
              backgroundColor: `rgba(0,0,0,.1)`,
              boxShadow: `0 0 10px rgba(255,255,255,.5)`,
            }}
          >
            <Grid container justifyContent="center" marginBottom={3}>
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
                    backgroundColor: main.white,
                  },
                }}
              >
                Salas
              </Typography>
            </Grid>
            <Grid container position="relative" justifyContent="center" gap={2}>
              <Grid
                container
                xs
                height={457}
                sx={{
                  borderRadius: `8px`,
                  backgroundImage: `url(${SALA_AQVILES_5})`,
                  backgroundSize: `cover`,
                  backgroundPosition: `center`,
                  transition: `all .5s ease`,
                  zIndex: 1,
                  '&:hover': {
                    cursor: `pointer`,
                    clipPath: `polygon(100% 0, 100% 100%, 100% 100%, 0 100%, 0 0);`,
                    zIndex: 100,
                  },
                }}
                onClick={() => handleOpen(SectionRoomNames.AQVILES)}
              >
                <Grid
                  container
                  padding={2.5}
                  sx={{
                    borderRadius: `8px`,
                    background: {
                      xs: `linear-gradient(175deg, rgba(0,0,0,.7) 20%, rgba(0,0,0,.05) 45%);`,
                      sm: `linear-gradient(145deg, rgba(0,0,0,.7) 20%, rgba(0,0,0,.05) 45%);`,
                      md: `linear-gradient(160deg, rgba(0,0,0,.7) 20%, rgba(0,0,0,.05) 45%);`,
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
                    <Typography variant="h1">Sala Aqviles</Typography>
                    <Typography variant="subtitle2">
                      Sala destinada para bandas y solistas
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default RoomSection
