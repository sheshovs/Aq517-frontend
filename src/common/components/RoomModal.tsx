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
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React from 'react'
import Icon from './Icon'
import { RoomInformation } from '@/modules/home/components/RoomSection'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'

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
  onClose: () => void
}

const RoomModal = ({ roomInformation, roomPhotos, open, onClose }: RoomModalProps): JSX.Element => {
  const {
    palette: { primary },
  } = useTheme()
  const mobileWidth = useMediaQuery((theme: Theme) => theme.breakpoints.down(`md`))
  const [selectedPhotoIndex, setSelectedIndexPhoto] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)

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
            <Grid container item xs={12} md={7} flexDirection="column" gap={2}>
              <Grid container alignItems="center" gap={0.5}>
                {!mobileWidth ? (
                  <IconButton
                    disabled={selectedPhotoIndex === 0}
                    sx={{
                      paddingY: 2,
                      paddingX: 0.5,
                      borderRadius: 2,
                    }}
                    onClick={
                      selectedPhotoIndex === 0
                        ? () => null
                        : () => setSelectedIndexPhoto(selectedPhotoIndex - 1)
                    }
                  >
                    <Icon icon="backArrow" />
                  </IconButton>
                ) : null}

                <Grid container item xs>
                  {isLoading ? (
                    <Skeleton animation="wave" variant="rounded" height={400} width="100%" />
                  ) : null}
                  <img
                    src={roomPhotos?.[selectedPhotoIndex]}
                    width="100%"
                    height="100%"
                    onLoad={() => setIsLoading(false)}
                    style={{
                      borderRadius: `4px`,
                      display: isLoading ? `none` : `block`,
                    }}
                  />
                </Grid>
                {!mobileWidth ? (
                  <IconButton
                    disabled={selectedPhotoIndex === roomPhotos?.length - 1}
                    sx={{
                      paddingY: 2,
                      paddingX: 0.5,
                      borderRadius: 2,
                    }}
                    onClick={
                      selectedPhotoIndex === roomPhotos?.length - 1
                        ? () => null
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
                paddingBottom={1}
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
                <Grid container alignSelf="flex-end" justifyContent="flex-end">
                  <Link href="#reserve">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: `200px`,
                        height: `42px`,
                      }}
                      onClick={onClose}
                    >
                      Reservar ahora
                    </Button>
                  </Link>
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
