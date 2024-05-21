import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { DrawableEffectRule } from './DrawableEffectRule'

export class DeerRule extends DrawableEffectRule {

  getPlayerMoves() {
    if (this.playAreaCard.length) {
      return new PlaceCardHelper(this.game).getPlayCardMove(this.playAreaCard)
    }
    return new PlaceCardHelper(this.game).getPlayCardMove(this.hand)
  }

  get hand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.player)
  }

}