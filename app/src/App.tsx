/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { GameOverHeader } from './headers/GameOverHeader'
import { Headers } from './headers/Headers'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      { !!game && <GameDisplay players={game.players.length} /> }
      <LoadingScreen display={loading} author={['Bruno Cathala', 'Corentin Lebrat']} artist="Manu Gorobeï" publisher="Lumberjacks" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading} GameOver={GameOverHeader}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}
