import { MaterialGameAnimations } from '@gamepark/react-game'
import { isDeleteItemType, isMoveItemType, isShuffle } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'

export const solstisAnimations = new MaterialGameAnimations()

// The opponent's hand is shuffled after it has been looked at, so that no tile can be tracked.
// Pure protection, nothing for the players to watch: no animation, and no shuffle sound either.
solstisAnimations.configure(isShuffle).skip()

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