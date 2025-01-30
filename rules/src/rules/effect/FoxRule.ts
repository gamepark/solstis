import { CustomMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMoveType'
import { Memory } from '../Memory'
import { ImmediateEffectRule } from './ImmediateEffectRule'

export class FoxRule extends ImmediateEffectRule {
  onRuleStart() {
    return this.opponentHand.rotateItems(true)
  }

  getPlayerMoves() {
    const items = this.opponentHand.getItems()
    return items.map((item) => this.customMove(CustomMoveType.ForceCardToPlay, item.id))
  }

  onCustomMove(move: CustomMove) {
    this.memorize(Memory.CardToPlay, move.data)
    return [
      ...this.opponentHand.rotateItems(false),
      this.opponentHand.shuffle(),
      ...this.endRuleMoves
    ]
  }

  get opponentHand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.opponent)
  }

  get opponent() {
    return this.game.players.find((p) => p !== this.player)
  }
}
