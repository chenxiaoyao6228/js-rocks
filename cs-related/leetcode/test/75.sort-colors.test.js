const { sortColors } = require('../src/75.sort-colors')

describe('sorted color', () => {
  test('sortColors', () => {
    let n1 = [2, 0, 2, 1, 1, 0]
    sortColors(n1)
    expect(n1).toEqual([0, 0, 1, 1, 2, 2])
  })
})
