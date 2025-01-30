import { MaterialType } from '../../material/MaterialType'
import { AbstractScoringRule } from './AbstractScoringRule'

export class PhoenixScoring extends AbstractScoringRule {

  getScore() {
    return this.material(MaterialType.Firefly).player(this.player).length
  }
}
