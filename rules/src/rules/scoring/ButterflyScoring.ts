import { FireScoring } from './FireScoring'

export class ButterflyScoring extends FireScoring {

  isValidFire(flameArea: number, panoramaAreas: number[][]): boolean {
    return flameArea !== 0 && panoramaAreas[0].includes(flameArea)
  }
}
