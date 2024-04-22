import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/soltis/material/MaterialType'
import { landscapeTileDescription } from './LandscapeTileDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.LandscapeTile]: landscapeTileDescription,
}
