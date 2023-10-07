import { PaletteColor, PaletteColorOptions } from '@mui/material'

// eslint-disable-next-line quotes
declare module '@mui/material/styles' {
  interface Main {
    black: string
    white: string
    blackBackground: string
    whiteBackground: string
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
  dark: `#6c1319`,
  main: `#A81E27`,
  light: `#d92632`,
}
const main = {
  black: `#000000`,
  white: `#FFFFFF`,
  blackBackground: `#1C1C1C`,
  whiteBackground: `#E6E6E6`,
}

const palette = {
  primary,
  main,
}

export default palette
