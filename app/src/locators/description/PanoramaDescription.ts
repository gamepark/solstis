import { css, Interpolation, Theme } from '@emotion/react'
import { DropAreaDescription, LocationContext } from '@gamepark/react-game'
import { isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { panoramaLandscapes } from '@gamepark/solstis/rules/PanoramaLandscapes'
import { isEqual } from 'es-toolkit'
import { landscapeTileDescription } from '../../material/LandscapeTileDescription'

export class PanoramaDescription extends DropAreaDescription {
  getExtraCss(location: Location, _context: LocationContext): Interpolation<Theme> {
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
    return (isMoveItemType(MaterialType.LandscapeTile)(move) && isEqual(location, move.location)) ||
      (isMoveItemType(MaterialType.SpiritTile)(move) && isEqual(location, move.location))
  }
}

