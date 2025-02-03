import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Spirit } from '../material/Spirit'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class RefillHandRule extends PlayerTurnRule {

  onRuleStart() {
    this.forget(Memory.MustEncounterSpiritOn)
    const deck = this.deck
    const nextPlayerRule = this.startPlayerTurn(RuleId.SelectHandTile, this.hasFreeTurn? this.player: this.nextPlayer)
    if (deck.length === 0) return [nextPlayerRule]
    const hand = this.hand

    const maxCardCount = 3 + this.bonusCards
    return [
      ...this.deck.limit(maxCardCount - hand.length).moveItems({
        type: LocationType.Hand,
        player: this.player
      }),
      nextPlayerRule
    ]
  }

  get deck() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
      .sort((item) => item.location.x!)
  }

  get hasFreeTurn() {
    return this.remind(Memory.FreeTurn)
  }

  get bonusCards() {
    const bear = this
      .material(MaterialType.SpiritTile)
      .location(LocationType.SpiritInMountain)
      .player(this.player)
      .id(Spirit.Bear)

    if (bear.length) return 1
    return 0
  }

  get hand() {
    return this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.Hand)
      .player(this.player)
  }

  onRuleEnd() {
    this.forget(Memory.QueueCardPlaced)
    this.forget(Memory.PlayedCard)
    this.forget(Memory.SecondChance)
    this.forget(Memory.FreeTurn)
    return []
  }
}
