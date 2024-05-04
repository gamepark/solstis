/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { SolstisRules } from '@gamepark/soltis/SolstisRules'
import { useTranslation } from 'react-i18next'

export const BeetleHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<SolstisRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = player && player === activePlayer
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <>{t('header.beetle.you')}</>
  }

  return <>{t('header.beetle.player', { player: name })}</>
}
