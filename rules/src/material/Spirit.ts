import { getEnumValues } from '@gamepark/rules-api'
export enum Spirit {
  Fish = 1,
  Deer,
  Eagle,
  Bear,
  Dragonfly,
  Beetle,
  Groundhog,
  Bee,
  Ladybug,
  Wolf,
  Squirrel,
  Bird,
  Lizard,
  Butterfly,
  EvilBeaver
}

export const spirits = getEnumValues(Spirit)