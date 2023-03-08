# @js-rocks/vue-tiny

A minimal vue3 implementation, including three core modules: `Reactivity`, `Runtime compiler`, `Runtime dom`.

## Installation

```sh
yarn add @js-rocks/vue-tiny
```

## Features

- 👽 Reactivity: A complete reactive-system(isReactive, isProxy, isRef, scheduler, computed, watch and etc)
- 😈 Compiler: A tiny runtime compiler with limited features(text, interpolation, element)
- 💥 Runtime dom: custom renderer support

## Folder structure

```md
├── docs
├── examples
├── src
│ ├── compiler-core
│ ├── reactivity
│ ├── runtime-core
│ ├── runtime-dom
│ └── shared
├── tsconfig.json
├── typings
│ └── index.ts
├── package.json
├── rollup.config.js
├── README.md
├── babel.config.js
└── vitest.config.ts
```

> generated with `tree`

## Demos

[👉 code sandbox](https://codesandbox.io/embed/vue-tiny-counter-fj4zhx?fontsize=14&hidenavigation=1&theme=dark)

For more, please checkout the [examples ](./examples/) folder

## Implementation details

- [compiler](./docs/compiler.md)

## Reference

- [vue 设计与实现](https://book.douban.com/subject/35768338/)
- [mini-vue](https://github.com/cuixiaorui/mini-vue)
