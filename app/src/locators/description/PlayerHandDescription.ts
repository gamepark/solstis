import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { isCustomMoveType, Location, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { CustomMoveType } from '@gamepark/solstis/rules/CustomMoveType'
import { spiritTileDescription } from '../../material/SpiritTileDescription'

export class PlayerHandDescription extends LocationDescription {
  borderRadius = 0.3
  alwaysVisible = true
  height = spiritTileDescription.height + 0.8
  width = spiritTileDescription.width * 2.5

  getLocations({ player }: MaterialContext) {
    if (!player) return []
    return [{
      type: LocationType.Hand,
      player: player
    }]
  }

  getCoordinates(_location: Location, _context: MaterialContext) {
    return { x: -31, y: -9, z: 0 }
  }

  isMoveToLocation(move: MaterialMove): boolean {
    return isCustomMoveType(CustomMoveType.DrawSpirits)(move)
  }
}