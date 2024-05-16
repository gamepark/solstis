/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialTutorial, shadowCss, TutorialStep } from '@gamepark/react-game'
import { isStartRule } from '@gamepark/rules-api'
import { isMoveItemType } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { MountainLandscape } from '@gamepark/solstis/material/MountainLandscape'
import { Spirit } from '@gamepark/solstis/material/Spirit'
import { PlayerId } from '@gamepark/solstis/PlayerId'
import { RuleId } from '@gamepark/solstis/rules/RuleId'
import { Trans } from 'react-i18next'
import Victory from '../images/icons/victory.png'
import Fire from '../images/icons/fire.png'
import { Characteristic } from '../locators/CardCharacteristicLocator'
import { TutorialSetup } from './TutorialSetup'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 1
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome"><strong/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.goal"><strong/></Trans>,
        position: { x: 10, y: 10 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandscapeTile).location(LocationType.LandscapeQueue),
          this.material(game, MaterialType.LandscapeTile).location(LocationType.Hand).player(me)
        ],
        margin: {
          left: 2,
          right: 10
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.tile"><strong/></Trans>,
        position: { x: 10, y: 10 }
      },
      focus: (game) => ({
        locations: [
          ...this
            .material(game, MaterialType.LandscapeTile)
            .location((location) => (location.type === LocationType.Hand && location.player === me) || (location.type === LocationType.LandscapeQueue && location.z === 1))
            .getIndexes()
            .map((index) => this
              .location(LocationType.Characteristics)
              .id(Characteristic.Color)
              .parent(index)
              .location)
        ],
        margin: {
          left: 2,
          right: 12.3
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hand"><strong/></Trans>,
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandscapeTile).location(LocationType.Hand).player(me)
        ],
        locations: [
          this.location(LocationType.PlayArea).player(me).location
        ],
        margin: {
          left: 2,
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play"><strong/></Trans>,
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandscapeTile).location(LocationType.Hand).player(me)
        ],
        locations: [
          this.location(LocationType.PlayArea).player(me).location
        ],
        margin: {
          left: 2,
          bottom: 5
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.PlayArea
          && game.items[move.itemType]![move.itemIndex].id === MountainLandscape.Landscape_3_5
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.capture"><strong/></Trans>,
        position: { x: -10, y: 25 },
        size: { width: 100 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandscapeTile).location(LocationType.Hand).player(me),
          this.material(game, MaterialType.LandscapeTile).location(LocationType.PlayArea),
          this.material(game, MaterialType.LandscapeTile).location(LocationType.LandscapeQueue)
        ],
        margin: {
          left: 2,
          top: 2,
          bottom: 8
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.queue"><strong/></Trans>,
        position: { x: -10, y: 30 },
        size: { width: 110 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandscapeTile).location(LocationType.PlayArea),
          this.material(game, MaterialType.LandscapeTile).location(LocationType.LandscapeQueue).id((id: any) => [MountainLandscape.Landscape_4_5, MountainLandscape.Landscape_3_6].includes(id))
        ],
        margin: {
          left: 2,
          top: 1,
          bottom: 8
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.place"><strong/></Trans>,
        position: { x: 10 }
      },
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.LandscapeTile)(move) && game.items[move.itemType]![move.itemIndex].location.type === LocationType.LandscapeQueue
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.played"><strong/></Trans>
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.LandscapeTile)(move)) return false
          const item = this.material(game, MaterialType.LandscapeTile).getItem(move.itemIndex)!
          const landscapeGreen3 = this.material(game, MaterialType.LandscapeTile).id(MountainLandscape.Landscape_3_3).getItem()!
          const landscapePink6 = this.material(game, MaterialType.LandscapeTile).id(MountainLandscape.Landscape_5_6).getItem()!
          if (!landscapeGreen3.location.rotation) return item.id === MountainLandscape.Landscape_3_4
          if (!landscapePink6.location.rotation) return item.id === MountainLandscape.Landscape_5_3
          return false
        },
        interrupt: (move) => isStartRule(move) && move.id === RuleId.Capture
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent"><strong/></Trans>
      },
      move: {}
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.LandscapeTile)(move)) return false
          const item = this.material(game, MaterialType.LandscapeTile).getItem(move.itemIndex)!
          const playAreaItem = this.material(game, MaterialType.LandscapeTile).location(LocationType.PlayArea).getItem()!
          if (playAreaItem.id === MountainLandscape.Landscape_3_4) return item.id === MountainLandscape.Landscape_3_3
          if (playAreaItem.id === MountainLandscape.Landscape_5_3) return item.id === MountainLandscape.Landscape_5_6
          return false
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.play.2"><strong/></Trans>,
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandscapeTile).location(LocationType.Hand).player(me)
        ],
        locations: [
          this.location(LocationType.PlayArea).player(me).location
        ],
        margin: {
          left: 2,
          bottom: 5
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.LandscapeTile)(move)
          && game.items[move.itemType]![move.itemIndex].id === MountainLandscape.Landscape_6_4,
        interrupt: (move) => isStartRule(move) && move.id === RuleId.SecondChance
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.second-chance"><strong/></Trans>
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.place.2"><strong/></Trans>,
        position: { x: -10, y: 30 },
        size: { width: 110 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandscapeTile).location(LocationType.PlayArea),
          this.material(game, MaterialType.LandscapeTile).location(LocationType.LandscapeQueue).id((id: any) => [MountainLandscape.Landscape_4_6, MountainLandscape.Landscape_3_6].includes(id))
        ],
        margin: {
          left: 2,
          top: 1,
          bottom: 8
        }
      })
    },
    {
      move: {
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.spirit"><strong/></Trans>,
        position: { x: 10, y: -25 },
        size: { width: 110}
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.SpiritTile).location(LocationType.Hand),
          this.material(game, MaterialType.LandscapeTile).location(LocationType.Panorama).player(me)
        ],
        margin: {
          top: 3,
          bottom: 2
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.trout"><strong/></Trans>,
        position: { x: 10, y: -25 },
        size: { width: 110}
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.SpiritTile).location(LocationType.Hand),
          this.material(game, MaterialType.LandscapeTile).location(LocationType.Panorama).player(me)
        ],
        locations: [
          this.location(LocationType.SpiritInMountain).player(me).x(4).y(2).location
        ],
        margin: {
          top: 3,
          bottom: 2
        }
      }),
      move: {
        filter: (move, game) => isMoveItemType(MaterialType.SpiritTile)(move) && game.items[move.itemType]![move.itemIndex].id === Spirit.Fish
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.rainbow"><strong/></Trans>,
        position: { x: 20 }
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.rainbow.win"><strong/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.turn"><strong/></Trans>
      }
    },
    {
      popup: {
        text: () => (
          <div  css={textWithIconCss}>
            <Trans defaults="tuto.scoring">
              <strong/>
              <span css={iconCss(Victory)}/>
            </Trans>
          </div>
        )
      }
    },
    {
      popup: {
        text: () => (
          <div  css={textWithIconCss}>
            <Trans defaults="tuto.fire">
              <strong/>
              <span css={iconCss(Fire)}/>
            </Trans>
          </div>
        ),
        position: { y: 15 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.LandscapeTile).id(MountainLandscape.Landscape_5_8)
        ]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.fire.lighten"><strong/></Trans>
      }
    },
    {
      popup: {
        text:() => (
          <div  css={textWithIconCss}>
            <Trans defaults="tuto.spirit-score">
              <strong/>
              <span css={iconCss(Victory)}/>
            </Trans>
          </div>
        )
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.winner"><strong/></Trans>
      }
    }
  ]
}

const iconCss = (icon: string) => css`
  display: inline-block;
  background: url(${icon}) no-repeat;
  background-size: cover;
  border-radius: 5em;
  height: 1.4em;
  width: 1.4em;
  margin-left: 0.3em;
  ${shadowCss(icon)}
`

const textWithIconCss = css`
  > span {
    margin-left: 0;
    margin-bottom: -0.35em;
  }
`
