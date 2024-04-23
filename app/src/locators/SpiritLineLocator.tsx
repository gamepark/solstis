/** @jsxImportSource @emotion/react */
import { GridLocator } from '@gamepark/react-game'
import { spiritTileDescription } from '../material/SpiritTileDescription'


export class SpiritLineLocator extends GridLocator {
  itemsPerLine = 5
  itemsGap = { x: spiritTileDescription.width + 0.3 }
  linesGap = { y: spiritTileDescription.height + 0.3}
  coordinates = { x: 20.5, y: -22, z: 0}
}

export const spiritLineLocator = new SpiritLineLocator()