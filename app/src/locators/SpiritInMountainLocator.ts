/** @jsxImportSource @emotion/react */
import { isItemContext, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { MountainLandscape } from '@gamepark/solstis/material/MountainLandscape'
import { Spirit } from '@gamepark/solstis/material/Spirit'
import { PlaceCardHelper } from '@gamepark/solstis/rules/helper/PlaceCardHelper'
import { SquareHelper } from '@gamepark/solstis/rules/helper/SquareHelper'
import { Memory } from '@gamepark/solstis/rules/Memory'
import { RuleId } from '@gamepark/solstis/rules/RuleId'
import { landscapeTileDescription } from '../material/LandscapeTileDescription'
import { SpiritInMountainDescription } from './description/SpiritInMountainDescription'
import { panoramaLocator } from './PanoramaLocator'

class SpiritInMountainLocator extends Locator {
  locationDescription = new SpiritInMountainDescription()

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
    const placeCardHelper = new PlaceCardHelper(rules.game)
    for (const itemId of itemIds) {
      const coordinates = placeCardHelper.getCardPositionInPanorama(itemId)!
      const material = rules.material(MaterialType.LandscapeTile).player(rules.game.rule.player).location((l) => l.type === LocationType.Panorama && l.x === coordinates.x && l.y === coordinates.y)
      const item = material.getItem()!
      const places = new SquareHelper(rules.game, material.getIndex(), item.location).encounterPlaces
      locations.push(
        ...places.map((place) => ({
          type: LocationType.SpiritInMountain,
          player: rules.game.rule!.player,
          ...place
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
      .player((player) => player !== rules.game.rule?.player)
      .getItems()
      .map((item) => ({
        ...item.location
      }))
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = panoramaLocator.getCoordinates(location, context)
    return {
      x: x + landscapeTileDescription.width / 2 + 0.05,
      y: y - landscapeTileDescription.height / 2 - 0.05,
      z: isItemContext(context)? 0: 5
    }
  }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const { x, y, z = 0 } = super.getItemCoordinates(item, context)
    return item.id === Spirit.EvilBeaver ? { x, y, z: z + 1 } : { x, y, z }
  }

  getItemRotateZ = (item: MaterialItem) => item.id === Spirit.EvilBeaver ? 45 : 0
}

export const spiritInMountainLocator = new SpiritInMountainLocator()