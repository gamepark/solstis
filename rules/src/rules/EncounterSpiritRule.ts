import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Spirit } from '../material/Spirit'
import { CustomMoveType } from './CustomMoveType'
import { SquareHelper } from './helper/SquareHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EncounterSpiritRule extends PlayerTurnRule {

  onRuleStart() {
    const spiritLine = this.spiritLine
    if (spiritLine.length) return []
    return [
      this.rules().customMove(CustomMoveType.DrawSpirits)
    ]
  }

  get drawSpirits() {
    return [
      ...this.spiritDeck.limit(2).moveItems({
        type: LocationType.Hand,
        player: this.player
      })
    ]

  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const hasChosenASpirit = this.hasChosenASpirit

    const hand = this.hand
    if (!hand.length) {
      return [
        this.rules().customMove(CustomMoveType.DrawSpirits),
        ...this.getCardToPanoramaMoves(this.spiritLine)
      ]
    }


    const evil = hand.id((id) => id === Spirit.Evil)
    if (!hasChosenASpirit && !evil.length) {
      return [
        ...this.hand.moveItems({
          type: LocationType.SpiritLine
        })
      ]
    }

    return this.getCardToPanoramaMoves(hand)
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.DrawSpirits)(move)) return []
    return this.drawSpirits
  }

  getCardToPanoramaMoves(material: Material) {
    const moves: MaterialMove[] = []
    const lastLandscapePlaced = this.lastLandscapePlaced
    const places = new SquareHelper(this.game, lastLandscapePlaced.getIndex(), lastLandscapePlaced.getItem()!.location).encounterPlaces
    for (const place of places) {
      const cards = material.id((id) => id !== Spirit.Evil)
      moves.push(
        ...cards.moveItems({
          type: LocationType.SpiritInMountain,
          player: this.player,
          id: place
        })
      )
    }

    return moves
  }

  get encounterChoice() {
    return this.remind(Memory.EncounterChoice)
  }

  get lastLandscapePlaced() {
    const id = this.remind(Memory.MustEncounterSpiritOn)
    return this.material(MaterialType.LandscapeTile).location(LocationType.Panorama).player(this.player).id(id)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return []
    if (move.location.type !== LocationType.SpiritInMountain) return []
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

  get spiritLine() {
    return this
      .material(MaterialType.SpiritTile)
      .location(LocationType.SpiritLine)
  }

  // TODO: after encourtering a spirit
  // Always go back to capture

  get spiritDeck() {
    return this.material(MaterialType.SpiritTile)
      .location(LocationType.SpiritDeck)
      .sort((item) => -item.location.x!)
  }

  onRuleEnd() {
    this.forget(Memory.MustEncounterSpiritOn)
    this.memorize(Memory.SpiritEncountered, true)
    return []
  }
}