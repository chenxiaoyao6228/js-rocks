import { mySetInterval, sleep, series, parallel } from './index.finish.js'
describe('async', () => {
  test('sleep', async () => {
    let now = new Date()
    await sleep(300)
    let then = new Date()
    expect(then - now).toBeGreaterThanOrEqual(300)
    expect(then - now).toBeLessThan(350)
  })

  describe('series', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })
    afterEach(() => {
      jest.clearAllTimers()
    })
    test('series', () => {
      let testStr = ''
      series([
        function(next) {
          setTimeout(() => {
            testStr += 'Hello'
            next(testStr)
          }, 100)
        },
        function(next) {
          setTimeout(() => {
            testStr += ' world'
            next()
          }, 100)
        }
      ])
      expect(testStr).toEqual('')
      jest.advanceTimersByTime(100)
      expect(testStr).toEqual('Hello')
      jest.advanceTimersByTime(100)
      expect(testStr).toEqual('Hello world')
    })
  })

  describe('parallel', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })
    afterEach(() => {
      jest.clearAllTimers()
    })
    test('parallel', () => {
      let fn = jest.fn()
      parallel(
        [
          function(resolve) {
            setTimeout(() => {
              resolve(1)
            }, 300)
          },
          function(resolve) {
            setTimeout(() => {
              resolve(2)
            }, 200)
          },
          function(resolve) {
            setTimeout(() => {
              resolve(3)
            }, 100)
          }
        ],
        function(res) {
          fn(res)
        }
      )
      expect(fn).not.toHaveBeenCalled()
      jest.runAllTimers()
      expect(fn).toHaveBeenCalledWith([1, 2, 3])
    })
  })

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
})
