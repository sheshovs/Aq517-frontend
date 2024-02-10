export enum RoomTypes {
  MUSIC = `MUSIC`,
  DANCE = `DANCE`,
}

export const RoomPrices = {
  MUSIC: 8000,
  DANCE: 8000,
}

export enum RoomNames {
  AQVILES = `aqviles`,
  JOYA = `joya`,
}

export interface RoomResponse {
  uuid: string
  name: RoomNames
  price: number
  type: RoomTypes
  isActive: boolean
  items: RoomItem[]
}

export interface RoomItem {
  uuid: string
  name: string
  price: number
  type: RoomTypes
  isActive: boolean
}
