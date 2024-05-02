import { isStartRule, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { RuleId } from '../RuleId'

export class DeerRule extends PlayerTurnRule {

  getPlayerMoves() {
    return new PlaceCardHelper(this.game).getPlayCardMove(this.hand)
  }

  afterItemMove(move: ItemMove) {
    const afterCardMove = new PlaceCardHelper(this.game).afterItemMove(move)
    if (afterCardMove.some(isStartRule)) return afterCardMove
    return [
      ...afterCardMove,
      this.rules().startRule(RuleId.RefillHand)
    ]
  }

  get hand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.player)
  }

}