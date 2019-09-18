const { reverse } = require('../src/7.reverse-integer')

describe('reverse integer', () => {
  test('should reverse the correct num', () => {
    expect(reverse(123)).toBe(321)
  })
})
