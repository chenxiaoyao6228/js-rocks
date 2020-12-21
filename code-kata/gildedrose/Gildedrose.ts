import { Item } from './Item'

export class GildedRose {
  items: Array<Item>
  constructor(items = [] as Array<Item>) {
    this.items = items;
  }
  passOneDay(): void {
    for (let i = 0; i < this.items.length; i++) {
       this.items[i].passOneDay()
    }
    return this.items
  }
}