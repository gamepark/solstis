import { MaterialItem } from '@gamepark/rules-api'
import { Spirit } from '../../material/Spirit'
import { SpiritColor, SpiritDescriptions } from '../../material/SpiritDescription'
import { AbstractScoringRule } from './AbstractScoringRule'

export class BirdScoring extends AbstractScoringRule {

  getScore(spirits: MaterialItem[]) {
    return spirits
      .filter((item) => SpiritDescriptions[item.id].color === SpiritColor.Blue && item.id !== Spirit.Bird)
      .length
  }
}