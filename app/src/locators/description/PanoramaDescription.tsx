/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { LocationContext, LocationDescription } from '@gamepark/react-game'
import { isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { panoramaLandscapes } from '@gamepark/solstis/rules/PanoramaLandscapes'
import equal from 'fast-deep-equal'
import { landscapeTileDescription } from '../../material/LandscapeTileDescription'

export class PanoramaDescription extends LocationDescription {
  height = landscapeTileDescription.height
  width = landscapeTileDescription.width
  borderRadius = landscapeTileDescription.borderRadius
  alwaysVisible = true

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = this.getLandscapePosition(location, context)

    baseCoordinates.x += location.x! * (landscapeTileDescription.width + 0.1)
    baseCoordinates.y -= location.y! * (landscapeTileDescription.height + 0.1)
    baseCoordinates.z = context.canDrop? 5: 0.05

    return baseCoordinates
  }

  getLandscapePosition(location: Location, context: LocationContext) {
    const { rules, player } = context
    const leftPlayer = location.player === (player ?? rules.players[0])
    return { x: leftPlayer? -32: 12, y: 12, z: 0}
  }

  getExtraCss(location: Location, context: LocationContext): Interpolation<Theme> {
    const { rules } = context
    const hasCardOnLocation = rules.material(MaterialType.LandscapeTile).location((l) => equal(l, location)).length > 0
    if (hasCardOnLocation) return
    return css`
      &:before {
        content: '';
        background-image: url(${landscapeTileDescription.images[panoramaLandscapes[location.x!][location.y!]]});
        background-color: black;
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        opacity: 0.4;
        height: 100%;
        width: 100%;
      }
      
    `
  }

  canShortClick(move: MaterialMove, location: Location): boolean {
    return isMoveItemType(MaterialType.LandscapeTile)(move) && equal(location, move.location)
  }

  canLongClick() {
    return false
  }
}

