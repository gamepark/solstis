/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { isCustomMoveType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { Spirit } from '@gamepark/solstis/material/Spirit'
import { CustomMoveType } from '@gamepark/solstis/rules/CustomMoveType'
import Bear from '../images/spirit/bear.jpg'
import Bee from '../images/spirit/bee.jpg'
import Beetle from '../images/spirit/beetle.jpg'
import Bird from '../images/spirit/bird.jpg'
import Butterfly from '../images/spirit/butterfly.jpg'
import Deer from '../images/spirit/deer.jpg'
import Dragonfly from '../images/spirit/dragonfly.jpg'
import Eagle from '../images/spirit/eagle.jpg'
import EvilBeaver from '../images/spirit/evil-beaver.jpg'
import Fish from '../images/spirit/fish.jpg'
import Groundhog from '../images/spirit/grounghog.jpg'
import Ladybug from '../images/spirit/ladybug.jpg'
import Lizard from '../images/spirit/lizard.jpg'
import SpiritBack from '../images/spirit/spirit-back.jpg'
import Squirrel from '../images/spirit/squirrel.jpg'
import Wolf from '../images/spirit/wolf.jpg'
import Cow from '../images/spirit/firefly/cow.jpg'
import Phoenix from '../images/spirit/firefly/phoenix.jpg'
import Viper from '../images/spirit/firefly/viper.jpg'
import Fox from '../images/spirit/firefly/fox.jpg'
import { SpiritTileHelp } from './help/SpiritTileHelp'

export class SpiritTileDescription extends CardDescription {
  height = 3.8
  width = 2.2
  borderRadius = 0.1

  backImage = SpiritBack

  images = {
    [Spirit.Fish]: Fish,
    [Spirit.Deer]: Deer,
    [Spirit.Eagle]: Eagle,
    [Spirit.Bear]: Bear,
    [Spirit.Dragonfly]: Dragonfly,
    [Spirit.Beetle]: Beetle,
    [Spirit.Groundhog]: Groundhog,
    [Spirit.Bee]: Bee,
    [Spirit.Ladybug]: Ladybug,
    [Spirit.Wolf]: Wolf,
    [Spirit.Squirrel]: Squirrel,
    [Spirit.Bird]: Bird,
    [Spirit.Lizard]: Lizard,
    [Spirit.Butterfly]: Butterfly,
    [Spirit.EvilBeaver]: EvilBeaver,

    [Spirit.Cow]: Cow,
    [Spirit.Phoenix]: Phoenix,
    [Spirit.Viper]: Viper,
    [Spirit.Fox]: Fox,
  }

  help = SpiritTileHelp

  getItemExtraCss(item: MaterialItem) {
    if (item.selected) {
      return css` > div {
        box-shadow: 0 0 0 0.2em green
      }`
    }

    return
  }

  isDrawSpirits(move: MaterialMove, context: ItemContext) {
    if (isCustomMoveType(CustomMoveType.DrawSpirits)(move)) {
      const { rules } = context
      const deckLength = rules.material(MaterialType.SpiritTile).location(LocationType.SpiritDeck).length
      const item = rules.material(MaterialType.SpiritTile).getItem(context.index)
      if (item.location.type !== LocationType.SpiritDeck) return false
      return item.location.x === (deckLength - 1)
    }
    return false
  }

  // Removed to prevent missclic
  /**canShortClick(move: MaterialMove, context: ItemContext) {
    const item = context.rules.material(MaterialType.SpiritTile).getItem(context.index)!
    const deck = context.rules.material(MaterialType.SpiritTile).location(LocationType.SpiritDeck).deck()
    if (!deck.length || item.location.type !== LocationType.SpiritDeck) return super.canShortClick(move, context)
    return isCustomMoveType(CustomMoveType.DrawSpirits)(move) && item.location.x === deck.getItem()!.location.x
  }*/

  canDrag(move: MaterialMove, context: ItemContext) {
    return this.isDrawSpirits(move, context) || super.canDrag(move, context)
  }

  canLongClick(move: MaterialMove, context: ItemContext) {
    return this.isDrawSpirits(move, context) || super.canLongClick(move, context)
  }
}

export const spiritTileDescription = new SpiritTileDescription()
