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

类似的观点,在[这里](https://zhuanlan.zhihu.com/p/31209277), [这里](https://mp.weixin.qq.com/s/WLclvb8HGE1qCaF5NNkTjw)中也提到了

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

- [x] ⭐ [实现一个Lodash-tiny](https://github.com/chenxiaoyao6228/js-rocks/tree/master/js-related/lodash-tiny)
- [x] ⭐ [实现一个 Angular-tiny](https://github.com/chenxiaoyao6228/angular-tiny)
- [x] ⭐ [实现简易的带 hooks 的 react](https://github.com/chenxiaoyao6228/york/tree/master/packages/facade)
- [ ] ⭐ 使用一个 Vue-tiny
- [ ] ⭐ 实现一个简易的 webpack
- [ ] 实现一个简易的 JQuery
- [ ] 实现 commonJS 模块加载器
- [ ] 实现一个选择器引擎
- [ ] 实现一个模板解析器
- [ ] 实现一个前端监控平台

## 二.组件编写

- [x] [用 Vue 写一个组件库](https://github.com/chenxiaoyao6228/graceful-ui)

- [x] [用 React 写一个组件库(已弃坑)](https://chenxiaoyao6228.github.io/one-ui)

## 三.Code Kata

收集一些 kata, 利用 Javascript 和 TypeScript 实现, 涉及**TDD**, **重构**等题目

### Kata 列表

- [x] Gilderose
- [x] Marsover
- [x] Multicurrency
- [x] Rentalstore
- [ ] 康威生命游戏

## 四. SICP JS版本

30年经典书目, 原先基于Lisp,  JS版本包含了一个JS解释器的实现

## 五.LeetCode

算法是每个程序员都避不开的话题

### 数据结构

- [x] 堆
- [x] 二叉树
- [x] 哈希表
