import { getEnumValues } from '@gamepark/rules-api'

export enum MountainLandscape {
  Landscape_1_1 = 101,
  Landscape_1_2,
  Landscape_1_3,
  Landscape_1_4,
  Landscape_1_5,
  Landscape_1_6,
  Landscape_1_7,
  Landscape_1_8,
  Landscape_1_9,
  Landscape_1_10,
  Landscape_2_1 = 201,
  Landscape_2_2,
  Landscape_2_3,
  Landscape_2_4,
  Landscape_2_5,
  Landscape_2_6,
  Landscape_2_7,
  Landscape_2_8,
  Landscape_2_9,
  Landscape_2_10,
  Landscape_3_1 = 301,
  Landscape_3_2,
  Landscape_3_3,
  Landscape_3_4,
  Landscape_3_5,
  Landscape_3_6,
  Landscape_3_7,
  Landscape_3_8,
  Landscape_3_9,
  Landscape_3_10,
  Landscape_4_2 = 402,
  Landscape_4_3,
  Landscape_4_4,
  Landscape_4_5,
  Landscape_4_6,
  Landscape_4_7,
  Landscape_4_8,
  Landscape_4_9,
  Landscape_5_3 = 503,
  Landscape_5_4,
  Landscape_5_5,
  Landscape_5_6,
  Landscape_5_7,
  Landscape_5_8,
  Landscape_6_4 = 604,
  Landscape_6_5,
  Landscape_6_6,
  Landscape_6_7,

  Rainbow = 1000
}

export const mountainLandscapes = getEnumValues(MountainLandscape)

export const getLine = (landscape: MountainLandscape) => Math.floor(landscape / 100) - 1

export const getValue = (landscape: MountainLandscape) => landscape % 100