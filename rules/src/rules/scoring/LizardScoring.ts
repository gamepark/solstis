import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { AbstractScoringRule } from './AbstractScoringRule'

export class LizardScoring extends AbstractScoringRule {

  getScore() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
      .id((id) => id === MountainLandscape.Rainbow)
      .length
  }
}