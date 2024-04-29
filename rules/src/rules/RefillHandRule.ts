import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
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
      ...this.hiddenQueueCardToReveal,
      this.rules().startPlayerTurn(RuleId.SelectHandTile, this.nextPlayer)
    ]
  }

  get hiddenQueueCardToReveal() {
    const queue = this.material(MaterialType.LandscapeTile).location(LocationType.LandscapeQueue)
    const cardToReveal = queue.location((l) => l.rotation && !queue.location((location) => location.x === l.x && location.y === (l.y! + 1)).length)
    const moves: MaterialMove[] = []
    if (cardToReveal.length) {
      moves.push(
        cardToReveal.rotateItem(false)
      )
    }

    return moves
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