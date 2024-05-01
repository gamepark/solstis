import { MaterialItem } from '@gamepark/rules-api'
import { MountainLandscape } from '../../material/MountainLandscape'
import { landscapeFlames, panoramaLandscapes } from '../PanoramaLandscapes'
import { AbstractScoringRule } from './AbstractScoringRule'

export class LadybugScoring extends AbstractScoringRule {

  getScore(_spirits: MaterialItem[], panoramaAreas: number[][]) {
    let score = 0
    for (const flame of Object.keys(landscapeFlames)) {
      const coordinates = this.findCoordinates(+flame)!
      const flameArea = panoramaAreas[coordinates.y][coordinates.x]
      if (flameArea === 0 || !panoramaAreas[0].includes(flameArea)) score += landscapeFlames[flame]
    }

    return Math.ceil(score)
  }

  findCoordinates(landscape: MountainLandscape) {
    for (let x = 0; x < panoramaLandscapes.length; x++) {
      const column = panoramaLandscapes[x]
      for (let y = 0; y < column.length; y++) {
        if (column[y] === landscape) return { x, y }
      }
    }

    return undefined
  }
}