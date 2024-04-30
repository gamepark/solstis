import { LocationStrategy, Material, MaterialItem } from '@gamepark/rules-api'

/**
 * This strategy attributes the first gap in a sequence
 */
export class FillQueueGapStrategy<P extends number = number, M extends number = number, L extends number = number> implements LocationStrategy<P, M, L> {
  axis: 'x' | 'y' | 'z'

  constructor(axis: 'x' | 'y' | 'z' = 'x') {
    this.axis = axis
  }

  addItem(material: Material<P, M, L>, item: MaterialItem<P, L>): void {
    if (item.location[this.axis] === undefined) {
      const items = material
        .filter((i) => !i.location?.z)
        .sort(item => item.location[this.axis]!).getItems()
      let position = 0
      while (items[position]?.location[this.axis] === position) {
        position++
      }
      item.location[this.axis] = position
    }
  }
}
