import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ImmediateEffectRule } from './ImmediateEffectRule'

export class BearRule extends ImmediateEffectRule {

  onRuleStart() {
    const deck = this.deck
    if (!deck.length) return this.endRuleMoves

    return [
      deck.moveItem({
        type: LocationType.Hand,
        player: this.player
      }),
      ...this.endRuleMoves
    ]
  }

  get deck() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
  }

  get hand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.player)
  }

}
