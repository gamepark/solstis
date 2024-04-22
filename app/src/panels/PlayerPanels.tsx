/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { SolstisRules } from '@gamepark/soltis/SolstisRules'
import { FC } from 'react'
import { createPortal } from 'react-dom'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<SolstisRules>()!
  const playerId = usePlayerId()
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player) =>
        <StyledPlayerPanel key={player.id} player={player} css={(player.id === (playerId ?? rules.players[0]))? leftCss: rightCss} timerOnRight/>
      )}
    </>,
    root
  )
}

const rightCss = css`
  position: absolute;
  top: 8.5em;
  right: 1em;
`


const leftCss = css`
  position: absolute;
  top: 8.5em;
  left: 1em;
`