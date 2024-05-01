import { isMoveItemType, ItemMove, Location, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getLine, getValue, MountainLandscape } from '../../material/MountainLandscape'
import { Memory } from '../Memory'
import { panoramaLandscapes } from '../PanoramaLandscapes'
import { RuleId } from '../RuleId'

export class GetCardHelper extends PlayerTurnRule {

  getPlayCardMove(cards: Material) {
    const moves: MaterialMove[] = []
    for (const cardIndex of cards.getIndexes()) {
      const item = cards.getItem(cardIndex)!
      const alreadyOccupied = this.material(MaterialType.LandscapeTile)
        .location((l) => equal(l, item.location)).length

      if (alreadyOccupied && this.isCoveredBySpirit(item.location)) {
        moves.push(
          cards.index(cardIndex).deleteItem()
        )
      } else {
        moves.push(
          cards.index(cardIndex).moveItem((item) => ({
            type: LocationType.Panorama,
            player: this.player,
            ...this.getCardPositionInPanorama(item.id)
          }))
        )
      }
    }

    return moves
  }

  get captureMoves() {
    const playedCard = this.playAreaCard
    const queue = this.queue
    const moves: MaterialMove[] = this.getPlayCardMove(playedCard)

    if (!this.hasPlacedQueueCard) {
      const cards = queue
        .filter((item) => (
          getLine(this.playedCard) === getLine(item.id) ||
          getValue(this.playedCard) === getValue(item.id)
        ))

      moves.push(
        ...this.getPlayCardMove(cards)
      )
    }

    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move)) return []
    const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)!
    if (item.id === MountainLandscape.Rainbow) return []
    const rainbowOnPlace = this
      .material(MaterialType.LandscapeTile)
      .location((l) => equal(l, item.location))
      .id(MountainLandscape.Rainbow)

    const moves: MaterialMove[] = []
    moves.push(
      ...rainbowOnPlace.moveItems({
        type: LocationType.PlayArea,
        player: this.player
      })
    )

    if (rainbowOnPlace.length) {
      moves.push(this.rules().startRule(RuleId.MoveRainbow))
    }

    return moves
  }

  get hasPlacedQueueCard() {
    return this.remind(Memory.QueueCardPlaced) !== undefined
  }

  isCoveredBySpirit({ x, y }: Location) {
    return this.material(MaterialType.SpiritTile)
      .location((l) => l.type === LocationType.SpiritInMountain && (
        (l.x === x && l.y === y)
        || (l.x === x! - 1 && l.y === y)
        || (l.x === x! - 1 && l.y === y! - 1)
        || (l.x === x && l.y === y! - 1)
      )).length > 0
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
      .filter((item) => !item.location.rotation)
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
}