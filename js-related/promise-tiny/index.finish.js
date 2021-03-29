class MPromise {
  constructor(resolver) {
    if (!isFunction(resolver)) {
      throw new Error('resolver must be a function')
    }
    this.state = 0
    this.value = null
    this.pending = []
    resolver(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve(value) {
    if (this.state) {
      return
    }
    this.state = 1
    this.value = value
    this.scheduleQueue()
  }
  reject(reason) {
    if (this.state) {
      return
    }
    this.state = 2
    this.value = reason
    this.scheduleQueue()
  }
  scheduleQueue() {
    setTimeout(() => {
      while (this.pending.length) {
        let [promise, onFulfilled, onRejected] = this.pending.shift()
        if (this.state === 1) {
          // 触发下一个promise
          if (isFunction(onFulfilled)) {
            promise.resolve(onFulfilled(this.value))
          } else {
            promise.resolve(this.value)
          }
        } else {
          if (isFunction(onRejected)) {
            promise.reject(onRejected(this.value))
          } else {
            promise.reject(this.value)
          }
        }
      }
    })
  }

  then(onFulfilled, onRejected) {
    let promise = new MPromise(() => {})
    this.pending.push([promise, onFulfilled, onRejected])
    if (this.state === 1) {
      this.scheduleQueue(this.value)
    }
    return promise
  }
  catch(onRejected) {
    this.then(null, onRejected)
  }
  finally(onFinally) {
    this.then(onFinally, onFinally)
  }
}

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}
export default MPromise
