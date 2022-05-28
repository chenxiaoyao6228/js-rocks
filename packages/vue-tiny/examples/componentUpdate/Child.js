import { h } from '../../lib/vue-tiny.esm.js';
export default {
  name: 'Child',
  setup (props, { emit }) {},
  render (proxy) {
    return h('div', {}, [h('div', {}, 'child - props - msg: ' + this.$props.msg)]);
  },
};
