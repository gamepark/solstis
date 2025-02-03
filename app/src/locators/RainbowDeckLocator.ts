import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { Memory } from '@gamepark/solstis/rules/Memory'

export class RainbowDeckLocator extends DeckLocator {

  getCoordinates(_location: Location, context: MaterialContext) {
    if (!context.rules.remind(Memory.FireflyExt)) return { x: 5, y: 7 }
    return { x: 3, y: 7 }
  }
}

export const rainbowDeckLocator = new RainbowDeckLocator()
