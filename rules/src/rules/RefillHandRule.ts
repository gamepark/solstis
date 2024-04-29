import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class RefillHandRule extends PlayerTurnRule {

  onRuleStart() {
    const hand = this.hand
    return [
      ...this.deck.limit(3 - hand.length).moveItems({
        type: LocationType.Hand,
        player: this.player
      }),
      this.rules().startPlayerTurn(RuleId.SelectHandTile, this.nextPlayer)
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