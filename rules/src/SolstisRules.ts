import { FillGapStrategy, hideItemId, hideItemIdToOthers, MaterialItem, PositiveSequenceStrategy, SecretMaterialRules } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { CaptureRule } from './rules/CaptureRule'
import { EncounterSpiritRule } from './rules/EncounterSpiritRule'
import { FillQueueGapStrategy } from './rules/FillQueueGapStrategy'
import { PlaceRainbowRule } from './rules/PlaceRainbowRule'
import { RefillHandRule } from './rules/RefillHandRule'
import { RuleId } from './rules/RuleId'
import { SecondChanceRule } from './rules/SecondChanceRule'
import { SelectHandTileRule } from './rules/SelectHandTileRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class SolstisRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {
  rules = {
    [RuleId.SelectHandTile]: SelectHandTileRule,
    [RuleId.Capture]: CaptureRule,
    [RuleId.SecondChance]: SecondChanceRule,
    [RuleId.PlaceRainbow]: PlaceRainbowRule,
    [RuleId.RefillHand]: RefillHandRule,
    [RuleId.EncounterSpirit]: EncounterSpiritRule
  }

  locationsStrategies = {
    [MaterialType.LandscapeTile]: {
      [LocationType.LandscapeDeck]: new FillGapStrategy(),
      [LocationType.RainbowDeck]: new PositiveSequenceStrategy(),
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.LandscapeQueue]: new FillQueueGapStrategy()
    },
    [MaterialType.SpiritTile]: {
      [LocationType.SpiritDeck]: new PositiveSequenceStrategy(),
      [LocationType.SpiritLine]: new PositiveSequenceStrategy(),
      [LocationType.Hand]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.LandscapeTile]: {
      [LocationType.LandscapeDeck]: hideItemId,
      [LocationType.LandscapeQueue]: (item: MaterialItem) => !!item.location?.rotation ? ['id'] : [],
      [LocationType.Hand]: hideItemIdToOthers,
    },
    [MaterialType.SpiritTile]: {
      [LocationType.SpiritDeck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers
    }
  }
}