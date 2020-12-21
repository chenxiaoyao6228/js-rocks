const {
  findMedianSortedArrays
} = require('../src/4.median-of-two-sorted-arrays')

describe('test ', () => {
  test('should return the right median', () => {
    expect(findMedianSortedArrays([1, 3, 5], [2, 4, 6])).toBe(3.5)
    expect(findMedianSortedArrays([], [2, 4, 6])).toBe(4)
    expect(findMedianSortedArrays([2, 4, 6], [])).toBe(4)
    expect(findMedianSortedArrays([1, 3, 5], [2, 4, 6, 8, 10])).toBe(4.5)
  })
})
