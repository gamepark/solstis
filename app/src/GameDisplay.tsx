import { css } from '@emotion/react'
import { DevToolsHub, GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return <>
    <GameTable
      xMin={-36}
      xMax={45}
      yMin={-25}
      yMax={15}
      margin={{ top: 7, left: 0, right: 0, bottom: 0 }}
    >
      <GameTableNavigation css={navigationCss} scaleStep={0.08}/>
      <PlayerPanels/>
      {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(5em)"/>}
    </GameTable>
  </>
}

const navigationCss = css`
  right: 1em;
  left: unset;
  top: 20em
`