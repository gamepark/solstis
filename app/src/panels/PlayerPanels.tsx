/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { ScoringHelper } from '@gamepark/solstis/rules/scoring/ScoringHelper'
import { SolstisRules } from '@gamepark/solstis/SolstisRules'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import Victory from '../images/icons/victory.png'
import Player1BG from '../images/panels/player-1.jpg'
import Player2BG from '../images/panels/player-2.jpg'

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
          css={(player.id === (playerId ?? rules.players[0])) ? leftCss : rightCss}
          mainCounter={!rules.game?.rule?.id ? { imageCss: css`border: 0`, image: Victory, value: new ScoringHelper(rules.game, player.id).score } : undefined}
          backgroundImage={player.id === 1? Player1BG: Player2BG}
          timerOnRight={!!rules.game?.rule?.id}/>
      )}
    </>,
    root
  )
}

const widthCss = css`
  width: 27em;
`

const rightCss = css`
  position: absolute;
  top: 8.5em;
  right: 1em;
  ${widthCss}
`


const leftCss = css`
  position: absolute;
  top: 8.5em;
  left: 1em;
  ${widthCss}
`