import { DeckLocator, Locator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { PlayerId } from '@gamepark/solstis/PlayerId'
import { cardCharacteristicLocator } from './CardCharacteristicLocator'
import { evilLocator } from './EvilLocator'
import { fireflyStackLocator } from './FireflyStackLocator'
import { landscapeDeckLocator } from './LandscapeDeckLocator'
import { landscapeQueueLocator } from './LandscapeQueueLocator'
import { panoramaLocator } from './PanoramaLocator'
import { playAreaLocator } from './PlayAreaLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { rainbowDeckLocator } from './RainbowDeckLocator'
import { spiritInMountainLocator } from './SpiritInMountainLocator'
import { spiritLineLocator } from './SpiritLineLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.LandscapeDeck]: landscapeDeckLocator,
  [LocationType.RainbowDeck]: rainbowDeckLocator,
  [LocationType.Panorama]: panoramaLocator,
  [LocationType.LandscapeQueue]: landscapeQueueLocator,
  [LocationType.SpiritDeck]: new DeckLocator({ coordinates: { x: 18, y: -22 }, limit: 10 }),
  [LocationType.SpiritLine]: spiritLineLocator,
  [LocationType.Hand]: playerHandLocator,
  [LocationType.PlayArea]: playAreaLocator,
  [LocationType.SpiritInMountain]: spiritInMountainLocator,
  [LocationType.Evil]: evilLocator,
  [LocationType.Characteristics]: cardCharacteristicLocator,
  [LocationType.FireflyStock]: fireflyStackLocator

}
