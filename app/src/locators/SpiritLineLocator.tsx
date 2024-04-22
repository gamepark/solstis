/** @jsxImportSource @emotion/react */
import { GridLocator } from '@gamepark/react-game'
import { spiritTileDescription } from '../material/SpiritTileDescription'


export class SpiritLineLocator extends GridLocator {
  itemsPerLine = 3
  itemsGap = { x: spiritTileDescription.width + 0.2 }
  linesGap = { y: spiritTileDescription.height + 0.2 }
  coordinates = { x: 3.6, y: 1.7, z: 0}
}

export const spiritLineLocator = new SpiritLineLocator()