/* eslint-disable quotes */
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/700.css'
declare module '@mui/material/styles' {
  interface TypographyVariants {
    footer: React.CSSProperties
    titleFooter: React.CSSProperties
    text: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    footer?: React.CSSProperties
    titleFooter?: React.CSSProperties
    text?: React.CSSProperties
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    footer: true
    titleFooter: true
    text: true
  }
}

export function pxToRem(value: number): string {
  return `${value / 16}rem`
}

function responsiveFontSizes({
  xs,
  sm,
  md,
  lg,
}: {
  xs: number
  sm: number
  md: number
  lg: number
}): Record<string, unknown> {
  return {
    '@media (max-width:1200px)': {
      fontSize: pxToRem(lg),
      lineHeight: 1.5,
    },
    '@media (max-width:900px)': {
      fontSize: pxToRem(md),
      lineHeight: 1.5,
    },
    '@media (max-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (max-width:400px)': {
      fontSize: pxToRem(xs),
    },
  }
}

const typography = (): Record<string, unknown> => ({
  fontFamily: [`Poppins`, `Arial`, `sans-serif`].join(`,`),
  h1: {
    fontSize: pxToRem(36),
    fontWeight: 700,
    ...responsiveFontSizes({
      xs: 26,
      sm: 26,
      md: 30,
      lg: 36,
    }),
  },
  h2: {
    fontSize: pxToRem(32),
    fontWeight: 700,
    ...responsiveFontSizes({
      xs: 28,
      sm: 28,
      md: 32,
      lg: 32,
    }),
  },
  h3: {
    fontSize: pxToRem(28),
    fontWeight: 700,
    ...responsiveFontSizes({
      xs: 22,
      sm: 24,
      md: 26,
      lg: 28,
    }),
  },
  h4: {
    fontSize: pxToRem(24),
    fontWeight: 600,
    ...responsiveFontSizes({
      xs: 20,
      sm: 20,
      md: 22,
      lg: 24,
    }),
  },
  h5: {
    fontSize: pxToRem(20),
    fontWeight: 500,
    ...responsiveFontSizes({
      xs: 18,
      sm: 18,
      md: 20,
      lg: 22,
    }),
  },
  h6: {
    fontSize: pxToRem(18),
    fontWeight: 500,
    ...responsiveFontSizes({
      xs: 16,
      sm: 16,
      md: 18,
      lg: 18,
    }),
  },
  subtitle1: {
    fontSize: pxToRem(14),
    fontWeight: 400,
    lineHeight: `normal`,
    ...responsiveFontSizes({
      xs: 12,
      sm: 12,
      md: 14,
      lg: 14,
    }),
  },
  subtitle2: {
    fontSize: pxToRem(14),
    fontWeight: 400,
    lineHeight: 1.2,
  },
  text: {
    fontSize: pxToRem(16),
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily: 'Poppins',
  },
  footer: {
    fontSize: pxToRem(16),
    fontWeight: 400,
    lineHeight: 1,
    fontFamily: 'Poppins',
  },
  titleFooter: {
    fontSize: pxToRem(24),
    fontWeight: 500,
    lineHeight: 1.2,
    fontFamily: 'Poppins',
  },
  button: {
    fontSize: pxToRem(14),
    fontWeight: 500,
    lineHeight: 'normal',
    fontFamily: 'Poppins',
  },
})

export default typography
