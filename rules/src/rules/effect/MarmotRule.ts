import { PlayerTurnRule } from '@gamepark/rules-api'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class MarmotRule extends PlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.FreeTurn, true)
    return [this.rules().startRule(RuleId.RefillHand)]
  }
}