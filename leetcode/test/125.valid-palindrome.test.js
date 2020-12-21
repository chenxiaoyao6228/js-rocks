const { isPalindrome } = require('../src/125.valid-palindrome')

test.each([
  ['', true],
  ['p', true],
  ['0', true],
  ['0p', false],
  ['0p0', true],
  ['A man, a plan, a canal: Panama', true],
  ['race a car', false]
])('isPalindrome(%d)', (input, expected) => {
  expect(isPalindrome(input)).toBe(expected)
})
