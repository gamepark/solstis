import { isStartRule, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { RuleId } from '../RuleId'

export class BeetleRule extends PlayerTurnRule {

  getPlayerMoves() {
    return new PlaceCardHelper(this.game).getPlayCardMove(this.queue)
  }

  afterItemMove(move: ItemMove) {
    const afterCardMove = new PlaceCardHelper(this.game).afterItemMove(move)
    if (afterCardMove.some(isStartRule)) return afterCardMove
    return [
      ...afterCardMove,
      this.rules().startRule(RuleId.RefillHand)
    ]
  }

  get queue() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeQueue)
      .filter((item) => !item.location.rotation)
  }

}