/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { ScoringHelper } from '@gamepark/soltis/rules/scoring/ScoringHelper'
import { SolstisRules } from '@gamepark/soltis/SolstisRules'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import Victory from '../images/icons/victory.png'

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
        <StyledPlayerPanel
          key={player.id}
          player={player}
          css={(player.id === (playerId ?? rules.players[0]))? leftCss: rightCss}

          mainCounter={!rules.game?.rule?.id? { imageCss: css`border: 0`, image: Victory, value: new ScoringHelper(rules.game, player.id).score }: undefined}
          timerOnRight={!!rules.game?.rule?.id}/>
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