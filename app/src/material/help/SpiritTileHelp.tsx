/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { MaterialHelpProps, PlayMoveButton, shadowCss, useLegalMoves, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/solstis/material/LocationType'
import { MaterialType } from '@gamepark/solstis/material/MaterialType'
import { Spirit } from '@gamepark/solstis/material/Spirit'
import { CustomMoveType } from '@gamepark/solstis/rules/CustomMoveType'
import { SolstisRules } from '@gamepark/solstis/SolstisRules'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Fire from '../../images/icons/fire.png'
import Victory from '../../images/icons/victory.png'
import equal from 'fast-deep-equal'

export const SpiritTileHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item, itemIndex, closeDialog } = props
  const rules = useRules<SolstisRules>()!
  const legalMoves = useLegalMoves()
  const drawSpirits = legalMoves.find((move) => isCustomMoveType(CustomMoveType.DrawSpirits)(move) && item.location?.type === LocationType.SpiritDeck)
  const canPlaceSpirit = itemIndex !== undefined && legalMoves.find((move) => isMoveItemType(MaterialType.SpiritTile)(move) && move.location.type === LocationType.SpiritInMountain && itemIndex === move.itemIndex)
  const canCoverSpirit = legalMoves.find((move) => isMoveItemType(MaterialType.SpiritTile)(move)
    && equal(move.location, item.location)
    && rules.material(MaterialType.SpiritTile).getItem(move.itemIndex)?.id === Spirit.EvilBeaver
  )
  return (
    <>
      <h2>{t('help.spirit')}</h2>
      {drawSpirits && <PlayMoveButton move={drawSpirits} onPlay={closeDialog}>{t('move.draw-spirit')}</PlayMoveButton>}
      {canPlaceSpirit && <PlayMoveButton move={rules.material(MaterialType.SpiritTile).index(itemIndex!).selectItem()} local onPlay={closeDialog}>{t('move.select-spirit')}</PlayMoveButton>}
      {canCoverSpirit && <PlayMoveButton move={canCoverSpirit} onPlay={closeDialog}>{t('move.cover-spirit')}</PlayMoveButton>}
      <p>{t('help.spirit.take')}</p>
      <p>{t('help.spirit.effect')}</p>
      {item.id === Spirit.Fish && <SpiritEffect textKey="help.trout" />}
      {item.id === Spirit.Deer && <SpiritEffect textKey="help.deer" />}
      {item.id === Spirit.Eagle && <SpiritEffect textKey="help.eagle" />}
      {item.id === Spirit.Bear && <SpiritEffect textKey="help.bear" />}
      {item.id === Spirit.Dragonfly && <SpiritEffect textKey="help.dragonfly" />}
      {item.id === Spirit.Beetle && <SpiritEffect textKey="help.beetle" />}
      {item.id === Spirit.Groundhog && <SpiritEffect textKey="help.groundhog" />}
      {item.id === Spirit.Bee && <SpiritEffect textKey="help.bee" />}
      {item.id === Spirit.Ladybug && <SpiritEffect textKey="help.ladybug" />}
      {item.id === Spirit.Wolf && <SpiritEffect textKey="help.wolf" />}
      {item.id === Spirit.Squirrel && <SpiritEffect textKey="help.squirrel" />}
      {item.id === Spirit.Bird && <SpiritEffect textKey="help.bird" />}
      {item.id === Spirit.Lizard && <SpiritEffect textKey="help.salamander" />}
      {item.id === Spirit.Butterfly && <SpiritEffect textKey="help.butterfly" />}
      {item.id === Spirit.EvilBeaver && <SpiritEffect textKey="help.spirit-evil" />}
      <p><Trans defaults="help.spirit.timing"><strong/></Trans></p>
    </>
  )
}

const SpiritEffect = ({ textKey }: { textKey: string })  => <p css={textWithIconCss}>
  <Trans defaults={textKey}>
    <strong/>
    <i/>
    <span css={iconCss(Victory)}/>
    <span css={iconCss(Fire)}/>
  </Trans>
</p>


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