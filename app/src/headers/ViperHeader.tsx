/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { SolstisRules } from '@gamepark/solstis/SolstisRules'
import { useTranslation } from 'react-i18next'

export const ViperHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<SolstisRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const itsMe = player && player === activePlayer
  const opponent = rules.game.players.find((p) => p !== activePlayer)
  const playerName = usePlayerName(activePlayer)
  const targetName = usePlayerName(opponent)

  if (!player) {
    return <>{t('header.viper.spectator', { player: playerName, opponent: targetName })}</>
  }

  if (itsMe) {
    return <>{t('header.viper.you', { opponent: targetName })}</>
  }

  return <>{t('header.viper.player', { player: playerName })}</>
}
