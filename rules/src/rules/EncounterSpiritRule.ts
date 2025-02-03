import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, Location, Material, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MountainLandscape } from '../material/MountainLandscape'
import { Spirit } from '../material/Spirit'
import { CustomMoveType } from './CustomMoveType'
import { FireflyHelper } from './helper/FireflyHelper'
import { SquareHelper } from './helper/SquareHelper'
import { Memory } from './Memory'
import { panoramaLandscapes } from './PanoramaLandscapes'
import { RuleId } from './RuleId'

export class EncounterSpiritRule extends PlayerTurnRule {

  onRuleStart() {
    const spiritLine = this.spiritLine
    if (this.hand.length) return []
    if (!this.availableLandscapes) return [this.startRule(RuleId.RefillHand)]
    if (spiritLine.length) return []

    return [
      this.customMove(CustomMoveType.DrawSpirits)
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
        this.customMove(CustomMoveType.DrawSpirits),
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
    const availableLandscapes = this.availableLandscapes
    if (!availableLandscapes) return []

    for (const landscapeIndex of availableLandscapes.getIndexes()) {
      const item = availableLandscapes.getItem(landscapeIndex)
      const places = new SquareHelper(this.game, landscapeIndex, item.location).spiritInMountainPlaces
      for (const coordinates of places) {
        const cards = material.id((id) => id !== Spirit.EvilBeaver)
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
    const ids = this.landscapeIdsForSpirit
    if (!ids?.length) return
    const landscapes = this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
      .location((l) => ids.some((id: MountainLandscape) => this.isInThisLocation(id, l)))
    if (!landscapes.length) return
    return landscapes
  }

  isInThisLocation(id: MountainLandscape, location: Location) {

    const coordinates = this.getCardPositionInPanorama(id)!
    return location.x === coordinates.x && location.y === coordinates.y
  }


  getCardPositionInPanorama(id: MountainLandscape) {
    for (let columnIndex = 0; columnIndex < panoramaLandscapes.length; columnIndex++) {
      const column = panoramaLandscapes[columnIndex]
      for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
        if (column[rowIndex] === id) {
          return { x: columnIndex, y: rowIndex }
        }
      }
    }

    return
  }

  get landscapeIdsForSpirit() {
    return this.remind<MountainLandscape[]>(Memory.MustEncounterSpiritOn) ?? []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return []
    if (move.location.type !== LocationType.SpiritInMountain) return []
    this.persistFirefliesPlaces(move)
    const spirit = this.material(MaterialType.SpiritTile).index(move.itemIndex)
    const spiritItem = spirit.getItem()!
    delete spiritItem.selected
    const moves: MaterialMove[] = []

    if (!this.remind(Memory.FireflyExt)) moves.push(...this.evilMoves)

    moves.push(
      ...this.hand
      .id((id) => id !== Spirit.EvilBeaver)
      .moveItems({ type: LocationType.SpiritLine})
    )

    const effect = this.getSpiritEffect(spiritItem.id)
    if (effect) {
      moves.push(this.startRule(effect))
      return moves
    }

    const afterEncounterMoves = new FireflyHelper(this.game).afterSpiritEncountered()
    if (afterEncounterMoves.length) {
      moves.push(...afterEncounterMoves)
    } else {
      moves.push(this.startRule(RuleId.RefillHand))
    }
    return moves
  }

  getSpiritEffect(id: Spirit) {
    switch (id) {
      case Spirit.Fish: return RuleId.Fish
      case Spirit.Deer: return RuleId.Deer
      case Spirit.Eagle: return RuleId.Eagle
      case Spirit.Bear: return RuleId.Bear
      case Spirit.Dragonfly: return RuleId.Dragonfly
      case Spirit.Beetle: return RuleId.Beetle
      case Spirit.Groundhog: return RuleId.Groundhog
      case Spirit.Viper: return RuleId.Viper
      case Spirit.Fox: return RuleId.Fox
    }
    
    return
  }

  get evilMoves() {
    const moves: MaterialMove[] = []
    const hasEvilInHand = this
      .material(MaterialType.SpiritTile)
      .location(LocationType.Hand)
      .player(this.player)
      .id(Spirit.EvilBeaver)

    if (hasEvilInHand.length) {
      moves.push(hasEvilInHand.moveItem({ type: LocationType.Evil, player: this.player }))
    } else {
      const possessedEvil = this
        .material(MaterialType.SpiritTile)
        .location(LocationType.Evil)
        .player(this.player)
      if (possessedEvil.length) {
        moves.push(possessedEvil.moveItem({
          type: LocationType.Evil,
          player: this.game.players.find((p) => this.player !== p)
        }))
      }
    }

    return moves
  }

  get hand() {
    return this.material(MaterialType.SpiritTile).location(LocationType.Hand).player(this.player)
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
    if (!this.landscapeIdsForSpirit.length) this.forget(Memory.MustEncounterSpiritOn)
    return []
  }

  private persistFirefliesPlaces(move: MoveItem) {
    const spiritCoordinates = {
      x: move.location.x!,
      y: move.location.y!
    }

    for (const landscape of this.landscapeIdsForSpirit) {
      new FireflyHelper(this.game).recomputeFireflies(landscape, spiritCoordinates)
    }
    this.forget(Memory.MustEncounterSpiritOn)
  }
}
