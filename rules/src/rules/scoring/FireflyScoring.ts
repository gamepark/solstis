import { MaterialItem } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { AbstractScoringRule } from './AbstractScoringRule'

export class FireflyScoring extends AbstractScoringRule {

  getScore(_spirits: MaterialItem[], panoramaAreas: number[][]) {
    if (!this.remind(Memory.FireflyExt)) return 0
    let score = 0
    const fireflies = this.fireflies
    for (const firefly of fireflies) {
      const coordinates = { x: firefly.location.x!, y: firefly.location.y! }
      const fireflyArea = panoramaAreas[coordinates.y][coordinates.x]
      if (fireflyArea !== 0 && panoramaAreas[0].includes(fireflyArea)) score += 1
    }

    return Math.floor(score)
  }

  get fireflies() {
    return this
      .material(MaterialType.Firefly)
      .player(this.player)
      .getItems()
  }
}
