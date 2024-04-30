import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class SecondChanceRule extends PlayerTurnRule {

  onRuleStart() {
    this.memorize(Memory.SecondChance, true)
    return [
      this.material(MaterialType.LandscapeTile)
        .location(LocationType.LandscapeDeck)
        .moveItem({
          type: LocationType.PlayArea,
          player: this.player
        }),
      this.rules().startRule(RuleId.Capture)
    ]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move) || move.location.type !== LocationType.PlayArea) return []
    this.memorize(Memory.PlayedCard, this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)!.id)
    return []
  }
}