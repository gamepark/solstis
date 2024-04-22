import { ItemLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/soltis/material/LocationType'
import { MaterialType } from '@gamepark/soltis/material/MaterialType'
import { PlayerId } from '@gamepark/soltis/PlayerId'
import { landscapeDeckLocator } from './LandscapeDeckLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.LandscapeDeck]: landscapeDeckLocator
}
