/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { Spirit } from '@gamepark/solstis/material/Spirit'
import { SpiritInMountainDescription } from './description/SpiritInMountainDescription'

export class SpiritInMountainLocator extends ItemLocator {
  locationDescription = new SpiritInMountainDescription()
  delta = { z: 0.5 }

  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const position = this.locationDescription.getDropZonePosition(item.location, context)
    position.z +=1
    if (item.id === Spirit.EvilBeaver) position.z += 1
    return position
  }


  getRotateZ(item: MaterialItem) {
    if (item.id === Spirit.EvilBeaver) return 45
    return 0
  }

}

export const spiritInMountainLocator = new SpiritInMountainLocator()