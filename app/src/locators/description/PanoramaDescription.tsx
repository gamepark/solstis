/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react'
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/soltis/material/LocationType'
import { panoramaLandscapes } from '@gamepark/soltis/rules/PanoramaLandscapes'
import { landscapeTileDescription } from '../../material/LandscapeTileDescription'

export class PanoramaDescription extends LocationDescription {
  height = landscapeTileDescription.height
  width = landscapeTileDescription.width
  borderRadius = landscapeTileDescription.borderRadius
  alwaysVisible = true

  getLocations(context: MaterialContext) {
    const { rules } = context
    const locations: Location[] = []
    for (const player of rules.players) {
      for (let columnIndex = 0; columnIndex < panoramaLandscapes.length; columnIndex++) {
        const column = panoramaLandscapes[columnIndex]
        for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
          if (column[rowIndex] !== undefined) {
            locations.push({
              type: LocationType.Panorama,
              player: player,
              x: columnIndex,
              y: rowIndex
            })
          }
        }
      }
    }

    console.log(locations)
    return locations
  }

  getCoordinates(location: Location, context: LocationContext) {
    const baseCoordinates = this.getLandscapePosition(location, context)

    baseCoordinates.x += location.x! * (landscapeTileDescription.width + 0.1)
    baseCoordinates.y -= location.y! * (landscapeTileDescription.height + 0.1)
    baseCoordinates.z = 0.05

    return baseCoordinates
  }

  getLandscapePosition(location: Location, context: LocationContext) {
    const { rules, player } = context
    const leftPlayer = location.player === player ?? rules.players[0]
    return { x: leftPlayer? -32: 12, y: 12, z: 0}
  }

  getExtraCss(location: Location, _context: LocationContext): Interpolation<Theme> {
    console.log(location)
    return css`
      background-image: url(${landscapeTileDescription.images[panoramaLandscapes[location.x!][location.y!]]});
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.4;
    `
  }


}