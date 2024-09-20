import { DropAreaDescription } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/solstis/rules/CustomMoveType'
import { spiritTileDescription } from '../../material/SpiritTileDescription'

export class PlayerHandDescription extends DropAreaDescription {
  borderRadius = 0.3
  height = spiritTileDescription.height + 0.8
  width = spiritTileDescription.width * 2.5

  isMoveToLocation(move: MaterialMove): boolean {
    return isCustomMoveType(CustomMoveType.DrawSpirits)(move)
  }
}