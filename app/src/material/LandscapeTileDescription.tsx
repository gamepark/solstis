/** @jsxImportSource @emotion/react */
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { MountainLandscape } from '@gamepark/solstis/material/MountainLandscape'
import { CustomMoveType } from '@gamepark/solstis/rules/CustomMoveType'
import Landscape_1_1 from '../images/landscape/landscape_1_1.jpg'
import Landscape_1_10 from '../images/landscape/landscape_1_10.jpg'
import Landscape_1_2 from '../images/landscape/landscape_1_2.jpg'
import Landscape_1_3 from '../images/landscape/landscape_1_3.jpg'
import Landscape_1_4 from '../images/landscape/landscape_1_4.jpg'
import Landscape_1_5 from '../images/landscape/landscape_1_5.jpg'
import Landscape_1_6 from '../images/landscape/landscape_1_6.jpg'
import Landscape_1_7 from '../images/landscape/landscape_1_7.jpg'
import Landscape_1_8 from '../images/landscape/landscape_1_8.jpg'
import Landscape_1_9 from '../images/landscape/landscape_1_9.jpg'
import Landscape_2_1 from '../images/landscape/landscape_2_1.jpg'
import Landscape_2_10 from '../images/landscape/landscape_2_10.jpg'
import Landscape_2_2 from '../images/landscape/landscape_2_2.jpg'
import Landscape_2_3 from '../images/landscape/landscape_2_3.jpg'
import Landscape_2_4 from '../images/landscape/landscape_2_4.jpg'
import Landscape_2_5 from '../images/landscape/landscape_2_5.jpg'
import Landscape_2_6 from '../images/landscape/landscape_2_6.jpg'
import Landscape_2_7 from '../images/landscape/landscape_2_7.jpg'
import Landscape_2_8 from '../images/landscape/landscape_2_8.jpg'
import Landscape_2_9 from '../images/landscape/landscape_2_9.jpg'
import Landscape_3_1 from '../images/landscape/landscape_3_1.jpg'
import Landscape_3_10 from '../images/landscape/landscape_3_10.jpg'
import Landscape_3_2 from '../images/landscape/landscape_3_2.jpg'
import Landscape_3_3 from '../images/landscape/landscape_3_3.jpg'
import Landscape_3_4 from '../images/landscape/landscape_3_4.jpg'
import Landscape_3_5 from '../images/landscape/landscape_3_5.jpg'
import Landscape_3_6 from '../images/landscape/landscape_3_6.jpg'
import Landscape_3_7 from '../images/landscape/landscape_3_7.jpg'
import Landscape_3_8 from '../images/landscape/landscape_3_8.jpg'
import Landscape_3_9 from '../images/landscape/landscape_3_9.jpg'
import Landscape_4_2 from '../images/landscape/landscape_4_2.jpg'
import Landscape_4_3 from '../images/landscape/landscape_4_3.jpg'
import Landscape_4_4 from '../images/landscape/landscape_4_4.jpg'
import Landscape_4_5 from '../images/landscape/landscape_4_5.jpg'
import Landscape_4_6 from '../images/landscape/landscape_4_6.jpg'
import Landscape_4_7 from '../images/landscape/landscape_4_7.jpg'
import Landscape_4_8 from '../images/landscape/landscape_4_8.jpg'
import Landscape_4_9 from '../images/landscape/landscape_4_9.jpg'
import Landscape_5_3 from '../images/landscape/landscape_5_3.jpg'
import Landscape_5_4 from '../images/landscape/landscape_5_4.jpg'
import Landscape_5_5 from '../images/landscape/landscape_5_5.jpg'
import Landscape_5_6 from '../images/landscape/landscape_5_6.jpg'
import Landscape_5_7 from '../images/landscape/landscape_5_7.jpg'
import Landscape_5_8 from '../images/landscape/landscape_5_8.jpg'
import Landscape_6_4 from '../images/landscape/landscape_6_4.jpg'
import Landscape_6_5 from '../images/landscape/landscape_6_5.jpg'
import Landscape_6_6 from '../images/landscape/landscape_6_6.jpg'
import Landscape_6_7 from '../images/landscape/landscape_6_7.jpg'
import Rainbow from '../images/landscape/rainbow.jpg'
import LandscapeBack from '../images/landscape/tile_back.jpg'


export class LandscapeTileDescription extends CardDescription {
  height = 4.8
  width = 3.2
  borderRadius = 0.2

  backImage = LandscapeBack

  images = {
    [MountainLandscape.Landscape_1_1]: Landscape_1_1,
    [MountainLandscape.Landscape_1_2]: Landscape_1_2,
    [MountainLandscape.Landscape_1_3]: Landscape_1_3,
    [MountainLandscape.Landscape_1_4]: Landscape_1_4,
    [MountainLandscape.Landscape_1_5]: Landscape_1_5,
    [MountainLandscape.Landscape_1_6]: Landscape_1_6,
    [MountainLandscape.Landscape_1_7]: Landscape_1_7,
    [MountainLandscape.Landscape_1_8]: Landscape_1_8,
    [MountainLandscape.Landscape_1_9]: Landscape_1_9,
    [MountainLandscape.Landscape_1_10]: Landscape_1_10,
    [MountainLandscape.Landscape_2_1]: Landscape_2_1,
    [MountainLandscape.Landscape_2_2]: Landscape_2_2,
    [MountainLandscape.Landscape_2_3]: Landscape_2_3,
    [MountainLandscape.Landscape_2_4]: Landscape_2_4,
    [MountainLandscape.Landscape_2_5]: Landscape_2_5,
    [MountainLandscape.Landscape_2_6]: Landscape_2_6,
    [MountainLandscape.Landscape_2_7]: Landscape_2_7,
    [MountainLandscape.Landscape_2_8]: Landscape_2_8,
    [MountainLandscape.Landscape_2_9]: Landscape_2_9,
    [MountainLandscape.Landscape_2_10]: Landscape_2_10,
    [MountainLandscape.Landscape_3_1]: Landscape_3_1,
    [MountainLandscape.Landscape_3_2]: Landscape_3_2,
    [MountainLandscape.Landscape_3_3]: Landscape_3_3,
    [MountainLandscape.Landscape_3_4]: Landscape_3_4,
    [MountainLandscape.Landscape_3_5]: Landscape_3_5,
    [MountainLandscape.Landscape_3_6]: Landscape_3_6,
    [MountainLandscape.Landscape_3_7]: Landscape_3_7,
    [MountainLandscape.Landscape_3_8]: Landscape_3_8,
    [MountainLandscape.Landscape_3_9]: Landscape_3_9,
    [MountainLandscape.Landscape_3_10]: Landscape_3_10,
    [MountainLandscape.Landscape_4_2]: Landscape_4_2,
    [MountainLandscape.Landscape_4_3]: Landscape_4_3,
    [MountainLandscape.Landscape_4_4]: Landscape_4_4,
    [MountainLandscape.Landscape_4_5]: Landscape_4_5,
    [MountainLandscape.Landscape_4_6]: Landscape_4_6,
    [MountainLandscape.Landscape_4_7]: Landscape_4_7,
    [MountainLandscape.Landscape_4_8]: Landscape_4_8,
    [MountainLandscape.Landscape_4_9]: Landscape_4_9,
    [MountainLandscape.Landscape_5_3]: Landscape_5_3,
    [MountainLandscape.Landscape_5_4]: Landscape_5_4,
    [MountainLandscape.Landscape_5_5]: Landscape_5_5,
    [MountainLandscape.Landscape_5_6]: Landscape_5_6,
    [MountainLandscape.Landscape_5_7]: Landscape_5_7,
    [MountainLandscape.Landscape_5_8]: Landscape_5_8,
    [MountainLandscape.Landscape_6_4]: Landscape_6_4,
    [MountainLandscape.Landscape_6_5]: Landscape_6_5,
    [MountainLandscape.Landscape_6_6]: Landscape_6_6,
    [MountainLandscape.Landscape_6_7]: Landscape_6_7,
    [MountainLandscape.Rainbow]: Rainbow

  }

  canShortClick(move: MaterialMove, { index }: ItemContext): boolean {
    return (isCustomMoveType(CustomMoveType.DrawCard)(move) && move.data === index)
     || (isMoveItemType(MaterialType.LandscapeTile)(move) && (move.location.type === LocationType.Panorama || move.location.type === LocationType.PlayArea) && index === move.itemIndex)
  }
}

export const landscapeTileDescription = new LandscapeTileDescription()