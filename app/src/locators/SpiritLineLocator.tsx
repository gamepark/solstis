/** @jsxImportSource @emotion/react */
import { FlexLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { spiritTileDescription } from '../material/SpiritTileDescription'


export class SpiritLineLocator extends FlexLocator {
  itemsPerLine = 5
  itemsGap = { x: spiritTileDescription.width + 0.3 }
  linesGap = { y: spiritTileDescription.height + 0.3}

  getCoordinates(item: MaterialItem) {
    const coordinates = { x: 20.7, y: -22, z: 0}
    if (item.selected) {
      coordinates.z = 10
    }

    return coordinates
  }

}

export const spiritLineLocator = new SpiritLineLocator()