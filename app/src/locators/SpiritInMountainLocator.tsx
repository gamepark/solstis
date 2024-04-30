/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/soltis/material/LocationType'
import { MaterialType } from '@gamepark/soltis/material/MaterialType'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'
import { PanoramaDescription } from './description/PanoramaDescription'

export class SpiritInMountainLocator extends ItemLocator {

  getPosition(item: MaterialItem, context: ItemContext<number, number, number>): Coordinates {
    const { rules } = context
    const card = rules.material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .id(item.location.id)
      .player(item.location.player)
      .getItem()!

    const position = new PanoramaDescription().getCoordinates(card.location, context)
    position.x += landscapeTileDescription.width / 2
    position.y -= landscapeTileDescription.height / 2
    position.z = 0.5

    return position
  }

}

export const spiritInMountainLocator = new SpiritInMountainLocator()