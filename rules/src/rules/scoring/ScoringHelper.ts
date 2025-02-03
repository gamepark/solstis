import { MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import sum from 'lodash/sum'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Spirit } from '../../material/Spirit'
import { PlayerId } from '../../PlayerId'
import { panoramaLandscapes } from '../PanoramaLandscapes'
import { AreaScoringHelper } from './AreaScoringHelper'
import { BeeScoring } from './BeeScoring'
import { BirdScoring } from './BirdScoring'
import { ButterflyScoring } from './ButterflyScoring'
import { CowScoring } from './CowScoring'
import { FireflyScoring } from './FireflyScoring'
import { LadybugScoring } from './LadybugScoring'
import { LizardScoring } from './LizardScoring'
import { PhoenixScoring } from './PhoenixScoring'
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
      }
    }
  }

  get score() {
    if (this.hasWinByFireflies) return 1
    if (this.opponentHasWinByFireflies) return 0
    return this.specificSpiritScore + this.maxAreaScore + this.lightedFlamesScore + this.spiritScore + this.firefliesScore
  }

  get hasWinByFireflies() {
    return this.material(MaterialType.Firefly)
      .player(this.player)
      .length >= 4
  }

  get opponentHasWinByFireflies() {
    return this.material(MaterialType.Firefly)
      .player((p) => p !== this.player)
      .length >= 4
  }

  get spiritScore() {
    return this.spirits.length
  }

  get specificSpiritScore(): number {
    const spirits = this.spirits
    return sum(spirits
      .map((spirit) => this.getSpiritScore(spirit.id))) ?? 0
  }

  hasSpirit(id: Spirit) {
    return this.spirits.find((s) => s.id === id) !== undefined
  }

  getPlayerSpiritScore(id: Spirit) {
    if (!this.hasSpirit(id)) return
    return this.getSpiritScore(id)
  }

  get lightedFlamesScore() {
    return new ButterflyScoring(this.game, this.player).getScore(this.spirits, this.areas) ?? 0
  }

  get firefliesScore() {
    return new FireflyScoring(this.game, this.player).getScore(this.spirits, this.areas) ?? 0
  }

  getSpiritScore(spirit: Spirit): number {
    switch (spirit) {
      case Spirit.Bee: return new BeeScoring(this.game, this.player).getScore(this.spirits)
      case Spirit.Ladybug: return new LadybugScoring(this.game, this.player).getScore(this.spirits, this.areas)
      case Spirit.Wolf: return new WolfScoring(this.game, this.player).getScore(this.spirits, this.areas)
      case Spirit.Bird: return new BirdScoring(this.game, this.player).getScore(this.spirits)
      case Spirit.Lizard: return new LizardScoring(this.game, this.player).getScore()
      case Spirit.Butterfly: return new ButterflyScoring(this.game, this.player).getScore(this.spirits, this.areas)
      case Spirit.Cow: return new CowScoring(this.game, this.player).getScore(this.spirits, this.areas)
      case Spirit.Phoenix: return new PhoenixScoring(this.game, this.player).getScore()
    }

    return 0
  }

  get maxAreaScore(): number {
    const helper = new AreaScoringHelper(this.game, this.player, this.areas)
    const maxArea = helper.maxArea
    if (maxArea === undefined) return 0
    return helper.getScoreWithoutRainbows(maxArea)
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
