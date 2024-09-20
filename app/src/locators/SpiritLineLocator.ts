/** @jsxImportSource @emotion/react */
import { FlexLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { spiritTileDescription } from '../material/SpiritTileDescription'

class SpiritListLocator extends FlexLocator {
  coordinates = { x: 20.7, y: -22 }
  gap = { x: spiritTileDescription.width + 0.3 }
  lineGap = { y: spiritTileDescription.height + 0.3 }
  lineSize = 5

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y, z = 0 } = super.getItemCoordinates(item, context)
    return item.selected ? { x, y, z: z + 1 } : { x, y, z }
  }
}

export const spiritLineLocator = new SpiritListLocator()