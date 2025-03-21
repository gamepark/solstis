import { isDeleteItemType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MountainLandscape } from '../material/MountainLandscape'
import { PlaceCardHelper } from './helper/PlaceCardHelper'
import { QueueHelper } from './helper/QueueHelper'
import { SquareHelper } from './helper/SquareHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class CaptureRule extends PlayerTurnRule {
  getPlayerMoves() {
    return new PlaceCardHelper(this.game).captureMoves(true)
  }

  onRuleStart(_move: RuleMove, previousRule?: RuleStep) {
    const playerMoves = new PlaceCardHelper(this.game).captureMoves()
    if (playerMoves.length === 0) return [this.startRule(RuleId.EncounterSpirit)]
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

    if (this.material(MaterialType.LandscapeTile).getItem(move.itemIndex).location?.type === LocationType.LandscapeQueue) {
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
    if (!this.deck.length && !this.isSecondChance) {
      return [this.startRule(RuleId.EncounterSpirit)]
    }
    return [this.startRule(this.isSecondChance ? RuleId.PlaceRainbow : RuleId.SecondChance)]
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
    const willGetRainbow = moves.some((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.PlayArea && this.material(MaterialType.LandscapeTile).getItem(move.itemIndex).id === MountainLandscape.Rainbow)
    if (willGetRainbow) return moves
    moves.push(...this.afterCardMove)

    return moves
  }

  get afterCardMove() {
    const moves: MaterialMove[] = []
    const remainingMoves = new PlaceCardHelper(this.game).captureMoves()
    if (this.panorama.length < 2 && this.hasRainbowInHand && this.playAreaCard.length > 1) {
      return remainingMoves
        .filter((move) => isMoveItemType(MaterialType.LandscapeTile)(move)
          && this.material(MaterialType.LandscapeTile).getItem(move.itemIndex)!.id !== MountainLandscape.Rainbow)
    }

    if (!remainingMoves.length) {
      moves.push(this.startRule(RuleId.EncounterSpirit))
    } else if (remainingMoves.length === 1) {
      moves.push(...remainingMoves)
    }

    return moves
  }

  get hasRainbowInHand() {
    return this.playAreaCard.id(MountainLandscape.Rainbow).length > 0
  }

  get panorama() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Panorama)
      .player(this.player)
  }

  get playAreaCard() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.PlayArea)
      .player(this.player)
  }
}