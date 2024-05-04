/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { SolstisRules } from '@gamepark/solstis/SolstisRules'
import { useTranslation } from 'react-i18next'

export const DeerHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<SolstisRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = player && player === activePlayer
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <>{t('header.deer.you')}</>
  }

  return <>{t('header.deer.player', { player: name })}</>
}
