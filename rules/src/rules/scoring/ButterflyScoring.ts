import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../PlayerId'

export class ButterflyScoring extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }
}