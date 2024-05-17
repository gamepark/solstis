import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Spirit } from '../material/Spirit'
import { PlayerId } from '../PlayerId'
import { RuleId } from './RuleId'

export class EvilBeaverRule extends PlayerTurnRule {

  onRuleStart() {
    const opponent = this.opponent
    const spirits = this.getSpirits(opponent)
    if (!spirits.length) return this.goToNextRule()
    return []
  }

  getPlayerMoves() {
    const evil = this.evil
    const opponent = this.opponent
    const spirits = this.getSpirits(opponent)
    const moves: MaterialMove[] = []
    if (!evil.length) return []

    for (const spirit of spirits) {
      moves.push(
        evil.moveItem({
          ...spirit.location
        })
      )
    }

    return moves
  }

  get opponent() {
    return this.game.players.find((p) => p !== this.player)!
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return []
    const evil = this.material(MaterialType.SpiritTile).location(LocationType.SpiritInMountain).id(Spirit.EvilBeaver)
    if (evil.length) {
      delete evil.getItem()!.selected
    }
    return this.goToNextRule()
  }

  goToNextRule() {
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
      .player((p) => p !== this.player)
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