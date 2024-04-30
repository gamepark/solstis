import { Location, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import minBy from 'lodash/minBy'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class SquareHelper extends MaterialRulesPart {
  item: MaterialItem
  constructor(game: MaterialGame, readonly itemIndex: number, readonly location: Partial<Location>) {
    super(game)
    this.item = this.material(MaterialType.LandscapeTile).getItem(this.itemIndex)!
  }

  get encounterSpiritMoves(): MaterialMove[] {
    if (this.remind(Memory.SpiritEncountered)) return []
    const topLeftSquare = this.topLeftSquare
    const bottomLeftSquare = this.bottomLeftSquare
    const topRightSquare = this.topRightSquare
    const bottomRightSquare = this.bottomRightSquare
    if (topLeftSquare.length === 3 || bottomLeftSquare.length === 3 || topRightSquare.length === 3 || bottomRightSquare.length === 3) {
      const item = this.material(MaterialType.LandscapeTile).getItem(this.itemIndex)!
      this.memorize(Memory.MustEncounterSpiritOn, item.id)
      return [this.rules().startRule(RuleId.EncounterSpirit)]
    }

    return []
  }

  get topLeftSquare() {
    return this.panorama
      .filter((item) => (
        (item.location.x === (this.location.x! - 1) && item.location.y == this.location.y!) ||
        (item.location.x === (this.location.x! - 1) && item.location.y == (this.location.y! + 1)) ||
        (item.location.x === this.location.x && item.location.y == this.location.y! + 1)
      )).getItems()
  }

  get bottomLeftSquare() {
    return this.panorama
      .filter((item) => (
        (item.location.x === this.location.x! && item.location.y == (this.location.y! - 1)) ||
        (item.location.x === (this.location.x! - 1) && item.location.y == (this.location.y! - 1)) ||
        (item.location.x === (this.location.x! - 1) && item.location.y == this.location.y!)
      )).getItems()
  }

  get topRightSquare() {
    return this.panorama
      .filter((item) => (
        (item.location.x === this.location.x! && item.location.y == (this.location.y! + 1)) ||
        (item.location.x === (this.location.x! + 1) && item.location.y == (this.location.y! + 1)) ||
        (item.location.x === (this.location.x! + 1) && item.location.y == this.location.y!)
      )).getItems()
  }

  get bottomRightSquare() {
    return this.panorama
      .filter((item) => (
        (item.location.x === (this.location.x! + 1) && item.location.y == this.location.y!) ||
        (item.location.x === (this.location.x! + 1) && item.location.y == (this.location.y! - 1)) ||
        (item.location.x === this.location.x && item.location.y == this.location.y! - 1)
      )).getItems()
  }

  get encounterPlaces(): XYCoordinates[] {
    const topLeftSquare = this.topLeftSquare
    const bottomLeftSquare = this.bottomLeftSquare
    const topRightSquare = this.topRightSquare
    const bottomRightSquare = this.bottomRightSquare
    const coordinates: XYCoordinates[] = []


    if (topLeftSquare.length === 3) coordinates.push(this.getBasePositionItemId(topLeftSquare))
    if (bottomLeftSquare.length === 3) coordinates.push(this.getBasePositionItemId(bottomLeftSquare))
    if (topRightSquare.length === 3) coordinates.push(this.getBasePositionItemId(topRightSquare))
    if (bottomRightSquare.length === 3) coordinates.push(this.getBasePositionItemId(bottomRightSquare))

    return coordinates
  }

  getBasePositionItemId(items: MaterialItem[]) {
    const allItems: MaterialItem[] = [...items, this.item]
    const coordinates = minBy(allItems, (i) => i.location.x! + i.location.y!)!
    return {
      x: coordinates.location.x!,
      y: coordinates.location.y!
    }
  }

  get panorama() {
    return this.material(MaterialType.LandscapeTile).location(LocationType.Panorama).player(this.location.player)
  }
}