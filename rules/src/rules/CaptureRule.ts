import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getLine, getValue, MountainLandscape } from '../material/MountainLandscape'
import { SquareHelper } from './helper/SquareHelper'
import { Memory } from './Memory'
import { panoramaLandscapes } from './PanoramaLandscapes'
import { RuleId } from './RuleId'

export class CaptureRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.captureMoves
  }

  onRuleStart() {
    if (this.hasNothingToDo) return [this.rules().startRule(RuleId.RefillHand)]
    if (this.getPlayerMoves().length > 1) return []
    const x = this.material(MaterialType.LandscapeTile).location(LocationType.LandscapeQueue).maxBy((item) => item.location.x!).getItem()!.location.x ?? 0
    return [
      ...this.playAreaCard.moveItems({
        type: LocationType.LandscapeQueue,
        x: x + 1,
        y: 0
      }),
      this.rules().startRule(this.isSecondChance? RuleId.PlaceRainbow: RuleId.SecondChance)
    ]
  }

  get hasNothingToDo () {
    return this.remind(Memory.QueueCardPlaced) && !this.playedCard
  }

  get isSecondChance() {
    return !!this.remind(Memory.SecondChance)
  }

  get captureMoves() {
    const playedCard = this.playAreaCard
    const queue = this.queue
    const moves: MaterialMove[] = playedCard.moveItems({
      type: LocationType.Panorama,
      player: this.player,
      ...this.getCardPositionInPanorama(this.playedCard)
    })

    if (!this.hasPlacedQueueCard) {
      moves.push(
        ...queue
          .filter((item) => !item.location.rotation && (
            getLine(this.playedCard) === getLine(item.id) ||
            getValue(this.playedCard) === getValue(item.id)
          ))
          .moveItems((item) => ({
            type: LocationType.Panorama,
            player: this.player,
            ...this.getCardPositionInPanorama(item.id)
          }))
      )
    }

    return moves
  }

  get hasPlacedQueueCard() {
    return this.remind(Memory.QueueCardPlaced) !== undefined
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move) || move.location.type !== LocationType.Panorama) return []


    if (this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)?.location?.type === LocationType.LandscapeQueue) {
      this.memorize(Memory.QueueCardPlaced, move.itemIndex)
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move) || move.location.type !== LocationType.Panorama) return []

    const encounterMoves = new SquareHelper(this.game, move.itemIndex, move.location).encounterSpiritMoves
    if (encounterMoves.length) {
      return encounterMoves
    }

    if (!this.getPlayerMoves().length) return [this.rules().startRule(RuleId.RefillHand)]
    return []
  }

  getCardPositionInPanorama(id: MountainLandscape) {
    for (let columnIndex = 0; columnIndex < panoramaLandscapes.length; columnIndex++) {
      const column = panoramaLandscapes[columnIndex]
      for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
        if (column[rowIndex] === id) {
          return { x: columnIndex, y: rowIndex }
        }
      }
    }

    return
  }

  get panorama() {
    return this.material(MaterialType.LandscapeTile).location(LocationType.Panorama).player(this.player)
  }

  get queue() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeQueue)
  }

  get playAreaCard() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.PlayArea)
      .player(this.player)
  }

  get playedCard() {
    return this.remind<MountainLandscape>(Memory.PlayedCard)
  }

  onRuleEnd() {
    this.forget(Memory.SecondChance)
    return []
  }
}