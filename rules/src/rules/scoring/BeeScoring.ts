import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { SpiritColor, SpiritDescriptions } from '../../material/SpiritDescription'
import { PlayerId } from '../../PlayerId'

export class BeeScoring extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }

  get score() {
    return this
      .material(MaterialType.SpiritTile)
      .location(LocationType.SpiritInMountain)
      .filter((item) => SpiritDescriptions[item.id].color === SpiritColor.Wood)
      .length
  }
}