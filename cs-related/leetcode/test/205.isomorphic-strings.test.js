import { isIsomorphic } from '../src/205.isomorphic-strings'

test.each`
  a          | b          | expected
  ${'paper'} | ${'title'} | ${true}
  ${'a'}     | ${'a'}     | ${true}
  ${'a'}     | ${'b'}     | ${true}
  ${'ab'}    | ${'aa'}    | ${false}
  ${'egg'}   | ${'add'}   | ${true}
  ${'foo'}   | ${'bar'}   | ${false}
`('isIsomorphic($a,$b) should return ($expected)', ({ a, b, expected }) => {
  expect(isIsomorphic(a, b)).toBe(expected)
})
