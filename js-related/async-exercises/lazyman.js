function LazyMan(greeting) {
  if (!(this instanceof LazyMan)) {
    return new LazyMan(greeting)
  }
  this.callbacks = []
  this.greeting = greeting
  this.greet(this.greeting)
}
LazyMan.prototype.greet = function(greeting) {
  this.callbacks.push(next => {
    console.log(`This is ${greeting}`)
    next()
  })
  setTimeout(() => {
    this.next()
  }, 0)
  return this
}
LazyMan.prototype.eat = function(meal) {
  this.callbacks.push(next => {
    console.log(`Eat ${meal}~`)
    next()
  })
  return this
}

LazyMan.prototype.sleep = function(interval) {
  this.callbacks.push(next => {
    setTimeout(() => {
      next()
    }, interval * 1000)
  })
  return this
}

LazyMan.prototype.next = function() {
  if (this.callbacks.length) {
    let callback = this.callbacks.shift()
    callback(this.next.bind(this))
  }
}

LazyMan('Hank')
// Hi! This is Hank!
LazyMan('Hank')
  .sleep(2)
  .eat('dinner')
// Hi! This is Hank!
//等待2秒..
// Eat dinner~

LazyMan('Hank')
  .sleep(2)
  .eat('dinner')
  .sleep(3)
  .eat('supper')
// Hi! This is Hank!
//等待2秒..
// Eat dinner~
// Eat supper~

// co框架与生成器函数
