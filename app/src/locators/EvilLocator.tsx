/** @jsxImportSource @emotion/react */
import { ItemContext, Locator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export class EvilLocator extends Locator {


  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const { rules, player } = context
    if (item.location.player === (player ?? rules.players[0])) {
      return { x: -5.4, y: -8, z: 0 }
    }

    return { x: 15, y: -8, z: 0 }
  }
}

export const evilLocator = new EvilLocator()