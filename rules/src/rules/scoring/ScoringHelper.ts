import { MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import sum from 'lodash/sum'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { Spirit } from '../../material/Spirit'
import { PlayerId } from '../../PlayerId'
import { panoramaLandscapes } from '../PanoramaLandscapes'
import { BeeScoring } from './BeeScoring'
import { BirdScoring } from './BirdScoring'
import { ButterflyScoring } from './ButterflyScoring'
import { LadybugScoring } from './LadybugScoring'
import { LizardScoring } from './LizardScoring'
import { WolfScoring } from './WolfScoring'

export class ScoringHelper extends MaterialRulesPart {
  private readonly spirits: MaterialItem[] = []

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
    this.initialize()
    const allSpirits = this
      .material(MaterialType.SpiritTile)
      .location(LocationType.SpiritInMountain)
      .player(this.player)
    this.spirits = allSpirits
      .filter((item) => allSpirits.location((l) => equal(l, item.location)).length === 1)
      .getItems()
  }

  areas: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  initialize() {
    let areaCount = 1
    const panorama = this.panorama
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < panoramaLandscapes.length; x++) {
        const item = panorama.location((l) => l.x === x && l.y === y)
        if (!item.length) continue

        const bottomArea = this.areas[y - 1]?.[x]
        if (bottomArea && !this.areas[y][x]) this.areas[y][x] = bottomArea

        const leftArea = this.areas[y]?.[x - 1]
        if (leftArea) this.areas[y][x] = leftArea

        if (bottomArea && leftArea) this.replaceArea(leftArea, bottomArea)
        if (!bottomArea && !leftArea) this.areas[y][x] = ++areaCount
        //console.log(JSON.stringify(this.areas, undefined, 2))
      }
    }
  }

  get score() {
    return this.spiritsScore + this.maxAreaScore + this.lightedFlamesScore
  }

  get spiritsScore(): number {
    const spirits = this.spirits
    return sum(spirits
      .map((spirit) => this.getSpiritScore(spirit.id))) ?? 0
  }

  get lightedFlamesScore() {
    return new ButterflyScoring(this.game, this.player).getScore(this.spirits, this.areas) ?? 0
  }

  get maxAreaScore(): number {
    const areaNumbers = this.areas.flat()
    const areaLength = mapValues(groupBy(areaNumbers, (areaNumber) => areaNumber), (v) => v.length)
    let maxArea: string | undefined = undefined
    for (const key of Object.keys(areaLength)) {
      if (+key === 0) continue
      if (!maxArea || areaLength[key] > areaLength[maxArea]) maxArea = key
    }

    return this.removeRainbows(areaLength, maxArea!)
  }

  removeRainbows(areaLength: Record<string, number>, areaNumber: string) {
    const area = this.areas
    let count = areaLength[areaNumber] ?? 0
    if (!count) return count
    const panorama = this.panorama
    for (let y = 0; y < area.length; y++) {
      const line = area[y]
      for (let x = 0; x < line.length; x++) {
        //console.log(area[y][x], +areaNumber)
        if (area[y][x] !== +areaNumber) continue
        const item = panorama.location((l) => l.x === x && l.y === y).getItem()!
        if (item.id === MountainLandscape.Rainbow) count--
      }
    }

    return count
  }

  getSpiritScore(spirit: Spirit): number {
    switch (spirit) {
      case Spirit.Bee: return new BeeScoring(this.game, this.player).getScore(this.spirits)
      case Spirit.Ladybug: return new LadybugScoring(this.game, this.player).getScore(this.spirits, this.areas)
      case Spirit.Wolf: return new WolfScoring(this.game, this.player).getScore(this.spirits, this.areas)
      //case Spirit.Squirrel: return new SquirrelScoring(this.game, this.player)
      case Spirit.Bird: return new BirdScoring(this.game, this.player).getScore(this.spirits)
      case Spirit.Lizard: return new LizardScoring(this.game, this.player).getScore()
      case Spirit.Butterfly: return new ButterflyScoring(this.game, this.player).getScore(this.spirits, this.areas)
    }

    return 0
  }

  replaceArea(a: number, b: number) {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < panoramaLandscapes.length; x++) {
        if (this.areas[y]?.[x] === a) {
          this.areas[y][x] = b
        }
      }
    }
  }

  get panorama() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
  }


}