import { isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { FireflyHelper } from '../helper/FireflyHelper'
import { panoramaLandscapes } from '../PanoramaLandscapes'
import { PlaceRainbowRule } from '../PlaceRainbowRule'
import { RuleId } from '../RuleId'

export class FishRule extends PlaceRainbowRule {
  onRuleStart() {
    const card = this.rainbowCard
    if (!card.length) return this.afterRainbowPlaced()
    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move) || move.location.type !== LocationType.Panorama) return []
    const item = this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)!
    new FireflyHelper(this.game).recomputeFireflies(panoramaLandscapes[item.location.x!][item.location.y!])
    return this.afterRainbowPlaced()
  }

  afterRainbowPlaced() {
    const afterEncounterMoves = new FireflyHelper(this.game).afterSpiritEncountered()
    if (afterEncounterMoves.length) return afterEncounterMoves
    return [this.startRule(RuleId.RefillHand)]
  }
}
