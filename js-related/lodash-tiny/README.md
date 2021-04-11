# Lodash-tiny 工具函数库

由于 JS 没有官方的 SDK,需要由社区提供一套作为补充,如 underscore,lodash, moment.js 等, 当我们不想因为要使用某个方法而引入完整的库的时候,我们需要自己去实现.

### 字符串扩展

- [x] startWith, endWith, contains(includes), padStart, padEnd(fillZero)
- [x] trim, trimStart, trimEnd, repeat, camelize, capitalize, dasherize, underscored

### 数组扩展

- [x] contains, removeAt,remove,flatten,unique,compact,pluck,
- [x] max, min, groupBy,sortBy,union,intersect,diff

### 继承与类

- [x] ⭐ 实现 ES6 的 class
- [x] 实现一个 new 函数
- [x] 实现 instanceOf

### 日期扩展

传入一个日期

- [x] 求当前月份的天数 getDaysInMonth
- [x] 判断所在年是否为闰年 isLeapYear
- [x] 判断所在季度的第一天 getFirstDateInQuarter
- [x] 判断所在季度的最后一天 getLastDateInQuarter
- [x] 判断所在月的第一天 getFirstDateInMonth
- [x] 判断所在月的最后一天 getLastDateInMonth
- [x] 判断与另外日期相隔多少天 getDatePeriod

更多参考: [datejs](https://www.npmjs.com/package/datejs)

### 异步编程

- [x] ⭐ [实现一个 Promise](https://github.com/chenxiaoyao6228/js-rocks/tree/feat-promise/js-related/promise-tiny)
- [x] 用 setTimeout 实现 setInterval
- [x] 实现一个 sleep 函数
- [x] 不使用 promise,实现 series 流程控制，顺序执行两个 callback
- [x] 不使用 promise, 实现 parallel 并行执行两个 callback
- [x] lazyMan 普通 版本 （微信经典面试题 lazyman）
- [x] 红绿灯问题
- [ ] 实现一个任务调度器,参考[zone.js](https://www.youtube.com/watch?v=3IqtmUscE_U&t=150s&ab_channel=ng-conf), [这里](https://blog.csdn.net/github_39212680/article/details/73410009)

### 面向对象与设计模式

- [x] ⭐ eventBus （on, emit, off, once）
- [ ] ⭐ 实现一个简易的依赖注入框架

### 函数式思想

- [x] currying (柯里化)
- [x] 实现 compose(pipe)
- [x] 实现 partial, partialRight

### 其他

- [x] ⭐ 实现 is-xx 函数(isFunction, isArray)
- [x] ⭐ 实现 function 的 bind, call, apply
- [x] ⭐ deepClone
- [x] ⭐ 实现 debounce(防抖)与 throttle(节流）
- [x] 实现 lodash 的 get 方法
- [x] 实现数组转树
- [x] 实现 JSON.parse 和 JSON.stringify
