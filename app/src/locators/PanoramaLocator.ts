import { LocationContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { panoramaLandscapes } from '@gamepark/solstis/rules/PanoramaLandscapes'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'
import { PanoramaDescription } from './description/PanoramaDescription'

class PanoramaLocator extends Locator {
  locationDescription = new PanoramaDescription(landscapeTileDescription)

  getLocations({ rules }: MaterialContext) {
    const locations: Location[] = []
    for (const player of rules.players) {
      for (let columnIndex = 0; columnIndex < panoramaLandscapes.length; columnIndex++) {
        const column = panoramaLandscapes[columnIndex]
        for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
          if (column[rowIndex] !== undefined) {
            locations.push({
              type: LocationType.Panorama,
              player: player,
              x: columnIndex,
              y: rowIndex
            })
          }
        }
      }
    }
    return locations
  }

  getCoordinates(location: Location, { rules, player = rules.players[0] }: LocationContext) {
    const panoramaX = location.player === player ? -32 : 12
    return {
      x: panoramaX + location.x! * (landscapeTileDescription.width + 0.1),
      y: 12 - location.y! * (landscapeTileDescription.height + 0.1)
    }
  }
}

export const panoramaLocator = new PanoramaLocator()