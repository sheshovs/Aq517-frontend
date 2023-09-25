import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

export default function ThemeConfig({ children }: { children: JSX.Element }): JSX.Element {
  const themeOptions = {
    typography: {
      fontFamily: [`Roboto`, `"Helvetica Neue"`, `Arial`, `sans-serif`].join(`,`),
    },
  }

  const theme = createTheme(themeOptions)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}
