/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { Coordinates } from '@gamepark/rules-api/dist/material/location/Location'

export class EvilLocator extends ItemLocator {


  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const { rules, player } = context
    if (item.location.player === (player ?? rules.players[0])) {
      return { x: -5.4, y: -8, z: 0 }
    }

    return { x: 15, y: -8, z: 0 }
  }
}

export const evilLocator = new EvilLocator()