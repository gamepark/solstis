 import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getLine, getValue } from '../material/MountainLandscape'
import { Spirit } from '../material/Spirit'
import { PlayerId } from '../PlayerId'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class SelectHandTileRule extends PlayerTurnRule {

  onRuleStart() {
    return this.endGameMoves
  }

  onRuleEnd() {
    this.forget(Memory.CardToPlay)
    return []
  }

  canPlay(player: PlayerId) {
    return this.getHand(player).length > 0
  }

  getPlayerMoves() {
    return this.getHand(this.player).moveItems({
      type: LocationType.PlayArea,
      player: this.player
    })
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move)) return []
    const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)
    this.memorize(Memory.PlayedCard, item.id)
    return [
      this.startRule(RuleId.Capture)
    ]
  }

  getHand(playerId: PlayerId) {
    let hand = this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(playerId)

    const forcedCard = this.forcedCard
    if (forcedCard !== undefined) {
      hand = hand.id(forcedCard)
    }

    if (!this.deck.length) {
      const queue = this.queue
      return hand
        .filter((card) => {
            const cards = queue
              .filter((item) => (
                getLine(card.id) === getLine(item.id) ||
                getValue(card.id) === getValue(item.id)
              ))

            return !!cards.length
        })

    }

    return hand
  }

  get forcedCard() {
    return this.remind(Memory.CardToPlay)
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

  get endGameMoves() {
    if (this.deck.length) return []
    const hiddenHandCard = this.material(MaterialType.LandscapeTile).location(LocationType.Hand).id(id => id === undefined)
    if (hiddenHandCard.length) return []

    let someoneCanPlay = false
    let squirrelPlayer = undefined
    let evilPlayer = undefined
    for (const  player of this.game.players) {
      if (this.canPlay(player)) {
        someoneCanPlay = true
        continue
      }
      const evil = this.material(MaterialType.SpiritTile).location(LocationType.Evil).player(player)
      if (evil.length) evilPlayer = this.game.players.find((p) => p !== player)!
      const spirits = this.getSpirits(player)
      if (spirits.some((s) => s.id === Spirit.Squirrel)) squirrelPlayer = player
    }

    if (!someoneCanPlay) {
      if (evilPlayer) return [this.startPlayerTurn(RuleId.EvilBeaver, evilPlayer)]
      if (squirrelPlayer) return [this.startPlayerTurn(RuleId.Squirrel, squirrelPlayer)]
      return [this.endGame()]
    }

    if (someoneCanPlay && !this.canPlay(this.player)) return [this.startPlayerTurn(RuleId.SelectHandTile, this.nextPlayer)]

    return []
  }

  getSpirits(player: PlayerId) {
    const allSpirits = this
      .material(MaterialType.SpiritTile)
      .location(LocationType.SpiritInMountain)
      .player(player)
    return allSpirits
      .filter((item) => allSpirits.location((l) => equal(l, item.location)).length === 1)
      .getItems()
  }
}
