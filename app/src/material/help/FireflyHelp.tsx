import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const FireflyHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <h2>
        <Trans defaults="help.firefly" />
      </h2>
      <p>
        <Trans defaults="help.firefly.desc" />
      </p>
    </>
  )
}
