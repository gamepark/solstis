import { MaterialGameSetup } from '@gamepark/rules-api'
import { SolstisOptions } from './SolstisOptions'
import { SolstisRules } from './SolstisRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class SolstisSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, SolstisOptions> {
  Rules = SolstisRules

  setupMaterial(_options: SolstisOptions) {
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}