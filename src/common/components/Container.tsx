import { Grid, GridProps } from '@mui/material'
import React from 'react'
import { LAYOUT_MAX_WIDTH } from '../settings/constants'

const Container = (props: GridProps): JSX.Element => {
  const { children } = props

  return (
    <Grid container maxWidth={LAYOUT_MAX_WIDTH} {...props}>
      {children}
    </Grid>
  )
}

export default Container
