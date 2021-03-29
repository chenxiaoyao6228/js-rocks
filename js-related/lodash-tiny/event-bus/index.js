class eventBus {
  constructor() {
    this.listeners = {}
    this.uuid = 0
  }
  on(name, callback) {
    this.listeners[name] = this.listeners[name] || {}
    this.listeners[name][this.uuid] = callback
    this.uuid++
  }
  emit(name) {
    this.listeners[name] &&
      Object.keys(this.listeners[name]).forEach(key => {
        let callback = this.listeners[name][key]
        callback()
        if (callback.ONCE) {
          delete this.listeners[name][key]
        }
      })
  }
  once(name, callback) {
    let callbackWrapper = () => callback()
    callbackWrapper.ONCE = true
    this.on(name, callbackWrapper)
  }
  off(name) {
    delete this.listeners[name]
  }
}

export default eventBus
