import { ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { GetCardHelper } from '../helper/GetCardHelper'
import { PlaceRainbowRule } from '../PlaceRainbowRule'
import { RuleId } from '../RuleId'

export class BearRule extends PlaceRainbowRule {

  onRuleStart() {
    const deck = this.deck
    if (!deck.length) return [this.rules().startRule(RuleId.Capture)]

    return [
      deck.moveItem({
        type: LocationType.Hand,
        player: this.player
      }),
      this.rules().startRule(RuleId.Capture)
    ]
  }

  get deck() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
  }

  getPlayerMoves() {
    return new GetCardHelper(this.game).getPlayCardMove(this.hand)
  }

  afterItemMove(move: ItemMove) {
    return [
      ...new GetCardHelper(this.game).afterItemMove(move),
      this.rules().startRule(RuleId.Capture)
    ]
  }

  get hand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.player)
  }

}