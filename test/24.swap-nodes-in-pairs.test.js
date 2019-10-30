const { swapPairs } = require('./../src/24.swap-nodes-in-pairs')
const { ListNode, createList } = require('../src/utils/linked-list')

describe('swapPairs', () => {
  test('should create a simple list', () => {
    let compareList = new ListNode(1)
    compareList.next = new ListNode(2)
    compareList.next.next = new ListNode(3)
    compareList.next.next.next = new ListNode(4)
    expect(createList(1, 2, 3, 4)).toEqual(compareList)
  })
  test('swap nodes in pairs', () => {
    let originList = createList(1, 2, 3, 4)
    let comparedList = createList(2, 1, 4, 3)
    expect(swapPairs(originList)).toEqual(comparedList)
  })
})
