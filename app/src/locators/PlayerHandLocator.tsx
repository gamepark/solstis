/** @jsxImportSource @emotion/react */
import { HandLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { Coordinates, Location } from '@gamepark/rules-api/dist/material/location/Location'

export class PlayerHandLocator extends HandLocator {

  getCoordinates(location: Location, context: ItemContext): Coordinates {
    const { rules, player } = context
    if (!player && rules.players[0] === location.player) {
      return { x: -31, y: -12, z: 0 }
    }

    if (location.player === (player ?? rules.players[0])) {
      return { x: -30, y: -15, z: 0 }
    }

    return { x: 41, y: -12, z: 0 }
  }

  getMaxAngle(item: MaterialItem, context: ItemContext): number {
    const { rules, player } = context
    if (!player && rules.players[0] === item.location.player) {
      return 3
    }

    if (item.location.player === (player ?? rules.players[0])) {
      return 3.5
    }

    return 3
  }

  getBaseAngle(item: MaterialItem, context: ItemContext) {
    const { rules, player } = context
    if (!player && rules.players[0] === item.location.player) {
      return 90
    }
    if (item.location.player === (player ?? rules.players[0])) {
      return 0
    }

    return -90
  }
}

export const playerHandLocator = new PlayerHandLocator()