/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'


export class SpiritDeckLocator extends DeckLocator {
  coordinates = { x: 1.1, y: 1.7, z: 0}
  delta = { x: -0.03, y: -0.03, z: 0.05 }
}

export const spiritDeckLocator = new SpiritDeckLocator()