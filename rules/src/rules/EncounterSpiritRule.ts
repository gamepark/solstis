import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MountainLandscape } from '../material/MountainLandscape'
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
    for (const coordinates of places) {
      const cards = material.id((id) => id !== Spirit.Evil)
      moves.push(
        ...cards.moveItems({
          type: LocationType.SpiritInMountain,
          player: this.player,
          ...coordinates
        })
      )
    }

    return moves
  }

  get lastLandscapePlaced() {
    const id = this.remind(Memory.MustEncounterSpiritOn)
    return this.material(MaterialType.LandscapeTile).location(LocationType.Panorama).player(this.player).id(id)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return []
    if (move.location.type !== LocationType.SpiritInMountain) return []
    const id = this.remind(Memory.MustEncounterSpiritOn)
    const spirit = this.material(MaterialType.SpiritTile).index(move.itemIndex)
    const spiritItem = spirit.getItem()!
    const moves: MaterialMove[] = []

    moves.push(...this.evilMoves)

    const effect = this.getSpiritEffect(spiritItem.id)
    if (effect) {
      moves.push(this.rules().startRule(effect))
      return moves
    }

    moves.push(this.rules().startRule(id === MountainLandscape.Rainbow ? RuleId.RefillHand : RuleId.Capture))
    return moves
  }

  getSpiritEffect(id: Spirit) {
    switch (id) {
      case Spirit.Fish: return RuleId.FishRule
      case Spirit.Deer: return RuleId.DeerRule
      case Spirit.Eagle: return RuleId.EagleRule
      case Spirit.Bear: return RuleId.BearRule
      case Spirit.Moskito: return RuleId.MoskitoRule
      case Spirit.Beetle: return RuleId.BeetleRule
      case Spirit.Beaver: return RuleId.BeaverRule
    }
    
    return
  }

  get evilMoves() {
    const moves: MaterialMove[] = []
    const hasEvilInHand = this
      .material(MaterialType.SpiritTile)
      .location(LocationType.Hand)
      .player(this.player)
      .id(Spirit.Evil)

    if (hasEvilInHand.length) {
      moves.push(hasEvilInHand.moveItem({ type: LocationType.Evil, player: this.player }))
    } else {
      const otherPlayerEvil = this
        .material(MaterialType.SpiritTile)
        .location(LocationType.Evil)
        .player((p) => p !== this.player)
      if (otherPlayerEvil.length) {
        moves.push(otherPlayerEvil.moveItem({ type: LocationType.Evil, player: this.player }))
      }
    }

    return moves
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