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

  // chaining
  test('does not require a success handler each time', async () => {
    let promise = new MPromise(resolve => {
      resolve('ok')
    })
    let fulfillSpy = jest.fn()
    let rejectSpy = jest.fn()
    promise.then(fulfillSpy)
    promise.then(null, rejectSpy)
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(fulfillSpy).toHaveBeenCalledWith('ok')
  })
  test('can register rejection handler with catch', async () => {
    let promise = new MPromise((resolve, reject) => {
      reject('fail')
    })
    let rejectSpy = jest.fn()
    promise.catch(rejectSpy)
    await new Promise(resolve => setTimeout(resolve, 1))
    expect(rejectSpy).toHaveBeenCalled()
  })
  test('allows penetrate value to the next promise if the current one has no return value', async () => {
    let promise = new MPromise(resolve => {
      resolve(20)
    })
    let fulfilledSpy = jest.fn()
    promise
      .then()
      .then()
      .then(fulfilledSpy)
    await new Promise(resolve => setTimeout(resolve, 100)) // 100ms保证
    expect(fulfilledSpy).toHaveBeenCalledWith(20)
  })

  test('allows chaining handlers with return value', async () => {
    let resolveRef
    let promise = new MPromise(resolve => {
      resolveRef = resolve
    })
    let fulfilledSpy = jest.fn()
    promise
      .then(result => {
        return result + 1
      })
      .then(result => {
        return result * 2
      })
      .then(fulfilledSpy)
    resolveRef(20)
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(fulfilledSpy).toHaveBeenCalledWith(42)
  })

  // return promise
  test('waits on promise returned from handler', async () => {
    let promise = new MPromise(resolve => {
      resolve(20)
    })
    let fulfilledSpy = jest.fn()
    promise
      .then(v => {
        let promise2 = new MPromise(resolve => {
          resolve(v + 1)
        })
        return promise2
      })
      .then(v => {
        return v * 2
      })
      .then(fulfilledSpy)
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(fulfilledSpy).toHaveBeenCalledWith(42)
  })
  // Promise.resolve
  test('makes an immediately resolved promise with resolve', async () => {
    let fulfilledSpy = jest.fn()
    let rejectedSpy = jest.fn()
    let promise = MPromise.resolve('ok')
    promise.then(fulfilledSpy, rejectedSpy)
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(fulfilledSpy).toHaveBeenCalledWith('ok')
    expect(rejectedSpy).not.toHaveBeenCalled()
  })
  // Promise.reject
  test('can make an immediately rejected promise', async () => {
    let fulfilledSpy = jest.fn()
    let rejectedSpy = jest.fn()
    let promise = MPromise.reject('fail')
    promise.then(fulfilledSpy, rejectedSpy)
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(fulfilledSpy).not.toHaveBeenCalled()
    expect(rejectedSpy).toHaveBeenCalledWith('fail')
  })
})
