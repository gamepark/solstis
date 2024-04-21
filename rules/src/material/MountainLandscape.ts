import { isEnumValue } from '@gamepark/rules-api'

export enum MountainLandscape {
  Line_1_1 = 1,
  Line_1_2,
  Line_1_3,
  Line_1_4,
  Line_1_5,
  Line_1_6,
  Line_1_7,
  Line_1_8,
  Line_1_9,
  Line_1_10,
  Line_2_1 = 11,
  Line_2_2,
  Line_2_3,
  Line_2_4,
  Line_2_5,
  Line_2_6,
  Line_2_7,
  Line_2_8,
  Line_2_9,
  Line_2_10,
  Line_3_1 = 21,
  Line_3_2,
  Line_3_3,
  Line_3_4,
  Line_3_5,
  Line_3_6,
  Line_3_7,
  Line_3_8,
  Line_3_9,
  Line_3_10,
  Line_4_2 = 32,
  Line_4_3,
  Line_4_4,
  Line_4_5,
  Line_4_6,
  Line_4_7,
  Line_4_8,
  Line_4_9,
  Line_5_3 = 43,
  Line_5_4,
  Line_5_5,
  Line_5_6,
  Line_5_7,
  Line_5_8,
  Line_6_4 = 54,
  Line_6_5,
  Line_6_6,
  Line_6_7,

  Rainbow = 100
}

export const mountainLandscapes = Object.values(MountainLandscape).filter(isEnumValue)

export const getLine = (landscape: MountainLandscape) => Math.floor(landscape / 10)

export const getValue = (landscape: MountainLandscape) => landscape % 10