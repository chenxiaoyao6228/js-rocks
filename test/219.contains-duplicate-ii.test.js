const { containsNearbyDuplicate } = require('../src/219.contains-duplicate-ii')

describe('containsNearbyDuplicate', () => {
  test.each`
    a                     | b    | expected
    ${[1, 2, 3, 1]}       | ${3} | ${true}
    ${[1, 0, 1, 1]}       | ${1} | ${true}
    ${[1, 2, 3, 1, 2, 3]} | ${2} | ${false}
  `(
    'containsNearbyDuplicate(a,b) should return (expected)',
    ({ a, b, expected }) => {
      expect(containsNearbyDuplicate(a, b)).toBe(expected)
    }
  )
})
