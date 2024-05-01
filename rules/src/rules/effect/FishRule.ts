import { PlaceRainbowRule } from '../PlaceRainbowRule'
import { RuleId } from '../RuleId'

export class FishRule extends PlaceRainbowRule {
  onRuleStart() {
    const card = this.rainbowCard
    if (!card.length) return [this.rules().startRule(RuleId.RefillHand)]
    return []
  }

  afterRainbowPlaced() {
    return [this.rules().startRule(RuleId.RefillHand)]
  }
}