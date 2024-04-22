/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'


export class LandscapeDeckLocator extends DeckLocator {
  coordinates = { x: -20, y: -20, z: 0}
  delta = { x: -0.03, y: -0.03, z: 0.05 }
}

export const landscapeDeckLocator = new LandscapeDeckLocator()