import { Memory } from '../Memory'
import { PlaceRainbowRule } from '../PlaceRainbowRule'
import { RuleId } from '../RuleId'

export class FishRule extends PlaceRainbowRule {
  onRuleStart() {
    const card = this.rainbowCard
    if (!card.length) return [this.startRule(RuleId.RefillHand)]
    return []
  }

  afterRainbowPlaced() {
    this.forget(Memory.MustEncounterSpiritOn)
    return [this.startRule(RuleId.RefillHand)]
  }
}