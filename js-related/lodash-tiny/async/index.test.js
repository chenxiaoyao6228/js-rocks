import { mySetInterval } from './index.finish.js'
describe('async', () => {
  describe('mySetInterval', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })
    afterEach(() => {
      jest.clearAllTimers()
    })
    test('mySetInterval', () => {
      let callback = jest.fn()
      mySetInterval(callback, 1000)

      expect(callback).not.toBeCalled()
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)

      jest.advanceTimersByTime(1000)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenCalledTimes(2)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)

      jest.advanceTimersByTime(1000)
      expect(callback).toHaveBeenCalledTimes(2)
      expect(setTimeout).toHaveBeenCalledTimes(3)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
    })
  })
  // test('sleep', () => {
  // sleep()
  // let callback = jest.fn()
  // expect(callback).not.toBeCalled()
  // jest.advanceTimersByTime(1000)
  // expect(callback).not.toBeCalled()
  // jest.advanceTimersByTime(1000)
  // expect(callback).not.toBeCalled()
  // jest.advanceTimersByTime(10000)
  // })
})
