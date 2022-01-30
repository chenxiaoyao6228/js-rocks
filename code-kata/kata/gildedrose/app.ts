import { GildedRose } from './Gildedrose'
import { Item } from './Item'

const items = [
  Item.createItem("+5 Dexterity Vest", 10, 20), //
  Item.createAgedBrie(2, 0), //
  Item.createItem("Elixir of the Mongoose", 5, 7), //
  Item.createSulfuras(0, 80), //
  Item.createSulfuras(-1, 80),
  Item.createBackStagePass(15, 20),
  Item.createBackStagePass(10, 49),
  Item.createBackStagePass(5, 49),
  // this conjured item does not work properly yet
  Item.createItem("Conjured Mana Cake", 3, 6)];

// rewrite console
const gildedRose = new GildedRose(items)
var days = 2;
for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------")
  console.log("name, sellIn, quality")
  items.forEach(element => {
    console.log(element.name + ' ' + element.sellIn + ' ' + element.quality)

  })
  console.log()
  gildedRose.passOneDay()
}
    
