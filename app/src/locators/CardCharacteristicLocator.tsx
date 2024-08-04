/** @jsxImportSource @emotion/react */
import { Locator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { getLine } from '@gamepark/solstis/material/MountainLandscape'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'

export enum Characteristic {
  Color = 1, Fire
}

class CardCharacteristicDescription extends LocationDescription {

  getBorderRadius(location: Location) {
    if (location.id === Characteristic.Color) return 0.2
    if (location.id === Characteristic.Fire) return 0.3
    return 0
  }


  getSize(location: Location) {
    if (location.id === Characteristic.Color) return { height: 1, width: 1 }
    if (location.id === Characteristic.Fire) return { height: 1.2, width: 1.4 }
    return { height: 2.7, width: landscapeTileDescription.width }
  }
}

export const cardCharacteristicDescription = new CardCharacteristicDescription()

export class CardCharacteristicLocator extends Locator {
  locationDescription = cardCharacteristicDescription
  parentItemType = MaterialType.LandscapeTile

  getPositionOnParent(l: Location, context: MaterialContext) {
    const { rules } = context
    const { id } = rules.material(MaterialType.LandscapeTile).getItem(l.parent!)!

    if (l.id === Characteristic.Color) return { x: 33, y: (getLine(id) === 3)? 87: (getLine(id) === 0? 85 :84) }
    if (l.id === Characteristic.Fire) return { x: 36, y: 14.5 }
    return { x: 50, y: 81 }
  }
}

export const cardCharacteristicLocator = new CardCharacteristicLocator()

