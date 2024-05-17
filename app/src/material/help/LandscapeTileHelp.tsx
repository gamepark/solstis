/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { MaterialHelpProps, PlayMoveButton, shadowCss, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { getLine, getValue, MountainLandscape } from '@gamepark/solstis/material/MountainLandscape'
import { landscapeFlames } from '@gamepark/solstis/rules/PanoramaLandscapes'
import { SolstisRules } from '@gamepark/solstis/SolstisRules'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Fire from '../../images/icons/fire.png'
import Victory from '../../images/icons/victory.png'

export const LandscapeTileHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  return (
    <>
      {(!item.id || item.id !== MountainLandscape.Rainbow) && (
        <MountainLandscapeTile {...props} />
      )}
      { (item.id && item.id === MountainLandscape.Rainbow) && (
        <RainbowLandscapeTile { ...props } />
      )}
    </>
  )
}

const RainbowLandscapeTile: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('help.rainbow')}</h2>
      <p>
        {t('help.rainbow.joker')}
      </p>
    </>
  )

}

const MountainLandscapeTile: FC<MaterialHelpProps> = (props) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const itemPlayer = item.location?.player
  const itsMe = playerId && playerId === itemPlayer
  const name = usePlayerName(itemPlayer)
  const rules = useRules<SolstisRules>()!
  const legalMoves = useLegalMoves()
  const capture = legalMoves.find((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.Panorama && move.itemIndex === itemIndex)
  const place = legalMoves.find((move) => isMoveItemType(MaterialType.LandscapeTile)(move) && move.location.type === LocationType.PlayArea && move.itemIndex === itemIndex)

  return (
    <>
      <h2>{t('help.tile')}</h2>
      {capture && <PlayMoveButton move={capture} onPlay={closeDialog}>{t('move.capture')}</PlayMoveButton>}
      {place && <PlayMoveButton move={place} onPlay={closeDialog}>{t('move.choose')}</PlayMoveButton>}
      {item.location?.type === LocationType.LandscapeQueue && (
        <p>
          <Trans defaults="help.tile.line">
            <strong/>
          </Trans>
        </p>
      )}
      {item.location?.type === LocationType.Panorama && (
        <p>
          <Trans defaults={itsMe ? 'help.tile.panorama.you' : 'help.tile.panorama.player'} values={{ player: name }}>
            <strong/>
          </Trans>
        </p>
      )}
      {item.location?.type === LocationType.LandscapeDeck && (
        <p>
          <Trans defaults="help.tile.pile" values={{ number: rules.material(MaterialType.LandscapeTile).location(LocationType.LandscapeDeck).length }}>
            <strong/>
          </Trans>
        </p>
      )}
      {item.location?.type === LocationType.Hand && (
        <p>
          <Trans defaults={itsMe ? 'help.tile.hand.you' : 'help.tile.hand.player'} values={{ player: name }}>
            <strong/>
          </Trans>
        </p>
      )}
      {item.id && (
        <p>
          <Trans defaults="help.tile.position" values={{ line: getLine(item.id) + 1, column: getValue(item.id) }}>
            <strong/>
          </Trans>
        </p>
      )}
      {item.id && item.id in landscapeFlames && (
        <p css={textWithIconCss}>
          <Trans defaults="help.tile.fire">
            <strong/>
            <span css={iconCss(Fire)}/>
            <i/>
            <span css={iconCss(Victory)}/>
          </Trans>
        </p>
      )}
    </>
  )
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