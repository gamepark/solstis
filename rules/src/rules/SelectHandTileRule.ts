import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getLine, getValue } from '../material/MountainLandscape'
import { PlayerId } from '../PlayerId'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class SelectHandTileRule extends PlayerTurnRule {

  onRuleStart() {
    const hiddenHandCard = this.material(MaterialType.LandscapeTile).location(LocationType.Hand).id(id => id === undefined)
    if (hiddenHandCard.length) return []

    if (this.game.players.every((p) => !this.canPlay(p))) {
      return [this.rules().endGame()]
    }

    return []
  }

  canPlay(player: PlayerId) {
    const hand = this.material(MaterialType.LandscapeTile).location(LocationType.Hand).player(player)

    const queue = this.queue
    for (const card of hand.getItems()) {
      const cards = queue
        .filter((item) => (
          getLine(card.id) === getLine(item.id) ||
          getValue(card.id) === getValue(item.id)
        ))

      if (cards.length) return true
    }

    return false
  }

  getPlayerMoves() {
    return this.hand.moveItems({
      type: LocationType.PlayArea,
      player: this.player
    })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move)) return []
    const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)!
    this.memorize(Memory.PlayedCard, item.id)
    return [
      this.rules().startRule(RuleId.Capture)
    ]
  }

  get hand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.player)
  }

  get deck() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
  }

  get queue() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeQueue)
      .filter((item) => !item.location.rotation)
  }
}