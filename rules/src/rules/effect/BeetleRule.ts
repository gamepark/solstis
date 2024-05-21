import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { DrawableEffectRule } from './DrawableEffectRule'

export class BeetleRule extends DrawableEffectRule {

  getPlayerMoves() {
    return new PlaceCardHelper(this.game).getPlayCardMove(this.queue)
  }

  get queue() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeQueue)
      .filter((item) => !item.location.rotation)
  }
}