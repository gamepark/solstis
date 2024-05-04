/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { SolstisRules } from '@gamepark/solstis/SolstisRules'
import { useTranslation } from 'react-i18next'

export const DragonflyHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<SolstisRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = player && player === activePlayer
  const targetName = usePlayerName(rules.game.players.find((p) => p !== activePlayer))

  if (!player) {
    return <>{t('header.dragonfly.spectator', { player: targetName })}</>
  }

  if (itsMe) {
    return <>{t('header.dragonfly.you')}</>
  }

  return <>{t('header.dragonfly.player', { player: targetName })}</>
}
