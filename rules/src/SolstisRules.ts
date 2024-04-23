import { hideItemId, hideItemIdToOthers, MaterialItem, PositiveSequenceStrategy, SecretMaterialRules } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { SelectHandTileRule } from './rules/SelectHandTileRule'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class SolstisRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {
  rules = {
    [RuleId.SelectHandTile]: SelectHandTileRule
  }

  locationsStrategies = {
    [MaterialType.LandscapeTile]: {
      [LocationType.LandscapeDeck]: new PositiveSequenceStrategy(),
      [LocationType.RainbowDeck]: new PositiveSequenceStrategy(),
      [LocationType.Hand]: new PositiveSequenceStrategy()
    },
    [MaterialType.SpiritTile]: {
      [LocationType.SpiritDeck]: new PositiveSequenceStrategy(),
      [LocationType.SpiritLine]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.LandscapeTile]: {
      [LocationType.LandscapeDeck]: hideItemId,
      [LocationType.LandscapeQueue]: (item: MaterialItem) => !!item.location?.rotation ? ['id'] : [],
      [LocationType.Hand]: hideItemIdToOthers,
    },
    [MaterialType.SpiritTile]: {
      [LocationType.SpiritDeck]: hideItemId
    }
  }
}