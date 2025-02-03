import { PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import isEqual from 'lodash/isEqual'
import uniqBy from 'lodash/uniqBy'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { Spirit } from '../../material/Spirit'
import { Memory } from '../Memory'
import { panoramaLandscapes } from '../PanoramaLandscapes'
import { RuleId } from '../RuleId'
import { SquareHelper } from './SquareHelper'

export class FireflyHelper extends PlayerTurnRule {

  get firefliesCoordinates() {
    return this.remind<XYCoordinates[]>(Memory.Fireflies) ?? []
  }

  get isFireflyExt() {
    return !!this.remind(Memory.FireflyExt)
  }

  afterSpiritEncountered() {
    const ids = this.firefliesCoordinates
    if (this.isFireflyExt) {
      if (ids.length) return [this.startRule(RuleId.PlaceFirefly)]
      if (this.evilBeaver.length) return [this.startRule(RuleId.FireflyEvilBeaver)]
    }

    return []
  }

  get evilBeaver() {
    return this.material(MaterialType.SpiritTile)
      .player(this.player)
      .id(Spirit.EvilBeaver)
  }

  get firefliesStock() {
    return this.material(MaterialType.Firefly).location(LocationType.FireflyStock).deck()
  }

  get placeFireflyMoves() {
    const countFireflies = this.playerFireflies.length
    const coordinates = (this.remind<XYCoordinates[]>(Memory.Fireflies) ?? []).slice(0, 4 - countFireflies)
    const fireflies = this.firefliesStock
    return coordinates.map((c) => fireflies.dealOne({
      type: LocationType.SpiritInMountain,
      player: this.player,
      ...c
    }))
  }

  get playerFireflies() {
    return this.material(MaterialType.Firefly)
      .player(this.player)
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

  recomputeFireflies(landscape: MountainLandscape, placedCoordinates?: XYCoordinates) {
    if (!this.remind(Memory.FireflyExt)) return
    const firefliesPlaces: XYCoordinates[] = []
    const coordinates = this.getCardPositionInPanorama(landscape)!
    const landscapeItem = this.material(MaterialType.LandscapeTile)
      .player(this.player)
      .location(l => l.x === coordinates.x && l.y === coordinates.y)
    const availablePlaces = new SquareHelper(this.game, landscapeItem.getIndex(), { ...coordinates, player: this.player }).spiritInMountainPlaces
    for (const place of availablePlaces) {
      if (!placedCoordinates || !isEqual(place, placedCoordinates)) firefliesPlaces.push(place)
    }


    this.memorize(Memory.Fireflies, (f: XYCoordinates[] = []) => uniqBy([...f, ...firefliesPlaces], JSON.stringify))
  }
}
