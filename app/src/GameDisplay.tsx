/** @jsxImportSource @emotion/react */
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
      yMin={-30}
      yMax={15}
      margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
      //css={css`background-color: rgba(255, 255, 255, 0.5)`}
    >
      <GameTableNavigation/>
      <PlayerPanels/>
    </GameTable>
  </>
}
