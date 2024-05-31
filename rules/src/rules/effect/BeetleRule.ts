import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { RuleId } from '../RuleId'
import { DrawableEffectRule } from './DrawableEffectRule'

export class BeetleRule extends DrawableEffectRule {
  onRuleStart() {
    if (!this.queue.length) return [this.rules().startRule(RuleId.RefillHand)]
    return []
  }

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