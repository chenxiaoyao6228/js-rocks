const { maxPoints } = require('../src/149.max-points-on-a-line')

describe('Max points', () => {
  test('basic ', () => {
    expect(
      maxPoints([
        [1, 1],
        [2, 2],
        [3, 3]
      ])
    ).toEqual(3)
    expect(
      maxPoints([
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4]
      ])
    ).toEqual(4)
    expect(
      maxPoints([
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5]
      ])
    ).toEqual(5)
  })
  test('test x1 - x0 = 0', () => {
    expect(
      maxPoints([
        [1, 1],
        [1, 4],
        [1, 2],
        [1, 3],
        [4, 1],
        [2, 3],
        [2, 2]
      ])
    ).toEqual(4)
  })
  test('with number overlap', () => {
    expect(
      maxPoints([
        [1, 1],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [1, 1]
      ])
    ).toEqual(7)
    expect(
      maxPoints([
        [1, 1],
        [1, 1],
        [1, 1]
      ])
    ).toEqual(3)
  })
  test('with two,  one and zero element ', () => {
    expect(
      maxPoints([
        [1, 1],
        [2, 2]
      ])
    ).toEqual(2)
    expect(maxPoints([[1, 1]])).toEqual(1)
    expect(maxPoints([])).toEqual(0)
  })
})
