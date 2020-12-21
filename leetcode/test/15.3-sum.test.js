const { threeSum } = require('../src/15.3-sum')

describe('three sum', () => {
  test('should return a two dimension array', () => {
    // expect(threeSum([-10, -1, 0, 1, 2, -1, -4])).toEqual([
    //   [-1, -1, 2],
    //   [-1, 0, 1]
    // ])
    expect(threeSum([-2, 0, 0, 2, 2])).toEqual([[-2, 0, 2]])
    expect(threeSum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6])).toEqual(
      [
        [-4, -2, 6],
        [-4, 0, 4],
        [-4, 1, 3],
        [-4, 2, 2],
        [-2, -2, 4],
        [-2, 0, 2]
      ]
    )
  })
})
