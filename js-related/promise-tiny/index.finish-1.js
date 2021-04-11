const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MPromise {
  static resolve(value) {
    return new MPromise(resolve => {
      resolve(value)
    })
  }
  static reject(value) {
    return new MPromise((resolve, reject) => {
      reject(value)
    })
  }
  static all(promises) {
    return new MPromise(resolve => {
      let counter = 0
      let result = []
      promises.forEach((promise, index) => {
        counter++
        promise.then(res => {
          result[index] = res
          counter--
          if (counter === 0) {
            resolve(result)
          }
        })
      })
    })
  }
  static race(promises) {
    return new Promise(resolve => {
      promises.forEach(promise => {
        promise.then(res => {
          resolve(res)
        })
      })
    })
  }
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('Executor must be a function')
    }
    this.status = null
    this.value = null
    this.resolutionCallbacks = []
    this.reason = null
    this.rejectionCallbacks = []
    executor(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve(value) {
    if (this.status === FULFILLED || this.status === REJECTED) return
    if (typeof value.then === 'function') {
      value.then(this.resolve.bind(this), this.reject.bind(this))
    } else {
      this.value = value
      this.status = FULFILLED
      setTimeout(() => {
        while (this.resolutionCallbacks.length) {
          let { onFulfilled, nextPromise } = this.resolutionCallbacks.shift()
          let promiseResult = onFulfilled && onFulfilled(value)
          nextPromise.resolve(promiseResult || this.value)
        }
      })
    }
  }
  reject(reason) {
    if (this.status === REJECTED || this.status === FULFILLED) return
    this.reason = reason
    this.status = REJECTED
    setTimeout(() => {
      while (this.rejectionCallbacks.length) {
        let { onRejected, nextPromise } = this.rejectionCallbacks.shift()
        let promiseResult = onRejected && onRejected(reason)
        nextPromise.reject(promiseResult || this.reason)
      }
    })
  }

  then(onFulfilled, onRejected) {
    let nextPromise = new MPromise(() => {})
    this.resolutionCallbacks.push({
      nextPromise: nextPromise,
      onFulfilled: onFulfilled || null
    })
    onRejected &&
      this.rejectionCallbacks.push({
        nextPromise: nextPromise,
        onRejected: onRejected || null
      })
    return nextPromise
  }
  catch(onRejected) {
    this.then(null, onRejected)
  }
  finally(onFinally) {
    this.then(onFinally, onFinally)
  }
}

export default MPromise
