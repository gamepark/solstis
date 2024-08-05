/** @jsxImportSource @emotion/react */
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MountainLandscape } from '@gamepark/solstis/material/MountainLandscape'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'
import { PlayAreaDescription } from './description/PlayAreaDescription'

export class PlayAreaLocator extends Locator {

  locationDescription = new PlayAreaDescription()

  getLocations(context: MaterialContext) {
    return context.rules.players.map((p) => ({
      type: LocationType.PlayArea,
      player: p
    }))
  }

  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const { rules, player } = context
    const position = this.locationDescription.getPlayAreaCoordinates(item.location, context)
    if (item.id === MountainLandscape.Rainbow) {
      if (item.location.player === (player ?? rules.players[0])) {
        position.x += landscapeTileDescription.width + 0.2
      } else {
        position.x -= (landscapeTileDescription.width + 0.2)
      }

    }

    return position
  }
}

export const playAreaLocator = new PlayAreaLocator()