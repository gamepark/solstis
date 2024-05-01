import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MountainLandscape } from '../material/MountainLandscape'
import { PlaceRainbowRule } from './PlaceRainbowRule'
import { RuleId } from './RuleId'

export class MoveRainbow extends PlaceRainbowRule {

  get rainbowCard() {
    return this.material(MaterialType.LandscapeTile)
      .location(LocationType.PlayArea)
      .player(this.player)
      .id(MountainLandscape.Rainbow)
  }

  afterRainbowPlaced() {
    return [this.rules().startRule(RuleId.Capture)]
  }

}