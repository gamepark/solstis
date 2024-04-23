/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { PlayAreaDescription } from './description/PlayAreaDescription'

export class PlayAreaLocator extends ItemLocator {

  locationDescription = new PlayAreaDescription()

  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    return this.locationDescription.getPlayAreaCoordinates(item.location, context)
  }
}

export const playAreaLocator = new PlayAreaLocator()