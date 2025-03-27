import { OptionsSpec, OptionsValidationError } from '@gamepark/rules-api'
import { TFunction } from 'i18next'

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type SolstisOptions = {
  players: number;
  beginner: boolean;
  firefly: boolean;
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const SolstisOptionsSpec: OptionsSpec<SolstisOptions> = {
  beginner: {
    label: (t) => t('beginner'),
    help: (t) => t('beginner.help'),
    competitiveDisabled: true
  },
  firefly: {
    label: (t) => t('firefly'),
    help: (t) => t('firefly.help')
  },
  validate: (options: Partial<SolstisOptions>, t: TFunction) => {
    if (options.beginner && options.firefly) {
      throw new OptionsValidationError(t('firefly-no-beginner'), ['beginner', 'firefly'])
    }
  },
  subscriberRequired: true
}
