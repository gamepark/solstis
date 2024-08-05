/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'


export class SpiritDeckLocator extends DeckLocator {
  limit = 50
  coordinates = { x: 18, y: -22, z: 0}
  delta = { x: -0.03, y: -0.03, z: 0.05 }
}

export const spiritDeckLocator = new SpiritDeckLocator()