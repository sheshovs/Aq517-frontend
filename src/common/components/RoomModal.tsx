import {
  Button,
  Fade,
  Grid,
  IconButton,
  Link,
  Modal,
  PaletteColor,
  Skeleton,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useEffect } from 'react'
import Icon from './Icon'
import { RoomInformation } from '@/modules/home/components/RoomSection'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'
import { FaWhatsapp } from 'react-icons/fa'

const Image = styled.img<{ selectedPhotoIndex?: number; index?: number; primary: PaletteColor }>`
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${({ selectedPhotoIndex, index, primary }) =>
    selectedPhotoIndex === index ? `2px solid ${primary.main}` : `2px solid transparent`};
  &:hover {
    border: 2px solid ${({ primary }) => primary.main};
  }
`

interface RoomModalProps {
  roomInformation: RoomInformation | null
  roomPhotos: string[]
  open: boolean
  room: string
  onClose: () => void
}

const RoomModal = ({
  roomInformation,
  roomPhotos,
  open,
  room,
  onClose,
}: RoomModalProps): JSX.Element => {
  const {
    palette: { primary },
  } = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const mobileWidth = useMediaQuery((theme: Theme) => theme.breakpoints.down(`md`))
  const [selectedPhotoIndex, setSelectedIndexPhoto] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)

  const onShareButtonClick = (): void => {
    navigator.clipboard.writeText(window.location.href)
    enqueueSnackbar(`Se ha copiado el enlace de la sala`, {
      variant: `success`,
    })
  }

  useEffect(() => {
    setSelectedIndexPhoto(0)
  }, [room])

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
    >
      <Fade in={open}>
        <Grid
          container
          item
          maxHeight="90vh"
          lg={8}
          sm={10}
          xs={11}
          padding={4}
          bgcolor="main.white"
          gap={2}
          flexWrap="nowrap"
          position="relative"
          flexDirection={{ xs: `column`, md: `row` }}
          overflow="auto"
          sx={{
            borderRadius: 2,
            ':focus-visible': {
              outline: `none`,
            },
          }}
        >
          <IconButton
            sx={{
              position: `absolute`,
              right: 10,
              top: 10,
              padding: 0.5,
              borderRadius: 1,
            }}
            onClick={onClose}
          >
            <Icon icon="close" />
          </IconButton>
          <>
            <Grid container item xs={12} md={7} flexDirection="column" gap={2} alignItems="center">
              <Grid container alignItems="center" gap={0.5}>
                {!mobileWidth ? (
                  <IconButton
                    sx={{
                      paddingY: 2,
                      paddingX: 0.5,
                      borderRadius: 2,
                    }}
                    onClick={
                      selectedPhotoIndex === 0
                        ? () => setSelectedIndexPhoto(roomPhotos.length - 1)
                        : () => setSelectedIndexPhoto(selectedPhotoIndex - 1)
                    }
                  >
                    <Icon icon="backArrow" />
                  </IconButton>
                ) : null}

                <Grid container item xs justifyContent="center">
                  {isLoading ? (
                    <Skeleton animation="wave" variant="rounded" height={400} width="100%" />
                  ) : null}
                  <img
                    src={roomPhotos?.[selectedPhotoIndex]}
                    onLoad={() => setIsLoading(false)}
                    loading="lazy"
                    width="100%"
                    height="100%"
                    style={{
                      borderRadius: `4px`,
                      display: isLoading ? `none` : `block`,
                    }}
                  />
                </Grid>
                {!mobileWidth ? (
                  <IconButton
                    sx={{
                      paddingY: 2,
                      paddingX: 0.5,
                      borderRadius: 2,
                    }}
                    onClick={
                      selectedPhotoIndex === roomPhotos?.length - 1
                        ? () => setSelectedIndexPhoto(0)
                        : () => setSelectedIndexPhoto(selectedPhotoIndex + 1)
                    }
                  >
                    <Icon icon="nextArrow" />
                  </IconButton>
                ) : null}
              </Grid>
              <Grid
                container
                gap={2}
                justifyContent="flex-start"
                alignItems="center"
                flexWrap="nowrap"
                sx={{
                  overflowX: `auto`,
                }}
              >
                {isLoading ? (
                  <>
                    <Skeleton animation="wave" variant="rounded" height={80} width={100} />
                    <Skeleton animation="wave" variant="rounded" height={80} width={100} />
                    <Skeleton animation="wave" variant="rounded" height={80} width={100} />
                    <Skeleton animation="wave" variant="rounded" height={80} width={100} />
                    <Skeleton animation="wave" variant="rounded" height={80} width={100} />
                  </>
                ) : null}
                {roomPhotos?.map((photo, index) => (
                  <Image
                    key={index}
                    src={photo}
                    width={100}
                    height={80}
                    selectedPhotoIndex={selectedPhotoIndex}
                    index={index}
                    primary={primary}
                    onClick={() => setSelectedIndexPhoto(index)}
                    style={{
                      display: isLoading ? `none` : `block`,
                    }}
                  />
                ))}
              </Grid>
            </Grid>
            {isLoading ? (
              <Grid
                container
                item
                xs={12}
                md={5}
                paddingTop={4}
                flexDirection="column"
                justifyContent="space-between"
              >
                <Grid container gap={0.5}>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    height={50}
                    width="80%"
                    sx={{
                      marginBottom: 2,
                    }}
                  />
                  <Skeleton animation="wave" variant="rounded" height={25} width="90%" />
                  <Skeleton animation="wave" variant="rounded" height={25} width="95%" />
                  <Skeleton animation="wave" variant="rounded" height={25} width="90%" />
                  <Skeleton animation="wave" variant="rounded" height={25} width="100%" />
                  <Skeleton animation="wave" variant="rounded" height={25} width="85%" />
                  <Skeleton animation="wave" variant="rounded" height={25} width="90%" />
                  <Skeleton animation="wave" variant="rounded" height={25} width="60%" />
                </Grid>

                <Grid container justifyContent="flex-end" marginTop={4}>
                  <Skeleton animation="wave" variant="rounded" height={42} width={200} />
                </Grid>
              </Grid>
            ) : (
              <Grid container item xs={12} md={5} flexDirection="column" gap={2} height="100%">
                <Typography variant="h2">Sala {roomInformation?.title}</Typography>
                <Typography>{ReactHtmlParser(roomInformation?.description || ``)}</Typography>
                <Grid container alignSelf="flex-end" justifyContent="flex-end" gap={1}>
                  <Tooltip title="Compartir" arrow>
                    <IconButton
                      sx={{
                        border: `1px solid ${room === `miniStudio` ? `#25c366` : primary.main}`,
                        borderRadius: `4px`,
                      }}
                      onClick={onShareButtonClick}
                    >
                      <Icon
                        icon="share"
                        sx={{
                          color: room === `miniStudio` ? `#25c366` : primary.main,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  {room === `miniStudio` ? (
                    <Button
                      variant="contained"
                      startIcon={<FaWhatsapp />}
                      sx={{
                        width: `200px`,
                        height: `42px`,
                        backgroundColor: `#25d366`,
                        fontSize: `1rem`,
                        '&:hover': {
                          backgroundColor: `#25c366`,
                        },
                      }}
                      onClick={() => {
                        window.open(
                          `https://wa.me/56962190141?text=Hola, estoy interesado en el Mini Studio, me gustaría saber más información`,
                        )
                      }}
                    >
                      Consultar
                    </Button>
                  ) : (
                    <Link href="#reserve">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          width: `200px`,
                          height: `42px`,
                          fontSize: `1rem`,
                        }}
                        onClick={onClose}
                      >
                        Reservar ahora
                      </Button>
                    </Link>
                  )}
                </Grid>
              </Grid>
            )}
          </>
        </Grid>
      </Fade>
    </Modal>
  )
}

export default RoomModal
