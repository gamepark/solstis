/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons/faCircleQuestion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, pointerCursorCss, RulesDialog, shadowCss, useGame, usePlayerName, usePlayers, useResultText } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { Spirit } from '@gamepark/solstis/material/Spirit'
import { ScoringHelper } from '@gamepark/solstis/rules/scoring/ScoringHelper'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Victory from '../images/icons/victory.png'


export const GameOverHeader = () => {
  const resultText = useResultText()
  const game = useGame<MaterialGame>()!
  const [dialogOpen, setDialogOpen] = useState(false)
  const players = usePlayers({ sortFromMe: true })
  const { t } = useTranslation()
  const first = players[0].id
  const second = players[1].id
  const firstName = usePlayerName(first)
  const secondName = usePlayerName(second)
  const firstScoring = new ScoringHelper(game, first)
  const secondScoring = new ScoringHelper(game, second)

  const haveSpirit = (id: Spirit) => {
    return firstScoring.hasSpirit(id) || secondScoring.hasSpirit(id)
  }


  return <>
    <span>{resultText}&nbsp;<FontAwesomeIcon icon={faCircleQuestion} onClick={() => setDialogOpen(true)} css={pointerCursorCss}/></span>
    <RulesDialog css={dialogCss} open={dialogOpen} close={() => setDialogOpen(false)}>
      <h2 css={titleCss}>{t('game-over.detail')}</h2>
      <table css={tableCss}>
        <thead>
          <tr>
            <td css={noBorderCss}></td>
            <td>
              <div css={playerHeadCss}>
                <Avatar playerId={first} css={avatarCss}/>
                {firstName}
              </div>
            </td>
            <td>
              <div css={playerHeadCss}>
                <Avatar playerId={second} css={avatarCss}/>
                {secondName}
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{t('game-over.surface.points')}</td>
          <td>{firstScoring.maxAreaScore ?? 0}</td>
          <td>{secondScoring.maxAreaScore ?? 0}</td>
        </tr>
        <tr>
          <td>{t('game-over.fire.lighten')}</td>
          <td>{firstScoring.lightedFlamesScore ?? 0}</td>
          <td>{secondScoring.lightedFlamesScore ?? 0}</td>
        </tr>
        <tr>
          <td>{t('game-over.spirit.points')}</td>
          <td>{firstScoring.spiritScore ?? 0}</td>
          <td>{secondScoring.spiritScore ?? 0}</td>
        </tr>
        { haveSpirit(Spirit.Bee) && (
        <tr>
          <td>{t('game-over.spirit.bee')}</td>
          <td>{firstScoring.getPlayerSpiritScore(Spirit.Bee) ?? '/'}</td>
          <td>{secondScoring.getPlayerSpiritScore(Spirit.Bee) ?? '/'}</td>
        </tr>
        )}
        { haveSpirit(Spirit.Bird) && (
        <tr>
          <td>{t('game-over.spirit.bird')}</td>
          <td>{firstScoring.getPlayerSpiritScore(Spirit.Bird) ?? '/'}</td>
          <td>{secondScoring.getPlayerSpiritScore(Spirit.Bird) ?? '/'}</td>
        </tr>
        )}
        { haveSpirit(Spirit.Butterfly) && (
        <tr>
          <td>{t('game-over.spirit.butterfly')}</td>
          <td>{firstScoring.getPlayerSpiritScore(Spirit.Butterfly) ?? '/'}</td>
          <td>{secondScoring.getPlayerSpiritScore(Spirit.Butterfly) ?? '/'}</td>
        </tr>
        )}
        { haveSpirit(Spirit.Ladybug) && (
        <tr>
          <td>{t('game-over.spirit.ladybug')}</td>
          <td>{firstScoring.getPlayerSpiritScore(Spirit.Ladybug) ?? '/'}</td>
          <td>{secondScoring.getPlayerSpiritScore(Spirit.Ladybug) ?? '/'}</td>
        </tr>
        )}
        { haveSpirit(Spirit.Lizard) && (
          <tr>
            <td>{t('game-over.spirit.lizard')}</td>
            <td>{firstScoring.getPlayerSpiritScore(Spirit.Lizard) ?? '/'}</td>
            <td>{secondScoring.getPlayerSpiritScore(Spirit.Lizard) ?? '/'}</td>
          </tr>
        )}
        { haveSpirit(Spirit.Wolf) && (
        <tr>
          <td>{t('game-over.spirit.wolf')}</td>
          <td>{firstScoring.getPlayerSpiritScore(Spirit.Wolf) ?? '/'}</td>
          <td>{secondScoring.getPlayerSpiritScore(Spirit.Wolf) ?? '/'}</td>
        </tr>
        )}
        <tr css={boldCss}>
          <td>{t('game-over.total')}</td>
          <td>
            <div css={textWithIconCss}>
              {firstScoring.score} <span css={iconCss(Victory)}/>
            </div>
          </td>
          <td>
            <div css={textWithIconCss}>
              {secondScoring.score} <span css={iconCss(Victory)}/>
            </div>
          </td>
        </tr>

        </tbody>

      </table>
    </RulesDialog>
  </>
}


const tableCss = css`
  border-collapse: collapse;
  font-size: 2.7em;
  width: 100%;

  td {
    padding: 0.5em;
    border: 0.05em solid black;

    &:first-of-type {
      text-align: left;
    }
    text-align: right;
  }
`

const noBorderCss = css`
  border: 0 !important;
`

const avatarCss = css`
  position: relative;
  top: -0em;
  border-radius: 100%;
  height: 2em;
  width: 2em;
  color: black;
  z-index: 1;
`

const playerHeadCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const dialogCss = css`
  padding: 3em;
  padding-top: 0;
`

const titleCss = css`
  font-size: 3em;
  text-align: center;
`

const boldCss = css`
  font-weight: bold;
`

const iconCss = (icon: string) => css`
  display: inline-block;
  background: url(${icon}) no-repeat;
  background-size: cover;
  border-radius: 5em;
  height: 1.4em;
  width: 1.4em;
  margin-left: 0.3em;
  ${shadowCss(icon)}
`

const textWithIconCss = css`
  > span {
    margin-left: 0;
    margin-bottom: -0.35em;
  }
`