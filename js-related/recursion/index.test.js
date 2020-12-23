import { getRandomNums } from './'

describe('recursion', () => {
  test('getRandomNumber', () => {
    expect(() => getRandomNums('a')).toThrow()
    expect(() => getRandomNums(1.5)).toThrow()
    expect(() => getRandomNums(-1)).toThrow()
    for (let i = 0; i < 10; i++) {
      let res = getRandomNums(5)
      expect(res.length).toEqual(5)
      expect([...new Set(res)].length).toEqual(5)
    }
  })
})
