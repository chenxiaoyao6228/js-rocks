import { h, renderSlots } from '../lib/vue-tiny.esm.js';

const Foo = {
  setup (props, { emit }) {
    return {};
  },
  render (props) {
    const foo = h('div', { class: 'green' }, 'foo');

    console.log('this.$slots :>> ', this.$slots);

    return h('div', { class: 'red' }, [foo, renderSlots(this.$slots)]);
  },
};

export const App = {
  setup (props, { emit }) {
    return {};
  },
  render () {
    /*
      <div>
        app
        <Foo>
          <div>123<div>
        </Foo>
      </div>
    */
    const app = h('div', {}, 'app');
    const foo = h(Foo, { class: 'blue' }, [
      h('div', { class: 'pink' }, '123'),
      h('div', { class: 'pink' }, '456'),
    ]);
    return h('div', { class: 'red' }, [app, foo]);
  },
};
