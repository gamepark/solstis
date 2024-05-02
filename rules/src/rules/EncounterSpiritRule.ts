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
    if (!this.availableLandscapes) return [this.rules().startRule(RuleId.RefillHand)]
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

    const hand = this.hand
    if (!hand.length) {
      return [
        this.rules().customMove(CustomMoveType.DrawSpirits),
        ...this.getCardToPanoramaMoves(this.spiritLine)
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
    const availableLandscapes = this.availableLandscapes!

    for (const landscapeIndex of availableLandscapes.getIndexes()) {
      const item = availableLandscapes.getItem(landscapeIndex)!
      const places = new SquareHelper(this.game, landscapeIndex, item.location).encounterPlaces
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
    }


    return moves
  }

  get availableLandscapes(): Material | undefined {
    const ids = this.remind(Memory.MustEncounterSpiritOn)
    if (!ids?.length) return
    const landscapes = this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
      .id((id) => ids.includes(id))

    if (!landscapes.length) return
    return landscapes
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return []
    if (move.location.type !== LocationType.SpiritInMountain) return []
    const spirit = this.material(MaterialType.SpiritTile).index(move.itemIndex)
    const spiritItem = spirit.getItem()!
    const moves: MaterialMove[] = []

    console.log("???")
    moves.push(...this.evilMoves)
    moves.push(
      ...this.hand
      .id((id) => id !== Spirit.Evil)
      .moveItems({ type: LocationType.SpiritLine})
    )

    const effect = this.getSpiritEffect(spiritItem.id)
    if (effect) {
      moves.push(this.rules().startRule(effect))
      return moves
    }

    moves.push(this.rules().startRule(RuleId.RefillHand))
    return moves
  }

  getSpiritEffect(id: Spirit) {
    switch (id) {
      case Spirit.Fish: return RuleId.Fish
      case Spirit.Deer: return RuleId.Deer
      case Spirit.Eagle: return RuleId.Eagle
      case Spirit.Bear: return RuleId.Bear
      case Spirit.Moskito: return RuleId.Moskito
      case Spirit.Beetle: return RuleId.Beetle
      case Spirit.Beaver: return RuleId.Beaver
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

  get spiritDeck() {
    return this.material(MaterialType.SpiritTile)
      .location(LocationType.SpiritDeck)
      .sort((item) => -item.location.x!)
  }

  onRuleEnd() {
    this.forget(Memory.MustEncounterSpiritOn)
    return []
  }
}