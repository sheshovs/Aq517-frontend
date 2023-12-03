import { Container } from '@/common/components'
import { Grid, Skeleton, Typography, useTheme } from '@mui/material'
import React from 'react'

const AboutSection = (): JSX.Element => {
  const {
    palette: { primary },
  } = useTheme()
  return (
    <Container id="about" paddingTop={6.25} paddingBottom={12} paddingX={4}>
      <Grid container justifyContent="center" gap={3.75}>
        <Typography
          variant="h1"
          textAlign="center"
          sx={{
            '&:after': {
              content: `""`,
              display: `block`,
              margin: `auto`,
              width: `140px`,
              height: `5px`,
              backgroundColor: primary.main,
            },
          }}
        >
          Nosotros
        </Typography>
        <Grid
          container
          flexDirection={{ xs: `column`, sm: `row` }}
          justifyContent={{
            xs: `center`,
            sm: `space-between`,
          }}
        >
          <Grid item md={3.2} xs={12} alignItems="flex-start">
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{
                borderRadius: 1.25,
                width: `100%`,
                height: `100%`,
              }}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <Typography variant="text" marginBottom={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut congue odio. Donec
              tincidunt interdum lorem tempor maximus. Donec ac dolor in nibh dapibus pulvinar. In
              hac habitasse platea dictumst. Vivamus ac dolor vel libero aliquet dapibus. Cras
              volutpat nisl nec diam auctor, nec fermentum erat venenatis. Nam in fringilla neque.
            </Typography>
          </Grid>
          <Grid item md={3.2} xs={12} alignItems="flex-start">
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{
                borderRadius: 1.25,
                width: `100%`,
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
