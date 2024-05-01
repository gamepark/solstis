/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription, PileLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/soltis/material/LocationType'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'


export class LandscapeDeckLocator extends PileLocator {
  limit = 100
  locationDescription = new LandscapeDescription()

  coordinates = { x: 4.85, y: -6.5, z: 0}
  delta = { x: -0.03, y: -0.03, z: 0.05 }

  radius = 5
  maxAngle = 90
}

class LandscapeDescription extends LocationDescription {
  height = 11 + landscapeTileDescription.height
  width = 11 + landscapeTileDescription.height
  borderRadius = 5
  extraCss = css`background-color: rgba(255, 255, 255, 0.5)`
  coordinates = { x: 4.85, y: -6.5, z: 50}
  //alwaysVisible = true
  location = { type: LocationType.LandscapeDeck }

}

export const landscapeDeckLocator = new LandscapeDeckLocator()