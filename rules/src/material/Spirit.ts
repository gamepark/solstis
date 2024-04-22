import { isEnumValue } from '@gamepark/rules-api'
export enum Spirit {
  Fish = 1,
  Deer,
  Eagle,
  Bear,
  Moskito,
  Beetle,
  Beaver,
  Bee,
  Ladybug,
  Wolf,
  Rabbit,
  Bird,
  Lizard,
  Butterfly,
  Evil
}

export const spirits = Object.values(Spirit).filter(isEnumValue)