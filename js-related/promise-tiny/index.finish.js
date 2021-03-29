function MPromise(resolver) {
  if (!isFunction(resolver)) {
    throw new Error('resolver must be a function')
  }
}

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}
export default MPromise
