import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SquareHelper } from '../helper/SquareHelper'
import { PlaceRainbowRule } from '../PlaceRainbowRule'
import { RuleId } from '../RuleId'

export class FishRule extends PlaceRainbowRule {
  onRuleStart() {
    const card = this.rainbowCard
    if (!card.length) return [this.rules().startRule(RuleId.Capture)]
    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move) || move.location.type !== LocationType.Panorama) return []
    const encounterMoves = new SquareHelper(this.game, move.itemIndex, move.location).encounterSpiritMoves
    if (encounterMoves.length) {
      return encounterMoves
    }

    return [this.rules().startRule(RuleId.Capture)]
  }
}