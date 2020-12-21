const {
  containsNearbyAlmostDuplicate
} = require('../src/220.contains-duplicate-iii')

describe('containsNearbyAlmostDuplicate', () => {
  test.each`
    a                     | b    | c    | expected
    ${[7, 1, 3]}          | ${2} | ${3} | ${true}
    ${[1, 5, 9, 1, 5, 9]} | ${2} | ${3} | ${false}
    ${[1, 2, 3, 1]}       | ${3} | ${0} | ${true}
    ${[1, 0, 1, 1]}       | ${1} | ${2} | ${true}
    ${[0]}                | ${0} | ${0} | ${false}
    ${[1, 2]}             | ${0} | ${1} | ${false}
  `(
    'containsNearbyAlmostDuplicate($a, $b, $c) should return ($expected)',
    ({ a, b, c, expected }) => {
      expect(containsNearbyAlmostDuplicate(a, b, c)).toBe(expected)
    }
  )
})
