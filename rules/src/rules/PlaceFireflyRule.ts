import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { FireflyHelper } from './helper/FireflyHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlaceFireflyRule extends PlayerTurnRule {
  onRuleStart() {
    const helper = new FireflyHelper(this.game)
    const moves: MaterialMove[] = helper.placeFireflyMoves
    this.forget(Memory.Fireflies)
    if ((this.playerFireflies.length + moves.length) === 4) {
      moves.push(this.endGame())
    } else if (helper.evilBeaver.length) {
      moves.push(this.startRule(RuleId.FireflyEvilBeaver))
    } else {
      moves.push(this.startRule(RuleId.RefillHand))
    }

    return moves
  }

  get playerFireflies() {
    return this.material(MaterialType.Firefly)
      .player(this.player)
  }
}
