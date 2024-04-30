import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class EvilRule extends PlayerTurnRule {

  getPlayerMoves() {
    const evil = this.evil
    const spirits = this.spirits
    const moves: MaterialMove[] = []
    if (!evil.length) return []

    for (const spirit of spirits.getItems()) {
      moves.push(
        evil.moveItem({
          ...spirit.location,
          z: 1
        })
      )
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return []
    return [this.rules().endGame()]
  }

  get evil() {
    return this
      .material(MaterialType.SpiritTile)
      .location(LocationType.Evil)
      .player(this.player)
  }

  get spirits() {
    return this
      .material(MaterialType.SpiritTile)
      .location(LocationType.SpiritInMountain)
      .player(this.player)
  }
}