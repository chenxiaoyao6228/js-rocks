// 实现一个红绿灯，初始为红灯，1s 后由红灯转黄灯，2s 后由黄灯转绿灯，3s 后由绿灯转红灯，循环亮灯。

function showLight(color) {
  console.log(`${color} light is on`)
}

// callback版本
// eslint-disable-next-line
function callbackMain() {
  let callbacks = []

  function next() {
    if (callbacks.length) {
      let callback = callbacks.shift()
      callback()
      callbacks.push(callback)
    }
  }

  function scheduleLightTask(color, durationInMs) {
    callbacks.push(() => {
      showLight(color)
      setTimeout(() => {
        next()
      }, durationInMs)
    })
  }

  scheduleLightTask('red', 1000)
  scheduleLightTask('yellow', 2000)
  scheduleLightTask('green', 3000)
  next()
}

// callbackMain()

// promise版本
// eslint-disable-next-line
function promiseMain() {
  function setLight(color, duration) {
    return new Promise(resolve => {
      showLight(color)
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }
  function start() {
    setLight('red', 1000)
      .then(() => setLight('yellow', 2000))
      .then(() => setLight('green', 3000))
      .then(start)
  }
  start()
}

// promiseMain()

// async版本
async function asyncMain() {
  function setLight(color, duration) {
    return new Promise(resolve => {
      showLight(color)
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }
  async function start() {
    await setLight('red', 1000)
    await setLight('yellow', 2000)
    await setLight('green', 3000)
    start()
  }
  start()
}

asyncMain()
