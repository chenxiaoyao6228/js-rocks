import { h } from '../lib/vue-tiny.esm.js';

export const App = {
  // 必须要写 render
  render () {
    // ui
    return h('div', {}, [
      h('span', { class: 'red' }, 'span-children'),
      h('p', { class: 'blue' }, 'p-chidren'),
    ]);
  },

  setup () {
    return {
      msg: 'vue-tiny',
    };
  },
};
