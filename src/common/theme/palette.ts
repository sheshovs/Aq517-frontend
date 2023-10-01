import { PaletteColor, PaletteColorOptions } from '@mui/material'

// eslint-disable-next-line quotes
declare module '@mui/material/styles' {
  interface Main {
    black: string
    white: string
  }
  interface Palette {
    primary: PaletteColor
    main: Main
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions
    main: Main
  }
}
//cambiar los colores de acuerdo a la pagina
const primary = {
  dark: `#138e89`,
  main: `#1cb0a7`,
  light: `#35ccc0`,
}
const main = {
  black: `#000000`,
  white: `#FFFFFF`,
}

const palette = {
  primary,
  main,
}

export default palette
