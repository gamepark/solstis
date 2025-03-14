/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/solstis/rules/RuleId'
import { ComponentType } from 'react'
import { BearHeader } from './BearHeader'
import { BeetleHeader } from './BeetleHeader'
import { CaptureHeader } from './CaptureHeader'
import { DeerHeader } from './DeerHeader'
import { DragonflyHeader } from './DragonflyHeader'
import { EagleHeader } from './EagleHeader'
import { EncounterSpiritHeader } from './EncounterSpiritHeader'
import { EvilBeaverHeader } from './EvilBeaverHeader'
import { FireflyEvilBeaverHeader } from './FireflyEvilBeaverHeader'
import { FishHeader } from './FishHeader'
import { FoxHeader } from './FoxHeader'
import { PlaceFireflyHeader } from './PlaceFireflyHeader'
import { PlaceRainbowHeader } from './PlaceRainbowHeader'
import { RefillHandHeader } from './RefillHandHeader'
import { SecondChanceHeader } from './SecondChanceHeader'
import { SelectHandTileHeader } from './SelectHandTileHeader'
import { SquirrelHeader } from './SquirrelHeader'
import { ViperHeader } from './ViperHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.SelectHandTile]: SelectHandTileHeader,
  [RuleId.Capture]: CaptureHeader,
  [RuleId.SecondChance]: SecondChanceHeader,
  [RuleId.PlaceRainbow]: PlaceRainbowHeader,
  [RuleId.EncounterSpirit]: EncounterSpiritHeader,
  [RuleId.RefillHand]: RefillHandHeader,
  [RuleId.Fish]: FishHeader,
  [RuleId.Deer]: DeerHeader,
  [RuleId.Eagle]: EagleHeader,
  [RuleId.Bear]: BearHeader,
  [RuleId.Dragonfly]: DragonflyHeader,
  [RuleId.Beetle]: BeetleHeader,
  [RuleId.EvilBeaver]: EvilBeaverHeader,
  [RuleId.Squirrel]: SquirrelHeader,

  // Firefly ext
  [RuleId.PlaceFirefly]: PlaceFireflyHeader,
  [RuleId.Fox]: FoxHeader,
  [RuleId.Viper]: ViperHeader,
  [RuleId.FireflyEvilBeaver]: FireflyEvilBeaverHeader,
}
