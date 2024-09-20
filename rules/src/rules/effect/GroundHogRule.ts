import { PlayerTurnRule } from '@gamepark/rules-api'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class GroundHogRule extends PlayerTurnRule {
  onRuleStart() {
    this.memorize(Memory.FreeTurn, true)
    return [this.startRule(RuleId.RefillHand)]
  }
}