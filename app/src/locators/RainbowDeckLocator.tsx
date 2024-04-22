/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'


export class RainbowDeckLocator extends DeckLocator {
  coordinates = { x: -4, y: -18, z: 0}
  delta = { x: -0.03, y: -0.03, z: 0.05 }
}

export const rainbowDeckLocator = new RainbowDeckLocator()