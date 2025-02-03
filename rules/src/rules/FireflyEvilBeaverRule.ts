import { isMoveItemType, ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Spirit } from '../material/Spirit'
import { PlaceCardHelper } from './helper/PlaceCardHelper'
import { RuleId } from './RuleId'

export class FireflyEvilBeaverRule extends PlayerTurnRule {
  getPlayerMoves() {
    const evil = this.evilBeaver
    return new PlaceCardHelper(this.game, this.opponent).placeAdjacentToLandscape(evil)
  }

  get opponent() {
    return this.game.players.find((p) => p !== this.player)
  }

  beforeItemMove(move: ItemMove, _context?: PlayMoveContext) {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return []
    if (this.evilBeaver.getItem()!.location.type === LocationType.Hand && move.location.type === LocationType.Panorama) return [this.startRule(RuleId.EncounterSpirit)]
    return [this.startRule(RuleId.RefillHand)]
  }

  get evilBeaver() {
    return this.material(MaterialType.SpiritTile)
      .player(this.player)
      .id(Spirit.EvilBeaver)
  }

}
