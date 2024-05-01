import { isStartRule, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { GetCardHelper } from '../helper/GetCardHelper'
import { RuleId } from '../RuleId'

export class BearRule extends PlayerTurnRule {

  onRuleStart() {
    const deck = this.deck
    if (!deck.length) return [this.rules().startRule(RuleId.Capture)]

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

  getPlayerMoves() {
    return new GetCardHelper(this.game).getPlayCardMove(this.hand)
  }

  afterItemMove(move: ItemMove) {
    const afterCardMove = new GetCardHelper(this.game).afterItemMove(move)
    if (afterCardMove.some(isStartRule)) return afterCardMove
    return [
      ...afterCardMove,
      this.rules().startRule(RuleId.Capture)
    ]
  }

  get hand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.player)
  }

}