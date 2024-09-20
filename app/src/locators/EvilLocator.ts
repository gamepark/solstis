import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class EvilLocator extends Locator {
  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { x: location.player === player ? -5.4 : 15, y: -8 }
  }
}

export const evilLocator = new EvilLocator()