import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlaceCardHelper } from './helper/PlaceCardHelper'
import { SquareHelper } from './helper/SquareHelper'
import { RuleId } from './RuleId'

export class PlaceRainbowRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.panorama.length) return this.getRainbowInHand()
    return []
  }

  getRainbowInHand() {
    const moves: MaterialMove[] = []
    moves.push(this.rainbowCard.moveItem({
      type: LocationType.PlayArea,
      player: this.player
    }))
    moves.push(...this.afterRainbowPlaced())
    return moves
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return new PlaceCardHelper(this.game).placeAdjacentToLandscape(this.rainbowCard)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.LandscapeTile)(move) || move.location.type !== LocationType.Panorama) return []
    new SquareHelper(this.game, move.itemIndex, move.location).encounterSpiritMoves
    return this.afterRainbowPlaced()
  }

  afterRainbowPlaced(): MaterialMove[] {
    return [this.startRule(RuleId.EncounterSpirit)]
  }

  get rainbowCard() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.RainbowDeck)
      .maxBy((item) => item.location.x!)
  }

  get panorama() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
  }
}
