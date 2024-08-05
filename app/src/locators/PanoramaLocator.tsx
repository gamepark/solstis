/** @jsxImportSource @emotion/react */
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { Coordinates } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { panoramaLandscapes } from '@gamepark/solstis/rules/PanoramaLandscapes'
import { PanoramaDescription } from './description/PanoramaDescription'

export class PanoramaLocator extends Locator {
  locationDescription = new PanoramaDescription()


  getPosition(item: MaterialItem, context: ItemContext<number, number, number>): Coordinates {
    const position = this.locationDescription.getCoordinates(item.location, context)
    position.z = 0.1

    return position
  }

  getLocations(context: MaterialContext) {
    const { rules } = context
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
}

export const panoramaLocator = new PanoramaLocator()