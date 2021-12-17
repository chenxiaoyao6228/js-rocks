const { twoSum } = require('../src/1.two-sum')

test('two sum', () => {
  expect(twoSum([2, 1, 7, 9, 5], 9)).toEqual([0, 2])
})
