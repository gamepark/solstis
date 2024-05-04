/** @jsxImportSource @emotion/react */
import { CardDescription } from '@gamepark/react-game'
import { Spirit } from '@gamepark/soltis/material/Spirit'
import SpiritBack from '../images/landscape/tile_back.jpg'
import Bear from '../images/spirit/bear.jpg'
import Marmot from '../images/spirit/marmot.jpg'
import Bee from '../images/spirit/bee.jpg'
import Beetle from '../images/spirit/beetle.jpg'
import Bird from '../images/spirit/bird.jpg'
import Butterfly from '../images/spirit/butterfly.jpg'
import Deer from '../images/spirit/deer.jpg'
import Eagle from '../images/spirit/eagle.jpg'
import EvilBeaver from '../images/spirit/evil-beaver.jpg'
import Fish from '../images/spirit/fish.jpg'
import Ladybug from '../images/spirit/ladybug.jpg'
import Lizard from '../images/spirit/lizard.jpg'
import Dragonfly from '../images/spirit/dragonfly.jpg'
import Squirrel from '../images/spirit/squirrel.jpg'
import Wolf from '../images/spirit/wolf.jpg'

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
    [Spirit.Marmot]: Marmot,
    [Spirit.Bee]: Bee,
    [Spirit.Ladybug]: Ladybug,
    [Spirit.Wolf]: Wolf,
    [Spirit.Squirrel]: Squirrel,
    [Spirit.Bird]: Bird,
    [Spirit.Lizard]: Lizard,
    [Spirit.Butterfly]: Butterfly,
    [Spirit.EvilBeaver]: EvilBeaver,
  }
}

export const spiritTileDescription = new SpiritTileDescription()