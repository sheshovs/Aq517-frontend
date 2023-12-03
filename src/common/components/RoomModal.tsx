import { Button, Grid, IconButton, Link, Modal, Skeleton, Typography } from '@mui/material'
import React from 'react'
import Icon from './Icon'
import { RoomInformation } from '@/modules/home/components/RoomSection'
import ReactHtmlParser from 'react-html-parser'

interface RoomModalProps {
  roomInformation: RoomInformation | null
  open: boolean
  onClose: () => void
}

const RoomModal = ({ roomInformation, open, onClose }: RoomModalProps): JSX.Element => {
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
        <Grid container item xs={12} md={7} flexDirection="column" gap={2}>
          <Grid container alignItems="center" gap={0.5}>
            <IconButton
              sx={{
                paddingY: 2,
                paddingX: 0.5,
                borderRadius: 2,
              }}
            >
              <Icon icon="backArrow" />
            </IconButton>
            <Grid container xs>
              <Skeleton
                animation="wave"
                variant="rounded"
                height={400}
                sx={{
                  width: `100%`,
                }}
              />
            </Grid>
            <IconButton
              sx={{
                paddingY: 2,
                paddingX: 0.5,
                borderRadius: 2,
              }}
            >
              <Icon icon="nextArrow" />
            </IconButton>
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
            <Skeleton
              animation="wave"
              variant="rounded"
              width={100}
              height={80}
              sx={{ minWidth: 100 }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={100}
              height={80}
              sx={{ minWidth: 100 }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={100}
              height={80}
              sx={{ minWidth: 100 }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={100}
              height={80}
              sx={{ minWidth: 100 }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={100}
              height={80}
              sx={{ minWidth: 100 }}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={5} flexDirection="column" gap={2} height="100%">
          <Typography variant="h2">Sala {roomInformation?.title}</Typography>
          <Typography>{ReactHtmlParser(roomInformation?.description)}</Typography>
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
      </Grid>
    </Modal>
  )
}

export default RoomModal
