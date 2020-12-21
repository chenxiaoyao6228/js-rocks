import { GildedRose } from './Gildedrose'
import { Item } from './Item'

describe("Gilded Rose", function () {

  test("should foo", function () {
    const gildedRose = new GildedRose([Item.createItem("foo", 0, 0)])
    const items = gildedRose.passOneDay()
    expect(items[0].name).toEqual("foo")
  })

  test("should double cincrease backstage pass value when getting close to expiration", () => {
    const item: Item = Item.createBackStagePass(11, 20)
    item.passOneDay()
    expect(item.quality).toBe(21)
    item.passOneDay()
    expect(item.quality).toBe(23)
  })
  test('should return the right answer', () => {
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
    const oldLog = console.log
    let str = ''
    console.log = (msg) => {
      str += msg ? msg : ''
    }

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

    // add baseline security
    // oldLog(str)
    const output = `-------- day 0 --------name, sellIn, quality+5 Dexterity Vest 10 20Aged Brie 2 0Elixir of the Mongoose 5 7Sulfuras, Hand of Ragnaros 0 80Sulfuras, Hand of Ragnaros -1 80Backstage passes to a TAFKAL80ETC concert 15 20Backstage passes to a TAFKAL80ETC concert 10 49Backstage passes to a TAFKAL80ETC concert 5 49Conjured Mana Cake 3 6-------- day 1 --------name, sellIn, quality+5 Dexterity Vest 9 19Aged Brie 1 1Elixir of the Mongoose 4 6Sulfuras, Hand of Ragnaros 0 80Sulfuras, Hand of Ragnaros -1 80Backstage passes to a TAFKAL80ETC concert 14 21Backstage passes to a TAFKAL80ETC concert 9 50Backstage passes to a TAFKAL80ETC concert 4 50Conjured Mana Cake 2 5`
    expect(str).toEqual(output)
  })
})

