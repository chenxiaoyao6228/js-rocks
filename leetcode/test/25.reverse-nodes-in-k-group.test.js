const { reverseKGroup } = require('../src/25.reverse-nodes-in-k-group')
const { createList } = require('../src/utils/linked-list')

describe('reverseKGroup', () => {
  test('test with no left-out, that means: length / k === 0', () => {
    let list = createList(1, 2, 3, 4)
    let compareList = createList(2, 1, 4, 3)
    let expected = reverseKGroup(list, 2)
    expect(expected).toEqual(compareList)
  })
  test('test with left-out nodes remain as it is', () => {
    let list = createList(1, 2, 3, 4, 5)
    let compareList = createList(3, 2, 1, 4, 5)
    let expected = reverseKGroup(list, 3)
    expect(expected).toEqual(compareList)
  })
})
