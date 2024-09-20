import { LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { getLine } from '@gamepark/solstis/material/MountainLandscape'

export enum Characteristic {
  Color = 1, Fire
}

class CardCharacteristicDescription extends LocationDescription {

  getBorderRadius(id: Characteristic) {
    switch (id) {
      case Characteristic.Color:
        return 0.2
      case Characteristic.Fire:
        return 0.3
    }
  }

  getSize(id: Characteristic) {
    switch (id) {
      case Characteristic.Color:
        return { height: 1, width: 1 }
      case Characteristic.Fire:
        return { height: 1.2, width: 1.4 }
    }
  }
}

class CardCharacteristicLocator extends Locator {
  locationDescription = new CardCharacteristicDescription()
  parentItemType = MaterialType.LandscapeTile

  getPositionOnParent(l: Location, context: MaterialContext) {
    const { rules } = context
    const { id } = rules.material(MaterialType.LandscapeTile).getItem(l.parent!)

    if (l.id === Characteristic.Color) return { x: 33, y: (getLine(id) === 3) ? 87 : (getLine(id) === 0 ? 85 : 84) }
    if (l.id === Characteristic.Fire) return { x: 36, y: 14.5 }
    return { x: 50, y: 81 }
  }
}

export const cardCharacteristicLocator = new CardCharacteristicLocator()

