import { MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../PlayerId'

export abstract class AbstractScoringRule extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }

  abstract getScore(spirits: MaterialItem[], panoramaAreas: number[][]): number;
}