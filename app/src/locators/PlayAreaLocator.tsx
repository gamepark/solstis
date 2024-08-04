/** @jsxImportSource @emotion/react */
import { ItemContext, Locator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { MountainLandscape } from '@gamepark/solstis/material/MountainLandscape'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'
import { PlayAreaDescription } from './description/PlayAreaDescription'

export class PlayAreaLocator extends Locator {

  locationDescription = new PlayAreaDescription()

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