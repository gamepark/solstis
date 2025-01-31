import { FireScoring } from './FireScoring'

export class LadybugScoring extends FireScoring {
  isValidFire(flameArea: number, panoramaAreas: number[][]): boolean {
    return flameArea === 0 || !panoramaAreas[0].includes(flameArea)
  }
}
