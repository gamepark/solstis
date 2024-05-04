import { MaterialGameAnimations } from '@gamepark/react-game'
import { isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'

export const solstisAnimations = new MaterialGameAnimations()

solstisAnimations.when()
  .move((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.Hand)
  .duration(0.6)

solstisAnimations.when()
  .move((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.SpiritDeck)
  .duration(0.6)

solstisAnimations.when()
  .move((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.SpiritInMountain)
  .duration(0.6)

solstisAnimations.when()
  .move((move) => isMoveItemType(MaterialType.SpiritTile)(move) && move.location.type === LocationType.Hand)
  .duration(0.6)

solstisAnimations.when()
  .move((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.PlayArea)
  .duration(0.6)

solstisAnimations.when()
  .move((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.Panorama)
  .duration(0.8)

solstisAnimations.when()
  .move((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.LandscapeQueue)
  .duration(0.8)

solstisAnimations.when()
  .move(isDeleteItemType(MaterialType.LandscapeTile))
  .duration(0)