export enum RoomTypes {
  MUSIC = `MUSIC`,
  DANCE = `DANCE`,
}

export const RoomPrices = {
  MUSIC: 8000,
  DANCE: 8000,
}

export enum RoomNames {
  AQVILES = `Aqviles`,
  JOYA = `Joya`,
}

export interface RoomResponse {
  uuid: string
  name: RoomNames
  price: number
  isActive: boolean
  items: RoomItem[]
}

export interface RoomItem {
  uuid: string
  name: string
  price: number
  isActive: boolean
}
