/** @jsxImportSource @emotion/react */
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import equal from 'fast-deep-equal'
import { landscapeTileDescription } from '../../material/LandscapeTileDescription'
import { PanoramaDescription } from './PanoramaDescription'

export class SpiritInMountainDescription extends LocationDescription {
  height = landscapeTileDescription.height * 2 + 0.1
  width = landscapeTileDescription.width * 2 + 0.1
  alwaysVisible = true

  isAlwaysVisible(location: Location<number, number>, context: MaterialContext<number, number, number>): boolean {
    return super.isAlwaysVisible(location, context)
  }

  getCoordinates(location: Location, context: LocationContext) {
    const coordinates = this.getDropZonePosition(location, context)
    coordinates.z = 1
    coordinates.y -= 0.05
    coordinates.x += 0.05
    return coordinates
  }

  getDropZonePosition(location: Location, context: MaterialContext): Coordinates {
    const position = new PanoramaDescription().getCoordinates(location, context)
    position.x += landscapeTileDescription.width / 2
    position.y -= landscapeTileDescription.height / 2
    position.z = 0.5

    return position
  }

  canLongClick(): boolean {
    return false
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return false
    const { rules } = context
    const selectedSpirit = rules.material(MaterialType.SpiritTile).selected()

    if (!selectedSpirit.length) return false
    return move.itemIndex === selectedSpirit.getIndex() && equal(location, move.location)
  }

}