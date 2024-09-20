import { PileLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { LandscapeDeckDescription } from './description/LandscapeDeckDescription'

class LandscapeDeckLocator extends PileLocator {
  limit = 100
  locationDescription = new LandscapeDeckDescription()
  location = { type: LocationType.LandscapeDeck }
  coordinates = { x: 4.85, y: -6.5 }

  getLocationCoordinates() {
    return { ...this.coordinates, z: 5 }
  }

  radius = 5
  maxAngle = 90
}

export const landscapeDeckLocator = new LandscapeDeckLocator()