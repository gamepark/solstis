import { isMoveItemType, ItemMove, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class QueueHelper extends MaterialRulesPart {
  constructor(game: MaterialGame) {
    super(game)
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move)) return []
    const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)!
    if (item.location.type !== LocationType.LandscapeQueue) return []
    const itemZ = item.location?.z
    if (itemZ !== undefined &&  itemZ > 0) {
      return this.material(MaterialType.LandscapeTile)
        .location((l) => l.type === LocationType.LandscapeQueue && l.x === item.location.x && l.z === itemZ - 1)
        .rotateItems(false)
    }

    return []
  }
}