/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return <>
    <GameTable
      xMin={-35}
      xMax={45}
      yMin={-25}
      yMax={15}
      margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      //css={css`background-color: rgba(255, 255, 255, 0.5)`}
    >
      <GameTableNavigation css={navigationCss} scaleStep={0.08}/>
      <PlayerPanels/>
    </GameTable>
  </>
}

const navigationCss = css`
  right: 1em;
  left: unset;
  top: 20em
`