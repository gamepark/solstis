import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Spirit } from '../material/Spirit'
import { PlayerId } from '../PlayerId'
import { RuleId } from './RuleId'

export class EvilRule extends PlayerTurnRule {

  getPlayerMoves() {
    const evil = this.evil
    const spirits = this.getSpirits(this.player)
    const moves: MaterialMove[] = []
    if (!evil.length) return []

    for (const spirit of spirits) {
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
    for (const player of this.game.players) {
      const spirits = this.getSpirits(player)
      if (spirits.some((s) => s.id === Spirit.Squirrel)) return [this.rules().startPlayerTurn(RuleId.Squirrel, player)]
    }

    return [this.rules().endGame()]
  }

  get evil() {
    return this
      .material(MaterialType.SpiritTile)
      .location(LocationType.Evil)
      .player(this.player)
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