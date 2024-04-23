/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { Coordinates } from '@gamepark/rules-api/dist/material/location/Location'
import { PanoramaDescription } from './description/PanoramaDescription'

export class PanoramaLocator extends ItemLocator {
  locationDescription = new PanoramaDescription()


  getPosition(item: MaterialItem, context: ItemContext<number, number, number>): Coordinates {
    const position = this.locationDescription.getCoordinates(item.location, context)
    position.z = 0.1

    return position
  }

}

export const panoramaLocator = new PanoramaLocator()