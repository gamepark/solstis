import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { Spirit } from '../../material/Spirit'
import { PlayerId } from '../../PlayerId'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'

export class SquirrelRule extends PlayerTurnRule {

  onRuleStart() {
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      const spirits = this.getSpirits(player)
      if (!spirits.some((item) => item.id === Spirit.Squirrel)) continue
      moves.push(
        ...new PlaceCardHelper(this.game).getPlayCardMove(this.getHand(player))
      )
    }

    if (!moves.length) {
      return [this.rules().endGame()]
    }

    return moves
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const playArea = this.playAreaCard
    if (!playArea.length) return []
    return new PlaceCardHelper(this.game).getPlayCardMove(playArea)
  }

  afterItemMove(move: ItemMove) {
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

    if (moves.length === 0) {
      return [this.rules().endGame()]
    }

    return moves
  }

  getHand(player: PlayerId) {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(player)
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

  get playAreaCard() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.PlayArea)
      .player(this.player)
  }
}