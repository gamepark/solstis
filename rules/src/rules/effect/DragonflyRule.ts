import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { CustomMoveType } from '../CustomMoveType'
import { FireflyHelper } from '../helper/FireflyHelper'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { Memory } from '../Memory'
import { panoramaLandscapes } from '../PanoramaLandscapes'
import { DrawableEffectRule } from './DrawableEffectRule'

export class DragonflyRule extends DrawableEffectRule {

  getPlayerMoves() {
    if (!this.isCardDrawn) {
      return this.opponentHand.getIndexes().map((index) => this.customMove(CustomMoveType.DrawCard, index))
    }

    return new PlaceCardHelper(this.game).getPlayCardMove(this.playAreaCard)
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.DrawCard)(move)) return []
    return new PlaceCardHelper(this.game).getPlayCardMove(this.opponentHand.index(move.data))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.LandscapeTile)(move) && move.location?.type === LocationType.Panorama) {
      const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)
      const realId = item.id === MountainLandscape.Rainbow ? panoramaLandscapes[item.location.x!][item.location.y!] : item.id

      new FireflyHelper(this.game).recomputeFireflies(realId)
    }

    if (this.playAreaCard.length) return []
    const moves: MaterialMove[] = []

    if (!this.isCardDrawn) {
      if (isMoveItemType(MaterialType.LandscapeTile)(move) && move.location?.type === LocationType.Panorama) {
        moves.push(...new PlaceCardHelper(this.game).afterItemMove(move))
      }

      const deck = this.deck
      const opponent = this.game.players.find((p) => p !== this.player)!
      if (deck.length) {
        moves.push(deck.moveItem({ type: LocationType.Hand, player: opponent }))
      } else {
        moves.push(...this.endRuleMoves)
      }

      this.memorize(Memory.CardDrawn, true)
      return moves
    }
    moves.push(...this.endRuleMoves)
    return moves
  }

  get opponentHand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player((p) => p !== this.player)
  }

  get deck() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
  }

  get isCardDrawn() {
    return this.remind(Memory.CardDrawn)
  }

  get hand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.player)
  }

  onRuleEnd() {
    this.forget(Memory.CardDrawn)
    return []
  }


}
