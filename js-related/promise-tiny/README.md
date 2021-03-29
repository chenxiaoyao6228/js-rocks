# Promise A+ TDD 实现

## 资料

- 规范地址: <https://promisesaplus.com/>
- 完整测试地址: <https://github.com/promises-aplus/promises-tests>

## 细节以及难点

### producer与consumer

- producer: resolve, reject
- consumer: then, catch, finally

### 宏任务与任务

浏览器内置的 Promise 使用的是 micro-task, 我们只能使用 macro-ask 模拟, 这里使用的是 setTimeout

### resolve在下一个digest cycle中执行

### 绑定 this

resolve 和 reject 会在 executor 作用域中执行，需要将`this`绑定到当前的实例

### Promise 链条

then 中要返回另一个 promise, 形成 promise 链条, 推入队列的时候保存下一个promise