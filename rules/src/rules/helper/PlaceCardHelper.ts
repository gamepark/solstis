import { getDistanceBetweenSquares, isMoveItemType, ItemMove, Material, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getLine, getValue, MountainLandscape } from '../../material/MountainLandscape'
import { Memory } from '../Memory'
import { panoramaLandscapes } from '../PanoramaLandscapes'

export class PlaceCardHelper extends PlayerTurnRule {

  getPlayCardMove(cards: Material) {
    const moves: MaterialMove[] = []
    for (const cardIndex of cards.getIndexes()) {
      const item = cards.getItem(cardIndex)
      if (item.id === MountainLandscape.Rainbow) {
        moves.push(
          ...this.placeRainbow(cards.index(cardIndex))
        )
        continue
      }

      const destination = this.getCardPositionInPanorama(item.id)!
      const tileOnTarget = this.material(MaterialType.LandscapeTile)
        .location((l) => l.type === LocationType.Panorama && l.x === destination.x && l.y === destination.y && l.player === this.player)

      if (tileOnTarget?.length && this.isCoveredBySpirit(destination)) {
        moves.push(
          cards.index(cardIndex).deleteItem()
        )
      } else {
        moves.push(
          cards.index(cardIndex).moveItem({
            type: LocationType.Panorama,
            player: this.player,
            ...destination
          })
        )
      }
    }

    return moves
  }

  captureMoves(ignorePlayedCard?: boolean) {
    const playedCard = this.playAreaCard
    const queue = this.queue
    const moves: MaterialMove[] = ignorePlayedCard? []: this.getPlayCardMove(playedCard)

    const rainbow = playedCard.filter((item) => item.id === MountainLandscape.Rainbow)
    if (rainbow.length) {
      return this.placeRainbow(rainbow)
    }


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

  placeRainbow(cards: Material) {
    const moves: MaterialMove[] = []
    const panorama = this.panorama
    for (let columnIndex = 0; columnIndex < panoramaLandscapes.length; columnIndex++) {
      const column = panoramaLandscapes[columnIndex]
      for (let rowIndex = 0; rowIndex < column.length; rowIndex++) {
        if (this.canPlaceRainbow(panorama, columnIndex, rowIndex)) {
          moves.push(cards.moveItem({
            type: LocationType.Panorama,
            player: this.player,
            x: columnIndex,
            y: rowIndex
          }))
        }
      }
    }

    return moves
  }

  canPlaceRainbow(panorama: Material, x: number, y: number) {
    if (panorama.location((l) => l.x === x && l.y === y).length > 0) return false
    return panorama.filter((i) => getDistanceBetweenSquares(
      { x: i.location.x!, y: i.location.y! },
      { x, y },
    ) === 1).length > 0
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move)) return []
    const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)
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

    return moves
  }

  get hasPlacedQueueCard() {
    return this.remind(Memory.QueueCardPlaced) !== undefined
  }

  isCoveredBySpirit({ x, y }: XYCoordinates) {
    return this.material(MaterialType.SpiritTile)
      .location((l) => l.type === LocationType.SpiritInMountain && (
        (l.x === x && l.y === y)
        || (l.x === x! - 1 && l.y === y)
        || (l.x === x! - 1 && l.y === y! - 1)
        || (l.x === x && l.y === y! - 1)
      ))
      .player(this.player)
      .length > 0
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

  get panorama() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
  }
}