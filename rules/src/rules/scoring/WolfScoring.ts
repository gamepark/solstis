import { MaterialItem } from '@gamepark/rules-api'
import uniq from 'lodash/uniq'
import { AbstractScoringRule } from './AbstractScoringRule'

export class WolfScoring extends AbstractScoringRule {

  getScore(_spirits: MaterialItem[], panoramaAreas: number[][]) {
    return uniq(panoramaAreas.flat().filter((number) => !!number))?.length ?? 0
  }
}