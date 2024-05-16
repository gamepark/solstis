import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { MountainLandscape } from '@gamepark/solstis/material/MountainLandscape'
import { Spirit } from '@gamepark/solstis/material/Spirit'
import { SolstisOptions } from '@gamepark/solstis/SolstisOptions'
import { SolstisSetup } from '@gamepark/solstis/SolstisSetup'

const me = 1
const _ = undefined
const ThirdDeckCard = MountainLandscape.Landscape_4_6
const StaticHandCards = [MountainLandscape.Landscape_3_5, MountainLandscape.Landscape_6_6, MountainLandscape.Landscape_6_4]
const OpponentStaticHandCards = [MountainLandscape.Landscape_5_3, _, MountainLandscape.Landscape_3_4  ]
export const StaticQueueCards = [
  [MountainLandscape.Landscape_5_6, MountainLandscape.Landscape_4_5],
  [_, MountainLandscape.Landscape_1_3],
  [MountainLandscape.Landscape_3_3, MountainLandscape.Landscape_3_6],
  [_, MountainLandscape.Landscape_2_3],
  [_, MountainLandscape.Landscape_5_8],
  [_, MountainLandscape.Landscape_2_1]
]
export class TutorialSetup extends SolstisSetup {
  setupMaterial(options: SolstisOptions) {
    super.setupMaterial(options)
    this.material(MaterialType.LandscapeTile).location(LocationType.LandscapeDeck).id(ThirdDeckCard).moveItem({
      type: LocationType.LandscapeDeck,
      x: 2
    })
    this.material(MaterialType.SpiritTile).id(Spirit.Fish).moveItem({
      type: LocationType.SpiritDeck
    })
  }

  setupQueue() {
    const randomDeck = this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
      .filter((item) =>
        !StaticHandCards.includes(item.id)
        && !OpponentStaticHandCards.includes(item.id)
        && !StaticQueueCards.flat().includes(item.id)
        && item.id !== ThirdDeckCard
      )
      .deck()

    const staticDeck = this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
      .filter((item) => StaticQueueCards.flat().includes(item.id))
      .deck()

    for (let x = 0; x < 6; x++) {

      if (_ === StaticQueueCards[x][0]) {
        randomDeck
          .dealOne({ type: LocationType.LandscapeQueue, x, z: 0, rotation: true })
      } else {
        staticDeck
          .id(StaticQueueCards[x][0])
          .dealOne({ type: LocationType.LandscapeQueue, x, z: 0, rotation: true })
      }
      staticDeck
        .id(StaticQueueCards[x][1])
        .dealOne({ type: LocationType.LandscapeQueue, x, z: 1 })
    }
  }

  setupPlayers(options: SolstisOptions) {
    const randomDeck = this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
      .filter((item) => !StaticHandCards.includes(item.id)
        && !StaticQueueCards.includes(item.id)
        && !OpponentStaticHandCards.includes(item.id)
        && item.id !== ThirdDeckCard
      )
      .deck()

    const staticDeck = this
      .material(MaterialType.LandscapeTile)
      .location(LocationType.LandscapeDeck)
      .filter((item) => StaticHandCards.includes(item.id) || OpponentStaticHandCards.includes(item.id))
      .deck()

    for (let player = 1; player <= options.players; player++) {
      for (let x = 0; x < 3; x++) {
        if (player === me) {
          if (_ === StaticHandCards[x]) {
            randomDeck
              .dealOne({ type: LocationType.Hand, player: player, x })
          } else {
            staticDeck
              .id(StaticHandCards[x])
              .dealOne({ type: LocationType.Hand, player: player, x })
          }
        } else {
          if (_ === OpponentStaticHandCards[x]) {
            randomDeck
              .dealOne({ type: LocationType.Hand, player: player, x })
          } else {
            staticDeck
              .id(OpponentStaticHandCards[x])
              .dealOne({ type: LocationType.Hand, player: player, x })
          }
        }
      }
    }

  }
}
