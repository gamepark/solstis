/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { SpiritInMountainDescription } from './description/SpiritInMountainDescription'

export class SpiritInMountainLocator extends ItemLocator {
  locationDescription = new SpiritInMountainDescription()

  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    return this.locationDescription.getDropZonePosition(item.location, context)
  }

}

export const spiritInMountainLocator = new SpiritInMountainLocator()