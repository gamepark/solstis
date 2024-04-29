import { getDistanceBetweenSquares, isMoveItemType, ItemMove, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SquareHelper } from './helper/SquareHelper'
import { panoramaLandscapes } from './PanoramaLandscapes'
import { RuleId } from './RuleId'

export class PlaceRainbowRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const panorama = this.panorama
    const moves: MaterialMove[] = []
    const rainbowCard = this.rainbowCard
    for (let columnIndex = 0; columnIndex < panoramaLandscapes.length; columnIndex++) {
      const column = panoramaLandscapes[columnIndex]
      for (let rowIndex = 0; rowIndex < column.length; rowIndex++) {
        if (this.hasAdjacentCard(panorama, columnIndex, rowIndex)) {
          moves.push(rainbowCard.moveItem({
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

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move) || move.location.type !== LocationType.Panorama) return []
    const encounterMoves = new SquareHelper(this.game, move.itemIndex, move.location).encounterSpiritMoves
    if (encounterMoves.length) {
      return encounterMoves
    }

    return [this.rules().startRule(RuleId.Capture)]
  }

  get rainbowCard() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.RainbowDeck)
      .maxBy((item) => item.location.x!)
  }

  hasAdjacentCard(panorama: Material, x: number, y: number) {
    if (panorama.location((l) => l.x === x && l.y === y).length > 0) return []
    return panorama.filter((i) => getDistanceBetweenSquares(
      { x: i.location.x!, y: i.location.y! },
      { x, y },
    ) === 1).length > 0
  }

  get panorama() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
  }
}