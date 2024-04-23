import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class SelectHandTileRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.hand.moveItems({
      type: LocationType.PlayArea,
      player: this.player
    })
  }

  afterItemMove() {
    return [
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