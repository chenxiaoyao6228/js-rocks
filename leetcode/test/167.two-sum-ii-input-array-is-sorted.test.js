const { twoSum } = require('../src/167.two-sum-ii-input-array-is-sorted')

test('twoSum', () => {
  expect(twoSum([2, 7, 11, 15], 9)).toEqual([1, 2])
  expect(twoSum([2, 7, 11, 15, 17, 19, 22, 30], 45)).toEqual([4, 8])
  expect(() => {
    twoSum([2, 7, 11, 15, 17, 19, 22, 30], 48)
  }).toThrow('invalid input with no solutions')
})
