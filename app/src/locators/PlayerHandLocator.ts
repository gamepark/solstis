/** @jsxImportSource @emotion/react */
import { HandLocator, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { RuleId } from '@gamepark/solstis/rules/RuleId'
import { PlayerHandDescription } from './description/PlayerHandDescription'

class PlayerHandLocator extends Locator {
  locationDescription = new PlayerHandDescription()

  getLocations({ player }: MaterialContext) {
    return player !== undefined ? [{ type: LocationType.Hand, player }] : []
  }

  coordinates = { x: -31, y: -9 }

  placeItem(item: MaterialItem, context: ItemContext) {
    if (context.type === MaterialType.LandscapeTile) {
      return landscapeTileHandLocator.placeItem(item, context)
    } else {
      return spiritTileHandLocator.placeItem(item, context)
    }
  }
}

class LandscapeTileHandLocator extends HandLocator {

  isFoxRule(location: Location, { rules }: MaterialContext) {
    return rules.game.rule?.id === RuleId.Fox && location.player !== rules.getActivePlayer()
  }
  getCoordinates(location: Location, context: MaterialContext) {
    const { player, rules } = context
    if (this.isFoxRule(location, context)) return { x: 5, y: -15, z: 20 }

    if (!player && rules.players[0] === location.player) {
      return { x: -31, y: -12 }
    }
    if (location.player === (player ?? rules.players[0])) {
      return { x: -30, y: -15 }
    }
    return { x: 41, y: -13 }
  }

  maxAngle = 4.5

  getGapMaxAngle(location: Location, context: MaterialContext): number {
    const { rules, player } = context
    if (this.isFoxRule(location, context)) return 2

    if (!player && rules.players[0] === location.player) {
      return 1
    }
    if (location.player === (player ?? rules.players[0])) {
      return 1.85
    }
    return 0.9
  }

  getBaseAngle(location: Location, context: MaterialContext) {
    const { rules, player } = context
    if (this.isFoxRule(location, context)) return 0

    if (!player && rules.players[0] === location.player) {
      return 90
    }
    if (location.player === player) {
      return 0
    }

    return -90
  }
}

class SpiritTileHandLocator extends LandscapeTileHandLocator {
  getCoordinates(location: Location, { player, rules }: MaterialContext) {
    if (!player && rules.players[0] === location.player) {
      return { x: -31, y: -6 }
    }
    if (location.player === (player ?? rules.players[0])) {
      return { x: -31, y: -9 }
    }
    return { x: 41, y: -8 }
  }

  getGapMaxAngle(location: Location, context: MaterialContext) {
    return super.getGapMaxAngle(location, context) - 0.55
  }
}

const landscapeTileHandLocator = new LandscapeTileHandLocator()
const spiritTileHandLocator = new SpiritTileHandLocator()
export const playerHandLocator = new PlayerHandLocator()
