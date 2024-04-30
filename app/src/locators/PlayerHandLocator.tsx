/** @jsxImportSource @emotion/react */
import { HandLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { Coordinates, Location } from '@gamepark/rules-api/dist/material/location/Location'
import { MaterialType } from '@gamepark/soltis/material/MaterialType'

export class PlayerHandLocator extends HandLocator {

  getCoordinates(location: Location, context: ItemContext): Coordinates {
    if (context.type === MaterialType.LandscapeTile) {
      return this.getLandscapeCoordinates(location, context)
    }

    return this.getSpiritCoordinates(location, context)
  }

  getLandscapeCoordinates(location: Location, context: ItemContext) {
    const { rules, player } = context
    if (!player && rules.players[0] === location.player) {
      return { x: -31, y: -12, z: 0 }
    }

    if (location.player === (player ?? rules.players[0])) {
      return { x: -30, y: -15, z: 0 }
    }

    return { x: 41, y: -12, z: 0 }
  }

  getSpiritCoordinates(location: Location, context: ItemContext) {
    const coordinates = this.getLandscapeCoordinates(location, context)
    coordinates.y += 6
    return coordinates
  }

  getGapMaxAngle(item: MaterialItem, context: ItemContext): number {
    if (context.type === MaterialType.LandscapeTile) {
      return this.getLandscapeGapMaxAngle(item, context)
    }

    return this.getSpiritGapMaxAngle(item, context)
  }

  getLandscapeGapMaxAngle(item: MaterialItem, context: ItemContext) {
    const { rules, player } = context
    if (!player && rules.players[0] === item.location.player) {
      return 1
    }

    if (item.location.player === (player ?? rules.players[0])) {
      return 1.85
    }

    return 1
  }

  getSpiritGapMaxAngle(item: MaterialItem, context: ItemContext) {
    return this.getLandscapeGapMaxAngle(item, context) - 0.55
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