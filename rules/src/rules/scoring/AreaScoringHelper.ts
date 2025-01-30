import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import groupBy from 'lodash/groupBy'
import omit from 'lodash/omit'
import mapValues from 'lodash/mapValues'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { PlayerId } from '../../PlayerId'

export class AreaScoringHelper extends MaterialRulesPart {


  constructor(game: MaterialGame, readonly player: PlayerId, readonly areas: number[][]) {
    super(game)
  }

  get maxArea(): string | undefined {
    const areaLength = this.areaLength
    let maxArea: string | undefined = undefined
    for (const key of Object.keys(areaLength)) {
      if (+key === 0) continue
      if (!maxArea || areaLength[key] > areaLength[maxArea]) maxArea = key
    }

    return maxArea
  }

  get secondMaxArea(): string | undefined {
    const actualMaxArea = this.maxArea
    if (actualMaxArea === undefined) return undefined
    const areaLength = omit(this.areaLength, [actualMaxArea])

    let maxArea: string | undefined = undefined
    for (const key of Object.keys(areaLength)) {
      if (+key === 0) continue
      if (!maxArea || areaLength[key] > areaLength[maxArea]) maxArea = key
    }

    return maxArea
  }

  get areaNumbers() {
    return this.areas.flat()
  }

  get areaLength() {
    return  mapValues(groupBy(this.areaNumbers, (areaNumber) => areaNumber), (v) => v.length)
  }

  getScoreWithoutRainbows(areaNumber: string) {
    return this.removeRainbows(areaNumber)
  }

  removeRainbows(areaNumber: string) {
    const area = this.areas
    let count = this.areaLength[areaNumber] ?? 0
    if (!count) return count
    const panorama = this.panorama
    for (let y = 0; y < area.length; y++) {
      const line = area[y]
      for (let x = 0; x < line.length; x++) {
        if (area[y][x] !== +areaNumber) continue
        const item = panorama.location((l) => l.x === x && l.y === y).getItem()!
        if (item.id === MountainLandscape.Rainbow) count--
      }
    }

    return count
  }

  get panorama() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
  }

}
