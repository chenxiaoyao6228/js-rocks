# Promise A+ TDD implementation

## Resources

- specification
  : <https://promisesaplus.com/>
- test cases: <https://github.com/promises-aplus/promises-tests>

## Implementation details

### Producer && consumer

- producer: resolve, reject
- consumer: then, catch, finally

- all
- race
- Promise.resolve, promise.reject

### Macro/Micro task

The built-in Promise in the browser uses `micro-task`, we can only use `macro-ask` simulation, here we use setTimeout

### resolve delayed binding

Resolve must be executed in the next event cycle, otherwise the `onFulfilled` and `onRejected` functions in then have not been bound, and if the following code does not add setTimeout, an error will be reported

```js
// app
let promise = new MPromise(resolve => {
  resolve('a-ok')
})
promise.then(promiseSpy)


resolve(value) {
  // setTimeout(() => {
    this.state = 1
    this.value = value
    this.onFulfilled(value)
  // })
}
```

### The binding of `this`

Resolve and reject will be executed in the executor scope, and `this` needs to be bound to the current instance

### Promise chain

The then line of each promise becomes the starting point of a single promise chain

```js
let promise = new MPromise(resolve => {
  resolve(42);
});
promise.then(firstSpy); // start point of chain1
promise.then(secondSpy); // start point of chain2
```

```js
promise
  .then(firstSpy)
  .then('..')
  .then('..'); // the continuous extension of the chain
```

Then returns another promise to form a promise chain, and at the same time, the current promise queue needs to save the pointer of the next promise

```js
then(onFulfilled = () => {}, onRejected) {
  let promise = new MPromise(() => {})
  // save the pointer of the next promise
  this.pending.push([promise, onFulfilled, onRejected])
  if (this.state === 1) {
    this.scheduleQueue(this.value)
  }
  return promise
}
```

In this way, the resolve of the next promise is called when the current promise resolves, forming a `chain reaction`

```js
while (this.pending.length) {
  let [promise, onFulfilled, onRejected] = this.pending.shift();
  // 触发链条上的下一个promise
  promise.resolve(this.value);
}
```

### Promise returns promise

The key point is where in the chain this promise is inserted

The original thought was to process it in the scheduleQueue function

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

Finally found that it can only be processed in the resolve function.

When the value is returned, the resolve of the value(promise) will be called at some point in the future.

At this point, our current promise has been suspended.

When the resolve of value is called, the value will be passed to the resolve of promise, and the promise continues.

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
