import { CustomMove, isCustomMoveType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { GetCardHelper } from '../helper/GetCardHelper'
import { PlaceRainbowRule } from '../PlaceRainbowRule'
import { RuleId } from '../RuleId'

export class EagleRule extends PlaceRainbowRule {

  onRuleStart() {
    if (!this.deck.length) return [this.rules().startRule(RuleId.Capture)]
    return []
  }

  getPlayerMoves() {
    return this.deck.getIndexes().map((index) => this.rules().customMove(CustomMoveType.DrawCard, index))
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.DrawCard)(move)) return []
    return new GetCardHelper(this.game).getPlayCardMove(this.deck.index(move.data))
  }

  afterItemMove(move: ItemMove) {
    return [
      ...new GetCardHelper(this.game).afterItemMove(move),
      this.rules().startRule(RuleId.Capture)
    ]
  }

  get deck() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
  }
}