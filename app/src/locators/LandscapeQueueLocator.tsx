/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { Coordinates } from '@gamepark/rules-api/dist/material/location/Location'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'


export class LandscapeQueueLocator extends LineLocator {
  deltaX = landscapeTileDescription.width + 0.2
  deltaY = 0.25 * landscapeTileDescription.height
  getCoordinates(item: MaterialItem, _context: ItemContext): Coordinates {
    const baseCoordinates = { x: -20.5, y: -20.5, z: 0}

    return {
      x: baseCoordinates.x + (item.location.x! * this.deltaX),
      y: baseCoordinates.y + (item.location.y! * this.deltaY),
      z: baseCoordinates.z + (item.location.y! * 0.05)
    }
  }

}
export const landscapeQueueLocator = new LandscapeQueueLocator()