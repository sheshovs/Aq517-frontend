import { PaletteColor, PaletteColorOptions } from '@mui/material'

// eslint-disable-next-line quotes
declare module '@mui/material/styles' {
  interface Main {
    white: string
    whiteBackground: string
  }
  interface Black {
    dark: string
    main: string
    light: string
    mainFooter: string
    darkFooter: string
    lightFooter: string
  }
  interface Palette {
    primary: PaletteColor
    main: Main
    black: Black
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions
    main: Main
    black: Black
  }
}
//cambiar los colores de acuerdo a la pagina
const primary = {
  dark: `#6c1319`,
  main: `#A81E27`,
  light: `#d92632`,
}

const black = {
  dark: `#000000`,
  main: `#1C1C1C`,
  light: `#333333`,
  mainFooter: `#222222`,
  darkFooter: `#131313`,
  lightFooter: `#9F9F9F`,
}

const main = {
  white: `#FFFFFF`,
  whiteBackground: `#E6E6E6`,
}

const palette = {
  primary,
  main,
  black,
}

export default palette
