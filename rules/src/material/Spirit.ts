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
  EvilBeaver,

  // Firefly ext
  Cow = 50,
  Phoenix,
  Viper,
  Fox
}

export const spirits = getEnumValues(Spirit)
export const isFireflyExt = (spirit: Spirit) => spirit >= Spirit.Cow
