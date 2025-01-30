import { Location, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import minBy from 'lodash/minBy'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { Memory } from '../Memory'
import { panoramaLandscapes } from '../PanoramaLandscapes'

export class SquareHelper extends MaterialRulesPart {
  item: MaterialItem
  constructor(game: MaterialGame, readonly itemIndex: number, readonly location: Partial<Location>) {
    super(game)
    this.item = this.material(MaterialType.LandscapeTile).getItem(this.itemIndex)
  }

  get encounterSpiritMoves(): MaterialMove[] {
    const topLeftSquare = this.getTopLeftSquare()
    const bottomLeftSquare = this.getBottomLeftSquare()
    const topRightSquare = this.getTopRightSquare()
    const bottomRightSquare = this.getBottomRightSquare()
    if (topLeftSquare.length === 3 || bottomLeftSquare.length === 3 || topRightSquare.length === 3 || bottomRightSquare.length === 3) {
      const item = this.material(MaterialType.LandscapeTile).getItem(this.itemIndex)
      if (item.id === MountainLandscape.Rainbow) {
        this.memorize(Memory.MustEncounterSpiritOn, (ids = []) => [...ids, panoramaLandscapes[item.location.x!][item.location.y!]])
      } else {
        this.memorize(Memory.MustEncounterSpiritOn, (ids = []) => [...ids, item.id])
      }
    }

    return []
  }

  getTopLeftSquare(ignoreMemory: boolean = false) {
    return this.panorama
      .filter((item) => (
        (item.location.x === (this.location.x! - 1) && item.location.y == this.location.y!) ||
        (item.location.x === (this.location.x! - 1) && item.location.y == (this.location.y! + 1)) ||
        (item.location.x === this.location.x && item.location.y == this.location.y! + 1)
      ))
      .filter((item) => ignoreMemory || !this.actualMustEncounterSpiritOn.includes(item.id))
      .getItems()
  }

  get actualMustEncounterSpiritOn() {
    return this.remind<number[] | undefined>(Memory.MustEncounterSpiritOn) ?? []
  }

  getBottomLeftSquare(ignoreMemory: boolean = false) {
    return this.panorama
      .filter((item) => (
        (item.location.x === this.location.x! && item.location.y == (this.location.y! - 1)) ||
        (item.location.x === (this.location.x! - 1) && item.location.y == (this.location.y! - 1)) ||
        (item.location.x === (this.location.x! - 1) && item.location.y == this.location.y!)
      ))
      .filter((item) => ignoreMemory || !this.actualMustEncounterSpiritOn.includes(item.id))
      .getItems()
  }

  getTopRightSquare(ignoreMemory: boolean = false) {
    return this.panorama
      .filter((item) => (
        (item.location.x === this.location.x! && item.location.y == (this.location.y! + 1)) ||
        (item.location.x === (this.location.x! + 1) && item.location.y == (this.location.y! + 1)) ||
        (item.location.x === (this.location.x! + 1) && item.location.y == this.location.y!)
      ))
      .filter((item) => ignoreMemory || !this.actualMustEncounterSpiritOn.includes(item.id))
      .getItems()
  }

  getBottomRightSquare(ignoreMemory: boolean = false) {
    return this.panorama
      .filter((item) => (
        (item.location.x === (this.location.x! + 1) && item.location.y == this.location.y!) ||
        (item.location.x === (this.location.x! + 1) && item.location.y == (this.location.y! - 1)) ||
        (item.location.x === this.location.x && item.location.y == this.location.y! - 1)
      ))
      .filter((item) => ignoreMemory || !this.actualMustEncounterSpiritOn.includes(item.id))
      .getItems()
  }

  get spiritInMountainPlaces(): XYCoordinates[] {
    const topLeftSquare = this.getTopLeftSquare(true)
    const bottomLeftSquare = this.getBottomLeftSquare(true)
    const topRightSquare = this.getTopRightSquare(true)
    const bottomRightSquare = this.getBottomRightSquare(true)
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
