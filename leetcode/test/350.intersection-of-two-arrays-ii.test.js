const { intersect } = require('../src/350.intersection-of-two-arrays-ii')

test('should handle empty array', () => {
  expect(intersect([1, 2, 2, 1], [])).toEqual([])
  expect(intersect([], [2, 2])).toEqual([])
})
test('should return intersection in two arrays', () => {
  expect(new Set(intersect([1, 2, 2, 1], [2, 2]))).toEqual(new Set([2, 2]))
  expect(new Set(intersect([1, 2, 2, 2, 1], [2, 2, 2]))).toEqual(
    new Set([2, 2, 2])
  )
  expect(new Set(intersect([4, 9, 5], [9, 4, 9, 8, 4]))).toEqual(
    new Set([4, 9])
  )
})
