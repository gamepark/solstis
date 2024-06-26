/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'


export class LandscapeQueueLocator extends LineLocator {
  deltaX = landscapeTileDescription.width + 0.2
  deltaY = 0.25 * landscapeTileDescription.height
  getCoordinates(item: MaterialItem, _context: ItemContext): Coordinates {
    const baseCoordinates = { x: -21, y: -22, z: 0}

    return {
      x: baseCoordinates.x + ((item.location.x ?? 0) * this.deltaX),
      y: baseCoordinates.y + ((item.location.z ?? 0) * this.deltaY),
      z: baseCoordinates.z + ((item.location.z ?? 0) * 0.05)
    }
  }

}
export const landscapeQueueLocator = new LandscapeQueueLocator()