import { MaterialGameAnimations } from '@gamepark/react-game'
import { isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'

export const solstisAnimations = new MaterialGameAnimations()

solstisAnimations
  .configure((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.Hand)
  .duration(600)

solstisAnimations
  .configure((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.SpiritDeck)
  .duration(600)

solstisAnimations
  .configure((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.SpiritInMountain)
  .duration(600)

solstisAnimations
  .configure((move) => isMoveItemType(MaterialType.SpiritTile)(move) && move.location.type === LocationType.Hand)
  .duration(600)

solstisAnimations
  .configure((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.PlayArea)
  .duration(600)

solstisAnimations
  .configure((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.Panorama)
  .duration(800)

solstisAnimations
  .configure((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.LandscapeQueue)
  .duration(800)

solstisAnimations
  .configure(isDeleteItemType(MaterialType.LandscapeTile))
  .skip()