import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import palette from './palette'
import typography from './typography'

export default function ThemeConfig({ children }: { children: JSX.Element }): JSX.Element {
  const themeOptions = {
    typography,
    palette,
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            titleFooter: `p`,
            text: `p`,
          },
        },
      },
    },
  }

  const theme = createTheme(themeOptions)

  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}
