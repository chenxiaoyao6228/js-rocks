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
})
