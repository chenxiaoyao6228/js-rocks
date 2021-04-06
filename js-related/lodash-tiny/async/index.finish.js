function mySetInterval(callback, interval) {
  setTimeout(() => {
    callback && callback()
    mySetInterval(callback, interval)
  }, interval)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function series(arr) {
  let next = function() {
    let fn = arr.shift()
    if (!fn) {
      return
    }
    fn(next)
  }
  next()
}

function parallel(arr, finallyCallback) {
  let counter = 0
  let res = []
  function resolve(index, value) {
    res[index] = value
  }
  arr.forEach((fn, index) => {
    counter++
    fn(value => {
      counter--
      resolve(index, value)
      if (counter === 0) {
        finallyCallback(res)
      }
    })
  })
}

export { mySetInterval, sleep, series, parallel }
