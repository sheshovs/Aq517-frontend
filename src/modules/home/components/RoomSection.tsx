import { Container } from '@/common/components'
import { Grid, Skeleton, Typography, useTheme } from '@mui/material'
import React from 'react'

const RoomSection = (): JSX.Element => {
  const {
    palette: { primary },
  } = useTheme()
  return (
    <Container paddingY={6.25}>
      <Grid container justifyContent="center" gap={3.75}>
        <Typography
          variant="h1"
          textAlign="center"
          textTransform="uppercase"
          sx={{
            '&:after': {
              content: `""`,
              display: `block`,
              margin: `auto`,
              width: `90px`,
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
              width={1300}
              height={457}
              sx={{
                position: `absolute`,
                bgcolor: `#ff0000`,
                clipPath: `polygon(100% 0, 100% 0, 0 100%, 0 100%, 0 0);;`,
                transition: `all .5s ease`,
                zIndex: 1,
                '&:hover': {
                  cursor: `pointer`,
                  clipPath: `polygon(100% 0, 100% 100%, 100% 100%, 0 100%, 0 0);`,
                  zIndex: 100,
                },
              }}
            >
              <Typography>hola</Typography>
            </Grid>

            <Skeleton
              width={1300}
              height={457}
              sx={{
                position: `absolute`,
                bgcolor: `#00ff00`,
                clipPath: `polygon(100% 0, 100% 100%, 0 100%, 0 100%, 100% 0);`,
                transition: `all .5s ease`,
                zIndex: 1,
                '&:hover': {
                  cursor: `pointer`,
                  clipPath: `polygon(100% 0, 100% 100%, 0 100%, 0 0, 0 0);`,
                },
              }}
              animation="wave"
              variant="rectangular"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RoomSection
