import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class BearRule extends PlayerTurnRule {

  onRuleStart() {
    const deck = this.deck
    if (!deck.length) return [this.rules().startRule(RuleId.RefillHand)]

    return [
      deck.moveItem({
        type: LocationType.Hand,
        player: this.player
      }),
      this.rules().startRule(RuleId.RefillHand)
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