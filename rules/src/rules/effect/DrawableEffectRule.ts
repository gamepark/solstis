import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MountainLandscape } from '../../material/MountainLandscape'
import { FireflyHelper } from '../helper/FireflyHelper'
import { PlaceCardHelper } from '../helper/PlaceCardHelper'
import { QueueHelper } from '../helper/QueueHelper'
import { panoramaLandscapes } from '../PanoramaLandscapes'
import { ImmediateEffectRule } from './ImmediateEffectRule'

export class DrawableEffectRule extends ImmediateEffectRule {

  afterItemMove(move: ItemMove) {
    const moves = new PlaceCardHelper(this.game).afterItemMove(move)
    if (isMoveItemType(MaterialType.LandscapeTile)(move)) {
      const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)!
      const realId = item.id === MountainLandscape.Rainbow? panoramaLandscapes[item.location.x!][item.location.y!]: item.id
      new FireflyHelper(this.game).recomputeFireflies(realId)
    }
    if (this.mustPlayACardFromPlayArea(moves)) return moves


    return [
      ...moves,
      ...this.endRuleMoves
    ]
  }

  beforeItemMove(move: ItemMove) {
    return new QueueHelper(this.game).beforeItemMove(move)
  }

  mustPlayACardFromPlayArea(moves: MaterialMove[]) {
    const willHaveRainbow = moves.some((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.PlayArea)
    return willHaveRainbow || this.playAreaCard.length > 0
  }

  get playAreaCard() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.PlayArea)
      .player(this.player)
  }
}
