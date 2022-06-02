import { h, ref, getCurrentInstance, nextTick } from '../../lib/vue-tiny.esm.js';

export default {
  name: 'App',
  setup () {
    const count = ref(1);
    const instance = getCurrentInstance();

    function onClick () {
      for (let i = 0; i < 100; i++) {
        console.log('update');
        count.value = i;
      }

      // cannot get the updated value from vnode now
      console.log(instance);
      nextTick(() => {
        // can get the updated value after microTasks queue flushed
        console.log(instance);
      });

      // await nextTick()
      // console.log(instance)
    }

    return {
      onClick,
      count,
    };
  },
  render () {
    const button = h('button', { onClick: this.onClick }, 'update');
    const p = h('p', {}, 'count:' + this.count);

    return h('div', {}, [button, p]);
  },
};
