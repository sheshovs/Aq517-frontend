/* eslint-disable quotes */
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

const typography = (): Record<string, unknown> => ({
  fontFamily: [`Roboto`, `"Helvetica Neue"`, `Arial`, `sans-serif`].join(`,`),
  h1: {
    fontSize: pxToRem(36),
    fontWeight: 700,
  },
  h2: {
    fontSize: pxToRem(32),
    fontWeight: 700,
  },
  h3: {
    fontSize: pxToRem(28),
    fontWeight: 700,
  },
  h4: {
    fontSize: pxToRem(24),
    fontWeight: 700,
  },
  h5: {
    fontSize: pxToRem(20),
    fontWeight: 700,
  },
  h6: {
    fontSize: pxToRem(18),
    fontWeight: 700,
  },
  subtitle1: {
    fontSize: pxToRem(14),
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: pxToRem(14),
    fontWeight: 400,
    lineHeight: 1.2,
  },
  text: {
    fontSize: pxToRem(16),
    fontWeight: 400,
    lineHeight: 1.2,
  },
  footer: {
    fontSize: pxToRem(16),
    fontWeight: 400,
    lineHeight: 1,
  },
  titleFooter: {
    fontSize: pxToRem(24),
    fontWeight: 400,
    lineHeight: 1.2,
  },
  button: {
    fontSize: pxToRem(14),
    fontWeight: 500,
    lineHeight: 'normal',
  },
})

export default typography
