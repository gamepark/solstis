/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { SolstisOptionsSpec } from '@gamepark/solstis/SolstisOptions'
import { SolstisRules } from '@gamepark/solstis/SolstisRules'
import { SolstisSetup } from '@gamepark/solstis/SolstisSetup'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { solstisAnimations } from './animations/SolstisAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="solstis"
      Rules={SolstisRules}
      optionsSpec={SolstisOptionsSpec}
      GameSetup={SolstisSetup}
      material={Material}
      locators={Locators}
      animations={solstisAnimations}
      tutorial={new Tutorial()}
    >
      <App/>
      <Global styles={css`#root{ background: #19a8e0 !important;}`} />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
