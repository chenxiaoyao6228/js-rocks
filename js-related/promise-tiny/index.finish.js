class MPromise {
  constructor(resolver) {
    if (!isFunction(resolver)) {
      throw new Error('resolver must be a function')
    }
    this.state = null
    this.value = null
    this.onFulfilled = null
    resolver(this.resolve.bind(this))
  }
  resolve(value) {
    setTimeout(() => {
      if (this.state === 1) {
        return
      }
      this.state = 1
      this.value = value
      this.onFulfilled(value)
    })
  }
  then(onFulfilled) {
    this.onFulfilled = onFulfilled
  }
}

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}
export default MPromise
