/** @jsxImportSource @emotion/react */
import { useGame, usePlayerId, usePlayerName, usePlayers, useResultText } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { ScoringHelper } from '@gamepark/solstis/rules/scoring/ScoringHelper'
import { Trans } from 'react-i18next'


export const GameOverHeader = () => {
  const resultText = useResultText()
  const game = useGame<MaterialGame>()!
  const playerId = usePlayerId()
  const players = usePlayers({ sortFromMe: true })
  const first = players[0].id
  const second = players[1].id
  const firstName = usePlayerName(first)
  const secondName = usePlayerName(second)
  const firstScoring = new ScoringHelper(game, first)
  const secondScoring = new ScoringHelper(game, second)

  if (firstScoring.hasWinByFireflies || secondScoring.hasWinByFireflies) {
    if (first === playerId || second === playerId) return <Trans default="game-over.win.firefly"/>
    return <Trans default="game-over.win.firefly.player" values={{ player: firstScoring.hasWinByFireflies ? firstName : secondName }}/>
  }

  return <>
    <span>{resultText}</span>
  </>
}
