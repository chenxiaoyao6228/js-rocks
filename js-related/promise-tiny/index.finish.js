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
        let [onFulfilled, onRejected] = this.pending.shift()
        if (this.state === 1) {
          onFulfilled(this.value)
        } else if (this.state === 2) {
          onRejected(this.value)
        }
      }
    })
  }

  then(onFulfilled, onRejected) {
    this.pending.push([onFulfilled, onRejected])
    if (this.state === 1) {
      this.scheduleQueue(this.value)
    }
  }
  catch(onRejected) {
    this.then(() => {}, onRejected)
  }
  finally(onFinally) {
    this.then(onFinally, onFinally)
  }
}

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}
export default MPromise
