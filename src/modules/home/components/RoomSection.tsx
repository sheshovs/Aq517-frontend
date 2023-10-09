import { Container } from '@/common/components'
import { Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

const RoomSection = (): JSX.Element => {
  const {
    palette: { primary, main },
  } = useTheme()
  return (
    <Container paddingY={6.25} paddingX={4}>
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
              height={457}
              sx={{
                position: `absolute`,
                borderRadius: 2,
                bgcolor: `#fff`,
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
              <Grid
                container
                padding={2.5}
                sx={{
                  borderRadius: 2,
                  background: `linear-gradient(160deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.05) 45%);`,
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
                  <Typography variant="h1" textTransform="uppercase">
                    Sala de música
                  </Typography>
                  <Typography variant="subtitle2">
                    Velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl
                    suscipit adipiscing bibendum est ultricies
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              height={457}
              sx={{
                position: `absolute`,
                borderRadius: 2,
                bgcolor: `#fff`,
                clipPath: `polygon(100% 0, 100% 100%, 0 100%, 0 100%, 100% 0);`,
                transition: `all .5s ease`,
                zIndex: 1,
                '&:hover': {
                  cursor: `pointer`,
                  clipPath: `polygon(100% 0, 100% 100%, 0 100%, 0 0, 0 0);`,
                },
              }}
            >
              <Grid
                container
                alignItems="flex-end"
                justifyContent="flex-end"
                padding={2.5}
                sx={{
                  borderRadius: 2,
                  background: `linear-gradient(340deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.05) 45%);`,
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
                  <Typography variant="h1" textTransform="uppercase">
                    Sala de danza
                  </Typography>
                  <Typography variant="subtitle2">
                    Velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl
                    suscipit adipiscing bibendum est ultricies
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RoomSection
