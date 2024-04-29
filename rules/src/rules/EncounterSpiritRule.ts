import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SquareHelper } from './helper/SquareHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EncounterSpiritRule extends PlayerTurnRule {

  onRuleStart() {
    const spiritDeck = this.spirits
    return [
      ...spiritDeck.limit(2).moveItems({
        type: LocationType.Hand,
        player: this.player
      })
    ]
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const hasChosenASpirit = this.hasChosenASpirit
    const moves: MaterialMove[] = []

    if (!hasChosenASpirit) {
      moves.push(
        ...this.hand.moveItems({
          type: LocationType.SpiritLine
        })
      )
    } else {
      const lastLandscapePlaced = this.lastLandscapePlaced
      const places = new SquareHelper(this.game, lastLandscapePlaced.getIndex(), lastLandscapePlaced.getItem()!.location).encounterPlaces
      for (const place of places) {
        moves.push(
          ...this.hand.moveItems({
            type: LocationType.SpiritInMountain,
            player: this.player,
            id: place
          })
        )
      }
    console.log(places)

    }

    return moves
  }

  get lastLandscapePlaced() {
    const id = this.remind(Memory.MustEncounterSpiritOn)
    return this.material(MaterialType.LandscapeTile).location(LocationType.Panorama).player(this.player).id(id)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SpiritTile)(move) || move.location.type !== LocationType.SpiritInMountain) return []
    return [
      this.rules().startRule(RuleId.Capture)
    ]
  }

  get hasChosenASpirit() {
    return this.hand.length === 1
  }

  get hand() {
    return this.material(MaterialType.SpiritTile).location(LocationType.Hand)
  }

  // TODO: after encourtering a spirit
  // Always go back to capture

  get spirits() {
    return this.material(MaterialType.SpiritTile).location(LocationType.SpiritDeck).sort((item) => -item.location.x!)
  }

  onRuleEnd() {
    this.forget(Memory.MustEncounterSpiritOn)
    this.memorize(Memory.SpiritEncountered, true)
    return []
  }
}