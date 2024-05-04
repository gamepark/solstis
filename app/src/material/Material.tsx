import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { landscapeTileDescription } from './LandscapeTileDescription'
import { spiritTileDescription } from './SpiritTileDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.LandscapeTile]: landscapeTileDescription,
  [MaterialType.SpiritTile]: spiritTileDescription,
}
