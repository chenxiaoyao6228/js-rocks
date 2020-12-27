import { isFunction } from '../utils'
import { pipe } from './index.finish'

describe('fp', () => {
  describe('pipe', () => {
    const g = n => n + 1
    const f = n => n * 2
    test('should return a function', () => {
      const fn = pipe(g, f)
      expect(fn).toBeDefined()
      expect(isFunction(fn)).toBe(true)
    })
    test('should call all input function', () => {
      let spyFn1 = jest.fn()
      let spyFn2 = jest.fn()
      let fn = pipe(spyFn1, spyFn2)
      fn()
      expect(spyFn1).toHaveBeenCalled()
      expect(spyFn2).toHaveBeenCalled()
    })
    test('should call pipe result of input function to next function', () => {
      let spyFn1 = jest.fn().mockReturnValue(1)
      let spyFn2 = jest.fn().mockReturnValue(2)
      let spyFn3 = jest.fn().mockReturnValue(3)
      let fn = pipe(spyFn1, spyFn2, spyFn3)
      let res = fn(0)
      expect(spyFn1).toHaveBeenCalledWith(0)
      expect(spyFn2).toHaveBeenCalledWith(1)
      expect(spyFn3).toHaveBeenCalledWith(2)
      expect(res).toEqual(3)
    })
    // TODO auto currying
  })
})
