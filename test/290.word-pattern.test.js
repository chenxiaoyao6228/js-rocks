const { wordPattern } = require('../src/290.word-pattern')

test.each`
  a         | b                     | expected
  ${'abba'} | ${'dog cat cat dog'}  | ${true}
  ${'abba'} | ${'dog cat cat fish'} | ${false}
  ${'aaaa'} | ${'dog cat cat dog'}  | ${false}
  ${'abba'} | ${'dog dog dog dog'}  | ${false}
  ${'aaa'}  | ${'aa aa aa aa'}      | ${false}
`('($a,$b) should return $expected', ({ a, b, expected }) => {
  expect(wordPattern(a, b)).toBe(expected)
})
