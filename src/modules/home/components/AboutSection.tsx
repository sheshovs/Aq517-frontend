import { Container } from '@/common/components'
import { Grid, Skeleton, Typography, useTheme } from '@mui/material'
import React from 'react'

const AboutSection = (): JSX.Element => {
  const {
    palette: { primary },
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
              width: `170px`,
              height: `5px`,
              backgroundColor: primary.main,
            },
          }}
        >
          Nosotros
        </Typography>
        <Grid container spacing={6.125}>
          <Grid item md={3.5} alignItems="flex-start">
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{
                borderRadius: 1.25,
                height: `100%`,
              }}
            />
          </Grid>
          <Grid item md={5}>
            <Typography variant="text" marginBottom={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut congue odio. Donec
              tincidunt interdum lorem tempor maximus. Donec ac dolor in nibh dapibus pulvinar. In
              hac habitasse platea dictumst. Vivamus ac dolor vel libero aliquet dapibus. Cras
              volutpat nisl nec diam auctor, nec fermentum erat venenatis. Nam in fringilla neque.
            </Typography>
            <Typography variant="text">
              Praesent vitae massa in justo aliquet euismod vel et nisi. Vestibulum nec ex non
              tortor hendrerit accumsan. Curabitur placerat porta nulla, eu volutpat mi sagittis
              vitae. Curabitur arcu ligula, dictum vel efficitur nec, porttitor quis diam.
              Vestibulum egestas enim in ipsum lacinia, sit amet posuere nisi pulvinar. Maecenas
              maximus est eu eleifend semper. Ut bibendum mollis tincidunt. Maecenas mattis, urna
              tempus varius efficitur, mauris tortor iaculis sem, sit amet eleifend ex mauris
              aliquam elit. Curabitur in augue quis erat finibus posuere. Nunc tincidunt eu purus
              vitae iaculis.
            </Typography>
          </Grid>
          <Grid item md={3.5}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{
                borderRadius: 1.25,
                height: `100%`,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AboutSection
