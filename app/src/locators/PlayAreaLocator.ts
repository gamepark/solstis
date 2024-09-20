/** @jsxImportSource @emotion/react */
import { DropAreaDescription, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MountainLandscape } from '@gamepark/solstis/material/MountainLandscape'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'

class PlayAreaLocator extends Locator {

  locationDescription = new DropAreaDescription(landscapeTileDescription)

  getLocations({ player }: MaterialContext) {
    return player !== undefined ? [{ type: LocationType.PlayArea, player }] : []
  }

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { x: location.player === player ? -7 : 16.5, y: -14 }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x = 0, y, z } = super.getItemCoordinates(item, context)
    const player = context.player ?? context.rules.players[0]
    if (item.id === MountainLandscape.Rainbow) {
      if (item.location.player === player) {
        return { x: x + landscapeTileDescription.width + 0.2, y, z }
      } else {
        return { x: x - landscapeTileDescription.width + 0.2, y, z }
      }
    }
    return { x, y, z }
  }
}

export const playAreaLocator = new PlayAreaLocator()