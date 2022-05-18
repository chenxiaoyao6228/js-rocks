import { h } from '../../lib/vue-tiny.esm.js';

// requirement
// should be able to get props in setup and render function
// props should be immutable
const Counter = {
  setup (props) {
    console.log('props :>> ', props);

    props.count++;

    console.log('props :>> ', props);

    return {};
  },
  render () {
    return h('div', {}, 'counter: ' + this.count);
  },
};

export const App = {
  render () {
    return h('div', {}, [
      h(
        'span',
        {
          class: 'red',
          onClick: () => {
            console.log('click----------');
          },
          onMousedown: () => {
            console.log('mousedown-----------');
          },
        },
        'hi, ' + this.msg
      ),
      h(Counter, { count: 1 }),
      // h('p', { class: 'blue' }, 'p-chidren'),
    ]);
  },

  setup (props) {
    return {
      msg: 'zhangshixiu',
    };
  },
};
