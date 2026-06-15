import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { isEqual } from 'es-toolkit'
import { landscapeTileDescription } from '../../material/LandscapeTileDescription'

export class SpiritInMountainDescription extends DropAreaDescription {
  height = landscapeTileDescription.height * 2 + 0.1
  width = landscapeTileDescription.width * 2 + 0.1
  borderRadius = landscapeTileDescription.borderRadius

  canShortClick(move: MaterialMove, location: Location, { rules }: MaterialContext): boolean {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return false
    const selectedSpirit = rules.material(MaterialType.SpiritTile).selected()
    if (!selectedSpirit.length) return false
    return move.itemIndex === selectedSpirit.getIndex() && isEqual(location, move.location)
  }
}