<p align="center">
  <a href="#">
    <img width="200" src="https://cdn.jsdelivr.net/gh/chenxiaoyao6228/cloudimg@main/2023/js-rock.png"></img>
  </a>
</p>

<h1 align="center">JS Rocks</h1>

<div align="center">
  A Javascript library rebuild series.
<div>

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<div align="left"><div>

## Why this repo

Modern front-end development is getting much easier thanks to the thriving ecology of Javascript, there are so many frameworks and libraries that ease our pain of building web applications, but sometimes frameworks can be troublesome, they make your code harder to reason about. A true craftsman knows their tools well, and build one when tools in hand do not meet their needs. Framework code are just code, one effective way to learn it is to build a mvp version.

## 📦 Packages

### [🗡️ lodash-tiny](./packages/lodash-tiny/README.md)

a utility function library, including date, string, array, eventbus and other commonly used tools.

### [🧭 promise-tiny](./packages/promise-tiny/README.md)

a simple promise implementation, based on the browser event loop, use setTimeout(\_,0) under the hook

### [ ⚛️ react-tiny](./packages/react-tiny/README.md)

a simple react implementation

### [🚀 vue-tiny-tiny](./packages/vue-tiny/README.md)

a simple vue3 implementation, including reactivity-system, vdom-diff-patch, scheduler and more

### [🗼 babel-tiny](./packages/babel-tiny/README.md)

a simple babel implementation that can be used to parse javascript grammar, include parser, traverser, core, cli

## 💡Ideas && TODO

- [ ] [babel-plugin-transform-vue-jsx](): a simple jsx parser

- [ ] [webpack-tiny](): webpack-like web bundler

- [ ] [react-router-tiny](): a simple single-page router

- [ ] [redux-tiny](): a simple state management system

- [ ] [http-tiny](): a simple HTTP request library, based on fetch

- [ ] [vue-use-tiny](): VUE tiny composition hooks library

- [ ] [code-highlight-plugin](): a code hight light plugin

- [ ] [markdown-editor-tiny](): a simple web-based markdown editor

... more

## Publish

cd to package root folder and run

```sh
npm publish --access=public
```

## Licence

MIT
