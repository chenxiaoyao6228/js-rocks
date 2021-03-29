import MPromise from './index.finish'

describe('MPromise', () => {
  test('is a function', () => {
    expect(MPromise instanceof Function).toBe(true)
  })
  test('expects a function as an argument', () => {
    expect(() => {
      MPromise()
    }).toThrow()
  })
  test('can resolve a promise', async () => {
    let promiseSpy = jest.fn()
    let promise = new MPromise(resolve => {
      resolve('a-ok')
    })

    promise.then(promiseSpy)
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(promiseSpy).toHaveBeenCalledWith('a-ok')
  })
  test('may only be resolved once', async () => {
    let promiseSpy = jest.fn()
    let promise = new MPromise(resolve => {
      resolve(42)
      resolve(43)
    })
    promise.then(promiseSpy)
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(promiseSpy.mock.calls.length).toEqual(1)
    expect(promiseSpy).toHaveBeenCalledWith(42)
  })
  test('may have multiple callbacks', async () => {
    let firstSpy = jest.fn()
    let secondSpy = jest.fn()
    let promise = new MPromise(resolve => {
      resolve(42)
    })
    promise.then(firstSpy)
    promise.then(secondSpy)
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(firstSpy).toHaveBeenCalledWith(42)
    expect(secondSpy).toHaveBeenCalledWith(42)
  })
})
