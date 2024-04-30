import { Memory } from '../Memory'
import { PlaceRainbowRule } from '../PlaceRainbowRule'
import { RuleId } from '../RuleId'

export class BeaverRule extends PlaceRainbowRule {
  onRuleStart() {
    this.memorize(Memory.FreeTurn, true)
    return [this.rules().startRule(RuleId.Capture)]
  }
}