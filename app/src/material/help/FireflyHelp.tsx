/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialHelpProps, shadowCss } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import Victory from '../../images/icons/victory.png'

export const FireflyHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <h2>
        <Trans defaults="help.firefly" />
      </h2>
      <p css={textWithIconCss}>
        <Trans defaults="help.firefly.desc" components={{
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
