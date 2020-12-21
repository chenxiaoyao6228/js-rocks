const {
  lengthOfLongestSubstring
} = require('../src/3.longest-substring-without-repeating-characters')
describe('longest substring', () => {
  test.each([
    ['abba', 2],
    ['abcabcbb', 3],
    ['bbbbb', 1],
    ['pwwkewr', 4],
    ['pwwkew', 3]
  ])('lengthOfLongestSubstring(%s) should output (%i)', (input, expected) => {
    expect(lengthOfLongestSubstring(input)).toBe(expected)
  })
})
