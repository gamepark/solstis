import { ItemLocator } from '@gamepark/react-game'
import { PanoramaDescription } from './description/PanoramaDescription'

export class PanoramaLocator extends ItemLocator {
  locationDescription = new PanoramaDescription()
  position = { x: 0, y: 0, z: 0 }

}

export const panoramaLocator = new PanoramaLocator()