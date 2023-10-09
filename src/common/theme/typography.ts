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

const typography = (): Record<string, unknown> => ({
  fontFamily: [`Roboto`, `"Helvetica Neue"`, `Arial`, `sans-serif`].join(`,`),
  h1: {
    fontSize: `36px`,
    fontWeight: 700,
  },
  h2: {
    fontSize: `32px`,
    fontWeight: 700,
  },
  subtitle1: {
    fontSize: `14px`,
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: `14px`,
    fontWeight: 400,
    lineHeight: 1.2,
  },
  text: {
    fontSize: `16px`,
    fontWeight: 400,
    lineHeight: 1.2,
  },
  footer: {
    fontSize: `16px`,
    fontWeight: 400,
    lineHeight: 1,
  },
  titleFooter: {
    fontSize: `24px`,
    fontWeight: 400,
    lineHeight: 1.2,
  },
})

export default typography
