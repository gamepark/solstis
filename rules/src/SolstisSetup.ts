import { MaterialGameSetup } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { MountainLandscape, mountainLandscapes } from './material/MountainLandscape'
import { PlayerId } from './PlayerId'
import { RuleId } from './rules/RuleId'
import { SolstisOptions } from './SolstisOptions'
import { SolstisRules } from './SolstisRules'

/**
 * This class creates a new Game based on the game options
 */
export class SolstisSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, SolstisOptions> {
  Rules = SolstisRules

  setupMaterial(_options: SolstisOptions) {
    this.setupLandscapes()
    this.setupRainbows()
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

  setupRainbows() {
    const rainbows = Array.from(Array(12)).map((_) => ({
      id: MountainLandscape.Rainbow,
      location: {
        type: LocationType.RainbowDeck
      }
    }))

    this.material(MaterialType.LandscapeTile).createItems(rainbows)
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}