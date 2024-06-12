import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { QueueHelper } from '../helper/QueueHelper'
import { RuleId } from '../RuleId'

export class DrawableEffectRule extends PlayerTurnRule {

  afterItemMove(move: ItemMove) {
    const moves = new PlaceCardHelper(this.game).afterItemMove(move)
    if (this.mustPlayACardFromPlayArea(moves)) return moves

    return [
      ...moves,
      this.rules().startRule(RuleId.RefillHand)
    ]
  }

  beforeItemMove(move: ItemMove) {
    return new QueueHelper(this.game).beforeItemMove(move)
  }

  mustPlayACardFromPlayArea(moves: MaterialMove[]) {
    const willHaveRainbow = moves.some((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.PlayArea)
    return willHaveRainbow || this.playAreaCard.length > 0
  }

  get playAreaCard() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.PlayArea)
      .player(this.player)
  }
}