import { MaterialItem } from '@gamepark/rules-api'
import { SpiritColor, SpiritDescriptions } from '../../material/SpiritDescription'
import { AbstractScoringRule } from './AbstractScoringRule'

export class BirdScoring extends AbstractScoringRule {

  getScore(spirits: MaterialItem[]) {
    return spirits.filter((item) => SpiritDescriptions[item.id].color === SpiritColor.Blue).length
  }
}