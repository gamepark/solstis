import { css } from '@emotion/react'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import Victory from '../../images/icons/victory.png'

export const FireflyHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <h2>
        <Trans i18nKey="help.firefly" />
      </h2>
      <p css={textWithIconCss}>
        <Trans i18nKey="help.firefly.desc" components={{
          star: <span css={iconCss(Victory)}/>
        }} />
      </p>
    </>
  )
}

const iconCss = (icon: string) => css`
  display: inline-block;
  background: url(${icon}) no-repeat;
  background-size: cover;
  height: 1.4em;
  width: 1.4em;
  margin-left: 0.3em;
  filter: drop-shadow(0 0 0.05em black) drop-shadow(0 0 0.05em black);
`

const textWithIconCss = css`
  > span {
    margin-left: 0;
    margin-bottom: -0.35em;
  }
`
