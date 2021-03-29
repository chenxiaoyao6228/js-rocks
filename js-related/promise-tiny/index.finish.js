class MPromise {
  constructor(resolver) {
    if (!isFunction(resolver)) {
      throw new Error('resolver must be a function')
    }
    this.state = null
    this.value = null
    this.onFulfilled = []
    resolver(this.resolve.bind(this))
  }
  resolve(value) {
    setTimeout(() => {
      if (this.state === 1) {
        return
      }
      this.state = 1
      this.value = value
      this.onFulfilled.forEach(callback => {
        callback(value)
      })
    })
  }
  then(onFulfilled) {
    this.onFulfilled.push(onFulfilled)
  }
}

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}
export default MPromise
