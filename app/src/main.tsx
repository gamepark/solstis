import { css, Global } from '@emotion/react'
import { GameProvider } from '@gamepark/react-game'
import { SolstisOptionsSpec } from '@gamepark/solstis/SolstisOptions'
import { SolstisRules } from '@gamepark/solstis/SolstisRules'
import { SolstisSetup } from '@gamepark/solstis/SolstisSetup'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { solstisAnimations } from './animations/SolstisAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { SolstisScoring } from './scoring/SolstisScoring'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="solstis"
      Rules={SolstisRules}
      optionsSpec={SolstisOptionsSpec}
      GameSetup={SolstisSetup}
      material={Material}
      locators={Locators}
      animations={solstisAnimations}
      scoring={new SolstisScoring()}
      tutorial={new Tutorial()}
    >
      <App />
      <Global styles={css`#root{ background: #19a8e0 !important;}`} />
    </GameProvider>
  </StrictMode>
)
