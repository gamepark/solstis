import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/soltis/material/LocationType'
import { MaterialType } from '@gamepark/soltis/material/MaterialType'
import { SquareHelper } from '@gamepark/soltis/rules/helper/SquareHelper'
import { Memory } from '@gamepark/soltis/rules/Memory'
import { RuleId } from '@gamepark/soltis/rules/RuleId'
import { landscapeTileDescription } from '../../material/LandscapeTileDescription'
import { PanoramaDescription } from './PanoramaDescription'

export class SpiritInMountainDescription extends LocationDescription {
  height = landscapeTileDescription.height * 2 + 0.1
  width = landscapeTileDescription.width * 2 + 0.1

  getLocations(context: MaterialContext) {
    const { rules } = context
    const itemId = rules.remind(Memory.MustEncounterSpiritOn)
    if (!itemId || rules.game.rule?.id !== RuleId.EncounterSpirit) return []
    const material = rules.material(MaterialType.LandscapeTile).player(rules.game.rule.player).id(itemId)
    const item = material.getItem()!
    const coordinates = new SquareHelper(rules.game, material.getIndex(), item.location).encounterPlaces
    return coordinates.map((coordinates) => ({
      type: LocationType.SpiritInMountain,
      player: rules.game.rule!.player,
      ...coordinates
    }))
  }

  getCoordinates(location: Location, context: LocationContext) {
    const coordinates = this.getDropZonePosition(location, context)
    coordinates.z = 1
    coordinates.y -= 0.05
    coordinates.x += 0.05
    return coordinates
  }

  getDropZonePosition(location: Location, context: MaterialContext): Coordinates {
    const position = new PanoramaDescription().getCoordinates(location, context)
    position.x += landscapeTileDescription.width / 2
    position.y -= landscapeTileDescription.height / 2
    position.z = 0.5

    return position
  }

}