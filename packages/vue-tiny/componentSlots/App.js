import { h, renderSlots, createTextVNode } from '../lib/vue-tiny.esm.js';

export const Foo = {
  setup () {
    return {};
  },
  render () {
    const foo = h('p', {}, 'foo');

    const age = 18;
    return h('div', {}, [
      renderSlots(this.$slots, 'header', {
        age,
      }),
      foo,
      renderSlots(this.$slots, 'footer'),
    ]);
  },
};

export const App = {
  name: 'App',
  render () {
    const app = h('div', {}, 'App');
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [h('p', {}, 'header' + age), createTextVNode('hello world')],
        footer: () => h('p', {}, 'footer'),
      }
    );

    return h('div', {}, [app, foo]);
  },

  setup () {
    return {};
  },
};
