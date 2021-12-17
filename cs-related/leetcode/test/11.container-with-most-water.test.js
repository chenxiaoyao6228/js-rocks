const { maxArea } = require('../src/11.container-with-most-water')

describe('container with most water', () => {
  test('should return the max number', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49)
  })
})
