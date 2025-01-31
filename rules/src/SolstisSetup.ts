import { MaterialGameSetup } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { MountainLandscape, mountainLandscapes } from './material/MountainLandscape'
import { isFireflyExt, Spirit, spirits } from './material/Spirit'
import { PlayerId } from './PlayerId'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'
import { SolstisOptions } from './SolstisOptions'
import { SolstisRules } from './SolstisRules'

/**
 * This class creates a new Game based on the game options
 */
export class SolstisSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, SolstisOptions> {
  Rules = SolstisRules

  setupMaterial(options: SolstisOptions) {
    this.setupLandscapes()
    this.setupRainbows()
    this.setupQueue()
    this.setupSpirits(options)
    this.setupPlayers(options)
    this.setupFirefly(options)
  }

  setupFirefly(options: SolstisOptions) {
    if (!options.firefly) return
    this.memorize(Memory.FireflyExt, true)
    for (let i = 0; i < 7; i++) {
      this.material(MaterialType.Firefly)
        .createItem({
          location: {
            type: LocationType.FireflyStock
          }
        })
    }
  }

  setupLandscapes() {
    const landscapes = mountainLandscapes
      .filter(l => l !== MountainLandscape.Rainbow)
      .map((id) => ({
        id: id,
        location: {
          type: LocationType.LandscapeDeck
        }
      }))

    this.material(MaterialType.LandscapeTile).createItems(landscapes)
    this.material(MaterialType.LandscapeTile).shuffle()
  }

  setupQueue() {
    const deck = this.material(MaterialType.LandscapeTile).location(LocationType.LandscapeDeck).deck()
    for (let x = 0; x < 6; x++) {
      deck.dealOne({ type: LocationType.LandscapeQueue, x, z: 0, rotation: true })
      deck.dealOne({ type: LocationType.LandscapeQueue, x, z: 1})
    }
  }

  setupRainbows() {
    const rainbows = Array.from(Array(12)).map((_) => ({
      id: MountainLandscape.Rainbow,
      location: {
        type: LocationType.RainbowDeck
      }
    }))

    this.material(MaterialType.LandscapeTile).createItems(rainbows)
  }

  setupSpirits(options: SolstisOptions) {
    const filteredSpirit = this.getSpiritForGame(options)
    const items = filteredSpirit.map((s) => ({
      id: s,
      location: {
        type: LocationType.SpiritDeck
      }
    }))

    this.material(MaterialType.SpiritTile).createItems(items)
    this.material(MaterialType.SpiritTile).shuffle()
  }

  getSpiritForGame(options: SolstisOptions) {
    if (options.beginner) return spirits.filter((s) => !isFireflyExt(s) && s !== Spirit.Eagle)
    if (!options.firefly) return spirits.filter((s) => !isFireflyExt(s))
    return spirits
  }

  start() {
    this.startPlayerTurn(RuleId.SelectHandTile, this.game.players[0])
  }

  setupPlayers(options: SolstisOptions) {
    const deck = this.material(MaterialType.LandscapeTile).location(LocationType.LandscapeDeck).deck()
    for (let player = 1; player <= options.players; player++) {
      deck.deal({
        type: LocationType.Hand,
        player
      }, 3)
    }

  }
}
