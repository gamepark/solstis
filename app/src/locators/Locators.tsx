import { ItemLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/soltis/material/LocationType'
import { MaterialType } from '@gamepark/soltis/material/MaterialType'
import { PlayerId } from '@gamepark/soltis/PlayerId'
import { landscapeDeckLocator } from './LandscapeDeckLocator'
import { landscapeQueueLocator } from './LandscapeQueueLocator'
import { panoramaLocator } from './PanoramaLocator'
import { playAreaLocator } from './PlayAreaLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { rainbowDeckLocator } from './RainbowDeckLocator'
import { spiritDeckLocator } from './SpiritDeckLocator'
import { spiritInMountainLocator } from './SpiritInMountainLocator'
import { spiritLineLocator } from './SpiritLineLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.LandscapeDeck]: landscapeDeckLocator,
  [LocationType.RainbowDeck]: rainbowDeckLocator,
  [LocationType.Panorama]: panoramaLocator,
  [LocationType.LandscapeQueue]: landscapeQueueLocator,
  [LocationType.SpiritDeck]: spiritDeckLocator,
  [LocationType.SpiritLine]: spiritLineLocator,
  [LocationType.Hand]: playerHandLocator,
  [LocationType.PlayArea]: playAreaLocator,
  [LocationType.SpiritInMountain]: spiritInMountainLocator
}
