const { intersection } = require('../src/349.intersection-of-two-arrays')

test('should handle empty array', () => {
  expect(intersection([1, 2, 2, 1], [])).toEqual([])
  expect(intersection([], [2, 2])).toEqual([])
})
test('should return intersection in two arrays', () => {
  expect(intersection([1, 2, 2, 1], [2, 2])).toEqual([2])
})
