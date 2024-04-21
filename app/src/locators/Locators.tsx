import { LocationType } from '@gamepark/soltis/material/LocationType'
import { MaterialType } from '@gamepark/soltis/material/MaterialType'
import { PlayerId } from '@gamepark/soltis/PlayerId'
import { ItemLocator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>>> = {}
