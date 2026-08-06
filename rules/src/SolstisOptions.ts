import { OptionsSpecV2 } from '@gamepark/rules-api'

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
 * What Solstis is: a two-player game with two independent variants, one pair of
 * which cannot be played together.
 *
 * That last part is the only thing `validate` said, and it is said here as a
 * cross rule. Nothing is lost in the translation: `when` names the two options,
 * which is exactly the field list `OptionsValidationError` carried, and
 * `message` keeps the same i18n key — resolved in Solstis's own namespace, since
 * a v2 spec carries keys and never text.
 *
 * Also absent, and deliberately: `subscriberRequired` on the game and
 * `competitiveDisabled` on `beginner`. Those are the platform's call, held in
 * its database so they can change without releasing Solstis again.
 */
export const SolstisOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 2 },
  options: {
    beginner: { kind: 'boolean' },
    firefly: { kind: 'boolean' }
  },
  rules: [
    {
      type: 'forbidden-combination',
      when: [
        { option: 'beginner', values: [true] },
        { option: 'firefly', values: [true] }
      ],
      message: 'firefly-no-beginner'
    }
  ]
}
