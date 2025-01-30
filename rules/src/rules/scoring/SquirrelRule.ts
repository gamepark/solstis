import { isDeleteItemType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import equal from 'fast-deep-equal'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { FireflyHelper } from '../helper/FireflyHelper'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { panoramaLandscapes } from '../PanoramaLandscapes'

export class SquirrelRule extends PlayerTurnRule {

  onRuleStart() {
    const moves: MaterialMove[] = new PlaceCardHelper(this.game).getPlayCardMove(this.hand)
    if (!moves.length) {
      return [this.endGame()]
    }

    return moves
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const playArea = this.playAreaCard
    if (!playArea.length) return new PlaceCardHelper(this.game).getPlayCardMove(this.hand)
    return new PlaceCardHelper(this.game).getPlayCardMove(this.playAreaCard)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move) && !isDeleteItemType(MaterialType.LandscapeTile)) return []

    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.LandscapeTile)(move)) {
      const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)

      const realId = item.id === MountainLandscape.Rainbow ? panoramaLandscapes[item.location.x!][item.location.y!] : item.id
      new FireflyHelper(this.game).recomputeFireflies(realId)


      if (item.id !== MountainLandscape.Rainbow) {
        const rainbowOnPlace = this
          .material(MaterialType.LandscapeTile)
          .location((l) => equal(l, item.location))
          .id(MountainLandscape.Rainbow)

        moves.push(
          ...rainbowOnPlace.moveItems({
            type: LocationType.PlayArea,
            player: this.player
          })
        )
      }
    }

    if (!moves.length && !this.hand.length && !this.playAreaCard.length) {
      const afterEncounterMoves = new FireflyHelper(this.game).afterSpiritEncountered()
      if (afterEncounterMoves.length) {
        return afterEncounterMoves
      }

      return [this.endGame()]
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
