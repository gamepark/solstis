import { isDeleteItemType, isMoveItemType, isStartRule, ItemMove, MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlaceCardHelper } from './helper/PlaceCardHelper'
import { QueueHelper } from './helper/QueueHelper'
import { SquareHelper } from './helper/SquareHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class CaptureRule extends PlayerTurnRule {
  getPlayerMoves() {
    return new PlaceCardHelper(this.game).captureMoves
  }

  onRuleStart(_move: RuleMove, previousRule?: RuleStep) {
    const playerMoves = this.getPlayerMoves()
    if (playerMoves.length === 0) return [this.rules().startRule(RuleId.EncounterSpirit)]
    if (playerMoves.length === 1) {
      if (previousRule?.id === RuleId.SecondChance || previousRule?.id === RuleId.SelectHandTile) return this.discardAndGoToNext
      return playerMoves
    }
    return []
  }

  get isSecondChance() {
    return !!this.remind(Memory.SecondChance)
  }

  beforeItemMove(move: ItemMove) {
    if (!isDeleteItemType(MaterialType.LandscapeTile)(move) && (!isMoveItemType(MaterialType.LandscapeTile)(move) || move.location.type !== LocationType.Panorama)) return []
    const moves: MaterialMove[] = new QueueHelper(this.game).beforeItemMove(move)

    if (this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)?.location?.type === LocationType.LandscapeQueue) {
      this.memorize(Memory.QueueCardPlaced, move.itemIndex)
    }
    return moves
  }

  get discardAndGoToNext() {
    return [
      ...this.playAreaCard.moveItems({
        type: LocationType.LandscapeQueue
      }),
      ...this.newRule
    ]
  }

  get newRule() {
    if (!this.deck.length) {
      return [this.rules().startRule(RuleId.EncounterSpirit)]
    }
    return [this.rules().startRule(this.isSecondChance ? RuleId.PlaceRainbow : RuleId.SecondChance)]
  }

  get deck() {
    return this.material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
  }



  afterItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.LandscapeTile)(move)) return this.afterCardMove
    if (!isMoveItemType(MaterialType.LandscapeTile)(move) || move.location.type !== LocationType.Panorama) return []

    new SquareHelper(this.game, move.itemIndex, move.location).encounterSpiritMoves
    const rule = new PlaceCardHelper(this.game)
    const moves: MaterialMove[] = rule.afterItemMove(move)
    if (moves.some(isStartRule)) return moves
    moves.push(...this.afterCardMove)

    return moves
  }

  get afterCardMove() {
    const moves: MaterialMove[] = []
    const remainingMoves = this.getPlayerMoves()
    if (!remainingMoves.length) {
      moves.push(this.rules().startRule(RuleId.EncounterSpirit))
    } else if (remainingMoves.length === 1) {
      const rule = new PlaceCardHelper(this.game)
      moves.push(...rule.captureMoves)
    }

    return moves
  }

  get playAreaCard() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.PlayArea)
      .player(this.player)
  }
}