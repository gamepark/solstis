import { PileLocator } from '@gamepark/react-game'

export class FireflyStackLocator extends PileLocator {
  coordinates = { x: 7, y: 7 }
  radius = 1
}

export const fireflyStackLocator = new FireflyStackLocator()
