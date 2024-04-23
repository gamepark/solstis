/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/soltis/rules/RuleId'
import { ComponentType } from 'react'
import { SelectHandTileHeader } from './SelectHandTileHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.SelectHandTile]: SelectHandTileHeader
}