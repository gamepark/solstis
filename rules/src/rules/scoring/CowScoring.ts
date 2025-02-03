import { MaterialItem } from '@gamepark/rules-api'
import { AbstractScoringRule } from './AbstractScoringRule'
import { AreaScoringHelper } from './AreaScoringHelper'

export class CowScoring extends AbstractScoringRule {

  getScore(_spirits: MaterialItem[], panoramaAreas: number[][]) {
    const helper = new AreaScoringHelper(this.game, this.player, panoramaAreas)
    const secondMaxArea = helper.secondMaxArea
    if (secondMaxArea === undefined) return 0
    return helper.getScoreWithoutRainbows(secondMaxArea)
  }
}
