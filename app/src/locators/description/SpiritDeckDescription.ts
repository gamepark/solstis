import { ComponentSize, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { isCustomMoveType, Location, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { CustomMoveType } from '@gamepark/solstis/rules/CustomMoveType'
import { spiritTileDescription } from '../../material/SpiritTileDescription'

export class SpiritDeckDescription extends LocationDescription {
  borderRadius = 0.1

  getSize(_location: Location, context: MaterialContext): ComponentSize {
    const {rules } = context
    const deckLength = Math.max(rules.material(MaterialType.SpiritTile).location(LocationType.SpiritDeck).length - 1, 0)
    return {
      height : spiritTileDescription.height + (0.03 * deckLength),
      width: spiritTileDescription.width + (0.03 * deckLength)
    }
  }

  location = {
    type: LocationType.SpiritDeck
  }

  getCoordinates(_location: Location, context: MaterialContext) {
    const coordinates = { x: 18, y: -22, z: 50}
    const {rules } = context
    const deckLength = Math.max(rules.material(MaterialType.SpiritTile).location(LocationType.SpiritDeck).length, 0)
    coordinates.x -= 0.03 * deckLength / 2
    coordinates.y -= 0.03 * deckLength / 2

    return coordinates
  }

  canShortClick(move: MaterialMove): boolean {
    return isCustomMoveType(CustomMoveType.DrawSpirits)(move)
  }
}