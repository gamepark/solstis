import {
  CompetitiveScore,
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { CaptureRule } from './rules/CaptureRule'
import { BearRule } from './rules/effect/BearRule'
import { BeaverRule } from './rules/effect/BeaverRule'
import { BeetleRule } from './rules/effect/BeetleRule'
import { DeerRule } from './rules/effect/DeerRule'
import { EagleRule } from './rules/effect/EagleRule'
import { FishRule } from './rules/effect/FishRule'
import { MoskitoRule } from './rules/effect/MoskitoRule'
import { EncounterSpiritRule } from './rules/EncounterSpiritRule'
import { EvilRule } from './rules/EvilRule'
import { FillQueueGapStrategy } from './rules/FillQueueGapStrategy'
import { PlaceRainbowRule } from './rules/PlaceRainbowRule'
import { RefillHandRule } from './rules/RefillHandRule'
import { RuleId } from './rules/RuleId'
import { ScoringHelper } from './rules/scoring/ScoringHelper'
import { SquirrelRule } from './rules/scoring/SquirrelRule'
import { SecondChanceRule } from './rules/SecondChanceRule'
import { SelectHandTileRule } from './rules/SelectHandTileRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class SolstisRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
    TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>  {
  rules = {
    [RuleId.SelectHandTile]: SelectHandTileRule,
    [RuleId.Capture]: CaptureRule,
    [RuleId.SecondChance]: SecondChanceRule,
    [RuleId.PlaceRainbow]: PlaceRainbowRule,
    [RuleId.RefillHand]: RefillHandRule,
    [RuleId.EncounterSpirit]: EncounterSpiritRule,
    [RuleId.Fish]: FishRule,
    [RuleId.Deer]: DeerRule,
    [RuleId.Bear]: BearRule,
    [RuleId.Moskito]: MoskitoRule,
    [RuleId.Beaver]: BeaverRule,
    [RuleId.Beetle]: BeetleRule,
    [RuleId.Eagle]: EagleRule,
    [RuleId.Evil]: EvilRule,
    [RuleId.Squirrel]: SquirrelRule,
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

  getScore(playerId: PlayerId): number {
    return new ScoringHelper(this.game, playerId).score
  }

  giveTime(): number {
    return 60
  }
}