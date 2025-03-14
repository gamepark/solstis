import { PlayerTurnRule } from '@gamepark/rules-api'
import { FireflyHelper } from '../helper/FireflyHelper'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class GroundHogRule extends PlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.FreeTurn, true)
    const afterEncounterMoves = new FireflyHelper(this.game).afterSpiritEncountered()
    if (afterEncounterMoves.length) return afterEncounterMoves
    return [this.startRule(RuleId.RefillHand)]
  }
}
