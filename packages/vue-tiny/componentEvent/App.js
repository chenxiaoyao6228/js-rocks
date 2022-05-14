import { h } from '../lib/vue-tiny.esm.js';

const Counter = {
  setup (props, { emit }) {
    const add = () => {
      emit('add', 1);
    };
    const mimus = () => {
      emit('minus', 1);
    };

    return {
      add,
      mimus,
    };
  },
  render () {
    const addBtn = h(
      'button',
      {
        onClick: this.add,
      },
      'click to add'
    );
    const minusBtn = h(
      'button',
      {
        onClick: this.mimus,
      },
      'click to minus'
    );

    return h('div', {}, [addBtn, minusBtn]);
  },
};

export const App = {
  render () {
    return h('div', {}, [
      h(Counter, {
        onAdd: (...args) => {
          console.log('onAdd---------------', args);
        },
        onMinus: (...args) => {
          console.log('onMinus---------------', args);
        },
      }),
    ]);
  },

  setup (props, { emit }) {
    return {
      msg: 'zhangshixiu',
    };
  },
};
