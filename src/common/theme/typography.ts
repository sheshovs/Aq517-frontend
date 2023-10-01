const typography = (): Record<string, unknown> => ({
  fontFamily: [`Roboto`, `"Helvetica Neue"`, `Arial`, `sans-serif`].join(`,`),
  h1: {
    fontSize: `36px`,
    fontWeight: 700,
  },
  subtitle1: {
    fontSize: `14px`,
    fontWeight: 400,
  },
})

export default typography
