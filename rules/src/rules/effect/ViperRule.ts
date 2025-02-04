import { getDistanceBetweenSquares, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { DrawableEffectRule } from './DrawableEffectRule'

export class ViperRule extends DrawableEffectRule {

  onRuleStart() {
    if (!this.opponentIsolatedTiles.length) return this.endRuleMoves
    return []
  }

  getPlayerMoves() {
    if (this.playAreaCard.length) {
      return new PlaceCardHelper(this.game).getPlayCardMove(this.playAreaCard)
    }

    return new PlaceCardHelper(this.game).getPlayCardMove(this.opponentIsolatedTiles)
  }

  get opponentIsolatedTiles() {
    const opponentPanorama = this.opponentPanorama
    return opponentPanorama
      .filter((i) => !this.hasAdjacentCard(i, opponentPanorama.getItems()))
  }

  get opponentPanorama() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player((p) => p !== this.player)
  }

  hasAdjacentCard(card: MaterialItem, panorama: MaterialItem[]) {
    const cardCoordinates = { x: card.location.x!, y: card.location.y! }
    return panorama
      .filter((l) => getDistanceBetweenSquares({ x: l.location.x!, y: l.location.y! }, cardCoordinates) === 1)
      .length > 0
  }

}
