/** @jsxImportSource @emotion/react */
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { MountainLandscape } from '@gamepark/solstis/material/MountainLandscape'
import { SquareHelper } from '@gamepark/solstis/rules/helper/SquareHelper'
import { Memory } from '@gamepark/solstis/rules/Memory'
import { RuleId } from '@gamepark/solstis/rules/RuleId'
import equal from 'fast-deep-equal'
import { landscapeTileDescription } from '../../material/LandscapeTileDescription'
import { PanoramaDescription } from './PanoramaDescription'

export class SpiritInMountainDescription extends LocationDescription {
  height = landscapeTileDescription.height * 2 + 0.1
  width = landscapeTileDescription.width * 2 + 0.1
  alwaysVisible = true

  getLocations(context: MaterialContext) {
    const evilRuleLocations: Location[] = this.getEvilRuleLocations(context)
    if (evilRuleLocations.length) return evilRuleLocations

    return this.getEncounterSpiritLocations(context)
  }

  getEncounterSpiritLocations(context: MaterialContext) {
    const { rules } = context
    const itemIds = rules.remind<MountainLandscape[]>(Memory.MustEncounterSpiritOn)
    if (!itemIds?.length || rules.game.rule?.id !== RuleId.EncounterSpirit) return []

    const locations: Location[] = []
    for (const itemId of itemIds) {
      const material = rules.material(MaterialType.LandscapeTile).player(rules.game.rule.player).id(itemId)
      const item = material.getItem()!
      const coordinates = new SquareHelper(rules.game, material.getIndex(), item.location).encounterPlaces
      locations.push(
        ...coordinates.map((coordinates) => ({
          type: LocationType.SpiritInMountain,
          player: rules.game.rule!.player,
          ...coordinates
        }))
      )
    }

    return locations
  }

  getEvilRuleLocations(context: MaterialContext) {
    const { rules } = context
    if (rules.game?.rule?.id !== RuleId.EvilBeaver) return []
    return rules
      .material(MaterialType.SpiritTile)
      .location(LocationType.SpiritInMountain)
      .player(rules.game.rule.player)
      .getItems()
      .map((item) => ({
        ...item.location,
        z: 1
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

  canLongClick(): boolean {
    return false
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    if (!isMoveItemType(MaterialType.SpiritTile)(move)) return false
    const { rules } = context
    const selectedSpirit = rules.material(MaterialType.SpiritTile).selected()

    if (!selectedSpirit.length) return false
    console.log(move.itemIndex === selectedSpirit.getIndex() && equal(location, move.location))
    return move.itemIndex === selectedSpirit.getIndex() && equal(location, move.location)
  }

}