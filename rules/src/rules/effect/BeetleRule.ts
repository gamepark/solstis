import { ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { GetCardHelper } from '../helper/GetCardHelper'
import { PlaceRainbowRule } from '../PlaceRainbowRule'
import { RuleId } from '../RuleId'

export class BeetleRule extends PlaceRainbowRule {

  getPlayerMoves() {
    return new GetCardHelper(this.game).getPlayCardMove(this.queue)
  }

  afterItemMove(move: ItemMove) {
    return [
      ...new GetCardHelper(this.game).afterItemMove(move),
      this.rules().startRule(RuleId.Capture)
    ]
  }

  get queue() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeQueue)
      .filter((item) => !item.location.rotation)
  }

}