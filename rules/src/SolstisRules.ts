import {
  Action,
  CompetitiveScore,
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  isMoveItemType,
  isStartRule,
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
import { BeetleRule } from './rules/effect/BeetleRule'
import { DeerRule } from './rules/effect/DeerRule'
import { DragonflyRule } from './rules/effect/DragonflyRule'
import { EagleRule } from './rules/effect/EagleRule'
import { FishRule } from './rules/effect/FishRule'
import { FoxRule } from './rules/effect/FoxRule'
import { GroundHogRule } from './rules/effect/GroundHogRule'
import { ViperRule } from './rules/effect/ViperRule'
import { EncounterSpiritRule } from './rules/EncounterSpiritRule'
import { EvilBeaverRule } from './rules/EvilBeaverRule'
import { FillQueueGapStrategy } from './rules/FillQueueGapStrategy'
import { FireflyEvilBeaverRule } from './rules/FireflyEvilBeaverRule'
import { PlaceFireflyRule } from './rules/PlaceFireflyRule'
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
    [RuleId.Dragonfly]: DragonflyRule,
    [RuleId.Groundhog]: GroundHogRule,
    [RuleId.Beetle]: BeetleRule,
    [RuleId.Eagle]: EagleRule,
    [RuleId.EvilBeaver]: EvilBeaverRule,
    [RuleId.Squirrel]: SquirrelRule,

    // Firefly ext
    [RuleId.PlaceFirefly]: PlaceFireflyRule,
    [RuleId.FireflyEvilBeaver]: FireflyEvilBeaverRule,
    [RuleId.Viper]: ViperRule,
    [RuleId.Fox]: FoxRule
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
    },
    [MaterialType.Firefly]: {
      [LocationType.FireflyStock]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.LandscapeTile]: {
      [LocationType.LandscapeDeck]: hideItemId,
      [LocationType.LandscapeQueue]: (item: MaterialItem) => !!item.location?.rotation ? ['id'] : [],
      [LocationType.Hand]: hideItemIdToOthersWhenNotRotated,
    },
    [MaterialType.SpiritTile]: {
      [LocationType.SpiritDeck]: hideItemId,
      [LocationType.Hand]: hideItemIdToOthers
    }
  }

  canUndo(action: Action<MaterialMove>, consecutiveActions: Action[]): boolean {
    if (isMoveItemType(MaterialType.LandscapeTile)(action.move)
      && action.move.location.type === LocationType.PlayArea
      && !consecutiveActions.length
      && action.consequences.every((move) => isStartRule(move) && move.id === RuleId.Capture)
    ) return true
    return super.canUndo(action, consecutiveActions)
  }

  getScore(playerId: PlayerId): number {
    return new ScoringHelper(this.game, playerId).score
  }

  giveTime(): number {
    return 60
  }
}

export const hideItemIdToOthersWhenNotRotated = <P extends number = number, L extends number = number>(
  item: MaterialItem<P, L>, player?: P
): string[] => (item.location.player === player || item.location.rotation) ? [] : ['id']
