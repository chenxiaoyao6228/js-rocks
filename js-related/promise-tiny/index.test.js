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
  // resolve
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

  // rejected
  test('can reject a promise', async () => {
    let promise = new MPromise((resolve, reject) => {
      reject('fail')
    })
    let fulfillSpy = jest.fn()
    let rejectSpy = jest.fn()
    promise.then(fulfillSpy, rejectSpy)
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(fulfillSpy).not.toHaveBeenCalled()
    expect(rejectSpy).toHaveBeenCalledWith('fail')
  })
  test('can reject just once', async () => {
    let rejectSpy = jest.fn()
    let rejectRef
    let promise = new MPromise((resolve, reject) => {
      reject('fail')
      rejectRef = reject
    })
    promise.then(null, rejectSpy)

    await new Promise(resolve => setTimeout(resolve, 1))
    expect(rejectSpy.mock.calls.length).toEqual(1)

    rejectRef('fail again')
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(rejectSpy.mock.calls.length).toEqual(1)
  })
  test('cannot fulfill a promise once rejected', async () => {
    let resolveRef, rejectRef
    let promise = new MPromise((resolve, reject) => {
      resolveRef = resolve
      rejectRef = reject
    })
    let fulfillSpy = jest.fn()
    let rejectSpy = jest.fn()

    promise.then(fulfillSpy, rejectSpy)
    rejectRef('fail')
    await new Promise(resolve => setTimeout(resolve, 1))
    resolveRef('success')
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(fulfillSpy).not.toHaveBeenCalled()
  })

  // catch
  test('can register rejection handler with catch', async () => {
    let promise = new MPromise((resolve, reject) => {
      reject('fail')
    })
    let rejectSpy = jest.fn()
    promise.catch(rejectSpy)
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(rejectSpy).toHaveBeenCalled()
  })

  // finally
  test('invokes a finally handler when fulfilled', async () => {
    let promise = new MPromise(resolve => {
      resolve('ok')
    })
    let finallySpy = jest.fn()
    promise.finally(finallySpy)
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(finallySpy).toHaveBeenCalledWith('ok')
  })
  test('invokes a finally handler when rejected', async () => {
    let promise = new MPromise((resolve, reject) => {
      reject('fail')
    })
    let finallySpy = jest.fn()
    promise.finally(finallySpy)
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(finallySpy).toHaveBeenCalledWith('fail')
  })
})
