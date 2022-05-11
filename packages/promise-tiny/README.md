# Promise A+ TDD 实现

## 资料

- 规范地址: <https://promisesaplus.com/>
- 完整测试地址: <https://github.com/promises-aplus/promises-tests>

## 细节以及难点

### producer与consumer

- producer: resolve, reject
- consumer: then, catch, finally

- all
- race
- Promise.resolve, promise.reject

### 宏任务与任务

浏览器内置的 Promise 使用的是 micro-task, 我们只能使用 macro-ask 模拟, 这里使用的是 setTimeout

### resolve延迟绑定

resolve必须在下一个事件循环周期中执行, 否则then中的`onFulfilled`和`onRejected`函数还未绑定, 下面的代码中如果不加setTimeout会报错

```js
// app
let promise = new MPromise(resolve => {
  resolve('a-ok')
})
promise.then(promiseSpy)


// promise内部
resolve(value) {
  // setTimeout(() => {
    this.state = 1
    this.value = value
    this.onFulfilled(value)
  // })
}
```

### 绑定 this

resolve 和 reject 会在 executor 作用域中执行，需要将`this`绑定到当前的实例

### Promise 链条

每个promise的then行成了单个promise链条的起点

```js
let promise = new MPromise(resolve => {
  resolve(42)
})
promise.then(firstSpy) // 链条1的起点
promise.then(secondSpy) // 链条2的起点
```

```js
promise.then(firstSpy).then('..').then('..') // 链条的不断延伸
```

then 中要返回另一个 promise, 形成 promise 链条, 同时当前promise队列要保存下一个promise的指针

```js
then(onFulfilled = () => {}, onRejected) {
  let promise = new MPromise(() => {})
  // 保存下一个promise
  this.pending.push([promise, onFulfilled, onRejected])
  if (this.state === 1) {
    this.scheduleQueue(this.value)
  }
  return promise
}
```

这样在当前promise resolve的时候调用下一个promise的resolve, 形成`链式反应`

```js
 while (this.pending.length) {
  let [promise, onFulfilled, onRejected] = this.pending.shift()
  // 触发链条上的下一个promise
  promise.resolve(this.value)
}
```

### ⭐ promise返回promise

关键的点在于这个promise插入链条中的何处

一开始的想法是在scheduleQueue函数里面处理

```js
if (isFunction(onFulfilled)) {
let returnResult = onFulfilled(this.value)
if (isFunction(returnResult instanceof MPromise)) {
  // 当前promise作为consumer, returnResult作为producer
  return promise.then(
    () => {
      return returnResult.resolve(returnResult.value)
    },
    () => {
      return returnResult.reject(returnResult.value)
    }
  )
} else {
  promise.resolve(returnResult)
}
```

最后发现只能在resolve里面处理

当value被返回的时候, 该value(promise)的resolve会在未来的某个时刻调用

而此时我们的当前的promise已经被挂起

当value的resolve被调用的时候,会把值传给promise的resolve, 此时promise继续

```js
resolve(value) {
  if (value && isFunction(value.then)) {
    value.then(this.resolve.bind(this), this.reject.bind(this))
  } else {
    this.state = 1
    this.value = value
    this.scheduleQueue()
  }
}
```
