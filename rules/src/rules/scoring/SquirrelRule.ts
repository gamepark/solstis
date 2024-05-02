import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'

export class SquirrelRule extends PlayerTurnRule {

  onRuleStart() {
    const moves: MaterialMove[] = new PlaceCardHelper(this.game).getPlayCardMove(this.hand)
    if (!moves.length) {
      return [this.rules().endGame()]
    }

    return moves
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const playArea = this.playAreaCard
    if (!playArea.length) return []
    return new PlaceCardHelper(this.game).getPlayCardMove(this.playAreaCard)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move)) return []
    const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)!
    if (item.id === MountainLandscape.Rainbow) return []
    const rainbowOnPlace = this
      .material(MaterialType.LandscapeTile)
      .location((l) => equal(l, item.location))
      .id(MountainLandscape.Rainbow)

    const moves: MaterialMove[] = rainbowOnPlace.moveItems({
      type: LocationType.PlayArea,
      player: this.player
    })

    if (!moves.length && !this.hand.length && !this.playAreaCard.length) {
      return [this.rules().endGame()]
    }

    return moves
  }

  get hand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.player)
  }

  get playAreaCard() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.PlayArea)
      .player(this.player)
  }
}