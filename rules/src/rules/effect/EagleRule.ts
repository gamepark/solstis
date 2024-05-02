import { CustomMove, isCustomMoveType, isStartRule, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { RuleId } from '../RuleId'

export class EagleRule extends PlayerTurnRule {

  onRuleStart() {
    if (!this.deck.length) return [this.rules().startRule(RuleId.RefillHand)]
    return []
  }

  getPlayerMoves() {
    return this.deck.getIndexes().map((index) => this.rules().customMove(CustomMoveType.DrawCard, index))
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.DrawCard)(move)) return []
    return new PlaceCardHelper(this.game).getPlayCardMove(this.deck.index(move.data))
  }

  afterItemMove(move: ItemMove) {
    const afterCardMove = new PlaceCardHelper(this.game).afterItemMove(move)
    if (afterCardMove.some(isStartRule)) return afterCardMove
    return [
      ...afterCardMove,
      this.rules().startRule(RuleId.RefillHand)
    ]
  }

  get deck() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
  }
}