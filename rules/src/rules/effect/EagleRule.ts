import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { DrawableEffectRule } from './DrawableEffectRule'

export class EagleRule extends DrawableEffectRule {

  onRuleStart() {
    if (!this.deck.length) return this.endRuleMoves
    return []
  }

  getPlayerMoves() {
    if (this.playAreaCard.length) {
      return new PlaceCardHelper(this.game).getPlayCardMove(this.playAreaCard)
    }
    return this.deck.getIndexes().map((index) => this.customMove(CustomMoveType.DrawCard, index))
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.DrawCard)(move)) return []
    return new PlaceCardHelper(this.game).getPlayCardMove(this.deck.index(move.data))
  }

  get deck() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
  }
}
