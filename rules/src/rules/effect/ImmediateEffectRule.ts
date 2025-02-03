import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { FireflyHelper } from '../helper/FireflyHelper'
import { RuleId } from '../RuleId'

export class ImmediateEffectRule extends PlayerTurnRule {
  get endRuleMoves(): MaterialMove[] {
    const afterEncounterMoves = new FireflyHelper(this.game).afterSpiritEncountered()
    if (afterEncounterMoves.length) {
      return afterEncounterMoves
    } else {
      return [this.startRule(RuleId.RefillHand)]
    }
  }
}
