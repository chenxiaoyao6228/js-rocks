function mySetInterval(callback, interval) {
  setTimeout(() => {
    callback && callback()
    mySetInterval(callback, interval)
  }, interval)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export { mySetInterval, sleep }
