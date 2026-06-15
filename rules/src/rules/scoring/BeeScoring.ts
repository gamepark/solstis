import { MaterialItem } from '@gamepark/rules-api'
import { Spirit } from '../../material/Spirit'
import { SpiritColor, SpiritDescriptions } from '../../material/SpiritDescription'
import { AbstractScoringRule } from './AbstractScoringRule'

export class BeeScoring extends AbstractScoringRule {

  getScore(spirits: MaterialItem[]) {
    return spirits
      .filter((item) => SpiritDescriptions[item.id as Spirit].color === SpiritColor.Wood)
      .length
  }
}