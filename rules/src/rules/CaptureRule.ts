import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getLine, getValue, MountainLandscape } from '../material/MountainLandscape'
import { Memory } from './Memory'
import { panoramaLandscapes } from './PanoramaLandscapes'

export class CaptureRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this.captureMoves
  }

  onRuleStart() {
    // TODO: if no card to choose => Second chance
    return []
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
    if (!isMoveItemType(MaterialType.LandscapeTile)(move)) return []
    if (this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)?.location?.type !== LocationType.LandscapeQueue) return []
    this.memorize(Memory.QueueCardPlaced, move.itemIndex)
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
    this.forget(Memory.QueueCardPlaced)
    this.forget(Memory.PlayedCard)
    return []
  }
}