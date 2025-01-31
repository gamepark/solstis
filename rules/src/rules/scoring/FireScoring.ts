import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { landscapeFlames, panoramaLandscapes } from '../PanoramaLandscapes'
import { AbstractScoringRule } from './AbstractScoringRule'

export abstract class FireScoring extends AbstractScoringRule {
  getScore(_spirits: MaterialItem[], panoramaAreas: number[][]) {
    let score = 0
    const tiles = this.landscapes
    for (const flame of Object.keys(landscapeFlames)) {
      const coordinates = this.findCoordinates(+flame)!
      const flameArea = panoramaAreas[coordinates.y][coordinates.x]
      const tileOnLocation = tiles.getItems().find((item) => item.location.y === coordinates.y && item.location.x === coordinates.x)
      if (tileOnLocation && tileOnLocation[0].id === MountainLandscape.Rainbow) continue
      if (!tileOnLocation) continue
      if (flameArea !== 0 && panoramaAreas[0].includes(flameArea)) score += landscapeFlames[flame]
    }

    return Math.floor(score)
  }

  abstract isValidFire(flameArea: number, panoramaAreas: number[][]): boolean

  get landscapes() {
    return this.material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
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
