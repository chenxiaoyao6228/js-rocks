const { insertionSortList } = require('../src/147.insertion-sort-list')
const { createList } = require('../src/utils/linked-list')

describe('insertion', () => {
  test('case1', () => {
    let list = createList(4, 2, 1, 3)
    let compareList = createList(1, 2, 3, 4)
    let expected = insertionSortList(list)
    expect(expected).toEqual(compareList)
  })
  test('case2', () => {
    let list = createList(-1, 5, 3, 4, 0)
    let compareList = createList(-1, 0, 3, 4, 5)
    let expected = insertionSortList(list)
    expect(expected).toEqual(compareList)
  })
})
