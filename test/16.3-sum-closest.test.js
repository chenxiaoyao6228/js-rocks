import { threeSumClosest } from '../src/16.3-sum-closest'

test.each`
  a                    | b    | expected
  ${[]}                | ${1} | ${0}
  ${[-1]}              | ${1} | ${0}
  ${[-1, 2]}           | ${1} | ${0}
  ${[-1, 2, 1, 4]}     | ${1} | ${2}
  ${[1, 1, -1, -1, 3]} | ${3} | ${3}
`('threeSumClosest($a,$b) should return ($expected)', ({ a, b, expected }) => {
  expect(threeSumClosest(a, b)).toBe(expected)
})
