/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ItemContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/soltis/material/LocationType'
import { landscapeTileDescription } from '../../material/LandscapeTileDescription'

export class PlayAreaDescription extends LocationDescription {

  height = landscapeTileDescription.height + 0.2
  width = landscapeTileDescription.width + 0.2
  borderRadius = landscapeTileDescription.borderRadius

  alwaysVisible = true

  extraCss = css`pointer-events: none`

  getLocations(context: MaterialContext) {
    return context.rules.players.map((p) => ({
      type: LocationType.PlayArea,
      player: p
    }))
  }

  getCoordinates(location: Location, context: ItemContext): Coordinates {
    return this.getPlayAreaCoordinates(location, context)
  }

  getPlayAreaCoordinates(location: Location, context: MaterialContext) {
    const { rules, player } = context
    if (location.player === (player ?? rules.players[0])) {
      return { x: -7, y: -14, z: 0 }
    }

    return { x: 16.5, y: -14, z: 0 }
  }
}