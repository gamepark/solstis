/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ScoringDescription } from '@gamepark/react-client'
import { Spirit } from '@gamepark/solstis/material/Spirit'
import { Memory } from '@gamepark/solstis/rules/Memory'
import { ScoringHelper } from '@gamepark/solstis/rules/scoring/ScoringHelper'
import { SolstisRules } from '@gamepark/solstis/SolstisRules'
import { Trans } from 'react-i18next'


enum ScoringKeys {
  MaxSurface = 1,
  Fire,
  Spirit,
  Bee,
  Bird,
  Butterfly,
  Ladybug,
  Lizard,
  Wolf,
  Cow,
  Phoenix,
  Fireflies,
  Total
}

export class SolstisScoring implements ScoringDescription {
  getScoringKeys(rules: SolstisRules) {
    const players = rules.players
    const first = players[0]
    const second = players[1]
    const firstScoring = new ScoringHelper(rules.game, first)
    const secondScoring = new ScoringHelper(rules.game, second)
    const haveScoring = (id: Spirit) => {
      return firstScoring.hasSpirit(id) || secondScoring.hasSpirit(id)
    }

    const keys = [
      ScoringKeys.MaxSurface,
      ScoringKeys.Fire,
      ScoringKeys.Spirit,
    ]

    if (haveScoring(Spirit.Bee)) keys.push(ScoringKeys.Bee)
    if (haveScoring(Spirit.Bird)) keys.push(ScoringKeys.Bird)
    if (haveScoring(Spirit.Butterfly)) keys.push(ScoringKeys.Butterfly)
    if (haveScoring(Spirit.Ladybug)) keys.push(ScoringKeys.Ladybug)
    if (haveScoring(Spirit.Lizard)) keys.push(ScoringKeys.Lizard)
    if (haveScoring(Spirit.Wolf)) keys.push(ScoringKeys.Wolf)

    if (rules.remind(Memory.FireflyExt)) {
      if (haveScoring(Spirit.Cow)) keys.push(ScoringKeys.Cow)
      if (haveScoring(Spirit.Phoenix)) keys.push(ScoringKeys.Phoenix)
      keys.push(ScoringKeys.Fireflies)
    }

    keys.push(ScoringKeys.Total)

    return keys
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.MaxSurface:
        return <Trans defaults="game-over.surface.points" />;
      case ScoringKeys.Fire:
        return <Trans defaults="game-over.fire.lighten" />;
      case ScoringKeys.Spirit:
        return <Trans defaults="game-over.spirit.points" />;
      case ScoringKeys.Bee:
        return <Trans defaults="game-over.spirit.bee" />;
      case ScoringKeys.Bird:
        return <Trans defaults="game-over.spirit.bird" />;
      case ScoringKeys.Butterfly:
        return <Trans defaults="game-over.spirit.butterfly" />;
      case ScoringKeys.Ladybug:
        return <Trans defaults="game-over.spirit.ladybug" />;
      case ScoringKeys.Lizard:
        return <Trans defaults="game-over.spirit.lizard" />;
      case ScoringKeys.Wolf:
        return <Trans defaults="game-over.spirit.wolf" />;
      case ScoringKeys.Cow:
        return <Trans defaults="game-over.spirit.cow" />;
      case ScoringKeys.Phoenix:
        return <Trans defaults="game-over.spirit.phoenix" />;
      case ScoringKeys.Fireflies:
        return <Trans defaults="game-over.fireflies.points" />;
      case ScoringKeys.Total:
      default:
        return (
          <div css={[bold, totalCss]}>
            <Trans defaults="game-over.total"/>
          </div>
        )
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: number, rules: SolstisRules) {
    const helper = new ScoringHelper(rules.game, player)
    switch (key) {
      case ScoringKeys.MaxSurface:
        return helper.maxAreaScore
      case ScoringKeys.Fire:
        return helper.lightedFlamesScore
      case ScoringKeys.Spirit:
        return helper.spiritScore
      case ScoringKeys.Bee:
        return helper.getPlayerSpiritScore(Spirit.Bee) ?? '/'
      case ScoringKeys.Bird:
        return helper.getPlayerSpiritScore(Spirit.Bird) ?? '/'
      case ScoringKeys.Butterfly:
        return helper.getPlayerSpiritScore(Spirit.Butterfly) ?? '/'
      case ScoringKeys.Ladybug:
        return helper.getPlayerSpiritScore(Spirit.Ladybug) ?? '/'
      case ScoringKeys.Lizard:
        return helper.getPlayerSpiritScore(Spirit.Lizard) ?? '/'
      case ScoringKeys.Wolf:
        return helper.getPlayerSpiritScore(Spirit.Wolf) ?? '/'
      case ScoringKeys.Cow:
        return helper.getPlayerSpiritScore(Spirit.Cow) ?? '/'
      case ScoringKeys.Phoenix:
        return helper.getPlayerSpiritScore(Spirit.Phoenix) ?? '/'
      case ScoringKeys.Fireflies:
        return helper.firefliesScore
      case ScoringKeys.Total:
      default:
        return helper.score
    }
  }
}

const bold = css`
  font-weight: bold;
`

const totalCss = css`
  display: flex;
  width: 100%;
  height: 1em;
`
