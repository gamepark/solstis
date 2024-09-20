import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'

class LandscapeQueueLocator extends Locator {
  deltaX = landscapeTileDescription.width + 0.2
  deltaY = 0.25 * landscapeTileDescription.height

  getCoordinates({ x = 0, z = 0 }: Location) {
    return { x: x * this.deltaX - 21, y: z * this.deltaY - 22, z: z * 0.1 }
  }
}

export const landscapeQueueLocator = new LandscapeQueueLocator()