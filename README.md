# JS-Rocks

<p align="center">
  <a href="#">
    <img width="200" src="./assets/js-rock.png"></img>
  </a>
</p>

## 前言

### 初衷

编程与钢琴这类技能一样, 技艺的精进需要持续不断的刻意练习.

> Code Kata 是《程序员修炼之道》的作者 Dave Thomas 发明的一种练习编程的活动，每次一到两个小时，做一个小题目，用 TDD 的方式来实现，不断地重构。正如 Thomas 在 Code Kata 网站上所说，不管你是要成为优秀的音乐家还是运动员，你都得不断练习——你有天赋，很好；你熟知音乐或体育的理论，很好；但你必须得练习，持续而大量地练习，否则你就是个外行人。而软件行业一直以来并不重视练习，似乎大家都很满足于“知道某个东西”（比如“了解设计模式”、“了解重构理论”）而不是真正通过练习掌握某个东西，无怪乎这个行业里充斥着如此之多的外行人。-- By 熊节 <不敢止步: 一个软件工匠的 12 年>

这个项目分为四个部分, Javascript 相关的知识点, 组件编写, Code-Kata 编程练习题, 以及 LeetCode 解题集合, 与[这个](https://github.com/chenxiaoyao6228/blog)repo 互为补充.

### 如何使用

安装依赖, 并执行测试

```bash
yarn && yarn test:watch
```

打开相应的文件夹, 每个文件夹下面会对应三个文件, `*.test.js`为测试文件, `*.start.js`为起始文件 `*.finish.js`为参考实现, 使用的时候将`finish`文件注释, 完成`start`文件让测试通过即可.

index.test.js

```js
// import { arrayToTree, curriedAdd } from './index.finish.js'
import { arrayToTree } from './index.start.js'
```

也可以自己选择一个 task, 自己用 TDD 的方式完成, **任务分解->写测试->实现->重构**, 完整的流程走下来相信一定会有收获.

## 一. JS 相关

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

### 框架相关

- [x] ⭐ [实现一个 Angular-tiny](https://github.com/chenxiaoyao6228/angular-tiny)
- [x] ⭐ [实现简易的带 hooks 的 react](https://github.com/chenxiaoyao6228/york/tree/master/packages/facade)
- [ ] ⭐ 实现一个简易的 webpack
- [ ] ⭐ 使用一个 Vue-tiny
- [ ] 实现一个简易的 JQuery
- [ ] 实现 commonJS 模块加载器
- [ ] 实现一个选择器引擎
- [ ] 实现一个模板解析器
- [ ] 实现一个前端监控平台

## 二.组件编写

### Vue

- [x] [用 Vue 写一个组件库](https://github.com/chenxiaoyao6228/graceful-ui)

### React

- [x] [用 React 写一个组件库](https://chenxiaoyao6228.github.io/one-ui)

## 三.Code Kata

收集一些 kata, 利用 Javascript 和 TypeScript 实现, 涉及**TDD**, **重构**等题目

### Kata 列表

- [x] Gilderose
- [x] Marsover
- [x] Multicurrency
- [x] Rentalstore
- [ ] 康威生命游戏

### 资源参考

- [coding-dojo-handbooks](https://www.amazon.com/Coding-Dojo-Handbook-Emily-Bache/dp/919811803X)

- [Awesome Katas](https://github.com/gamontal/awesome-katas)

- [project-euler](https://www.freecodecamp.org/learn/coding-interview-prep/project-euler)

## 四.LeetCode

算法是每个程序员都避不开的话题, 按照目前的趋势来看, 前端面试至少要刷到 Medium 才算有底.

### 数据结构

- [ ] 哈希表
- [ ] 堆
- [ ] 二叉树

### 精选题解

- [ ] TODO
