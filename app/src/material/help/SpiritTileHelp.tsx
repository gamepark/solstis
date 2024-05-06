/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { MaterialHelpProps, shadowCss } from '@gamepark/react-game'
import { Spirit } from '@gamepark/solstis/material/Spirit'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Fire from '../../images/icons/fire.png'
import Victory from '../../images/icons/victory.png'

export const SpiritTileHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  return (
    <>
      <h2>{t('help.spirit')}</h2>
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

const SpiritEffect = ({ textKey }: { textKey: string })  => <p css={textWithIconCss}><Trans defaults={textKey}><strong/><i/><span css={iconCss(Fire)}/><span
  css={iconCss(Victory)}/></Trans></p>


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