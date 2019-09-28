const { findAnagrams } = require('../src/438.find-all-anagrams-in-a-string')

describe('findAnagrams', () => {
  test('findAnagrams', () => {
    expect(findAnagrams('cbaebabacd', 'abc')).toEqual([0, 6])
    expect(findAnagrams('abab', 'ab')).toEqual([0, 1, 2])
  })
})
