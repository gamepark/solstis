import { hideItemId, PositiveSequenceStrategy, SecretMaterialRules } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class SolstisRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {
  rules = {
    [RuleId.PlayerTurn]: PlayerTurn
  }

  locationsStrategies = {
    [MaterialType.LandscapeTile]: {
      [LocationType.LandscapeDeck]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.LandscapeTile]: {
      [LocationType.LandscapeDeck]: hideItemId
    }
  }
}