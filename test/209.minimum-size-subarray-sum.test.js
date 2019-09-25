const { minSubArrayLen } = require('../src/209.minimum-size-subarray-sum')

describe('minSubArrayLen', () => {
  test('minSubArrayLen', () => {
    expect(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])).toEqual(2)
    expect(minSubArrayLen(7, [2])).toEqual(0)
  })
})

//  test.each([[7, [2, 3, 1, 2, 4, 3], 2], [7, [1, 2], 0], [7, [1], 0]])(
