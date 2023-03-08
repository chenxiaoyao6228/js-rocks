# @js-rocks/vue-tiny

A minimal vue3 implementation, including three core modules: `Reactivity`, `Runtime compiler`, `Runtime dom`.

## Features

- 👽 Reactivity: A complete reactive-system(isReactive, isProxy, isRef, scheduler, computed, watch and etc)
- 😈 Compiler: A tiny runtime compiler with limited features(text, interpolation, element)
- 💥 Runtime dom: custom renderer support

## Installation

```sh
yarn add @js-rocks/vue-tiny
```

## Online Demo

<iframe src="https://codesandbox.io/embed/vue-tiny-counter-fj4zhx?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-tiny-counter"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

For more, please checkout the [examples ](./examples/) folder

## Implementation details

- [compiler](./docs/compiler.md)

## Reference

- [vue 设计与实现](https://book.douban.com/subject/35768338/)
- [mini-vue](https://github.com/cuixiaorui/mini-vue)
