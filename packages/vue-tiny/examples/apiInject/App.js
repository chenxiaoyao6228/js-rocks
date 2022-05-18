import { h, provide, inject, getCurrentInstance } from '../../lib/vue-tiny.esm.js';

const Provider = {
  name: 'Provider',
  setup () {
    const instance = getCurrentInstance();
    console.log('🚀 ~ file: App.js ~ line 7 ~ setup ~ instance', instance);
    provide('foo', 'fooVal');
    provide('bar', 'barVal');
  },
  render () {
    return h('div', {}, [h('p', {}, 'Provider'), h(Consumer)]);
  },
};

const Consumer = {
  name: 'Consumer',
  setup () {
    const instance = getCurrentInstance();
    console.log('🚀 ~ file: App.js ~ line 7 ~ setup ~ instance', instance);
    const foo = inject('foo');
    const bar = inject('bar');

    return {
      foo,
      bar,
    };
  },

  render () {
    return h('div', {}, `Consumer: - ${this.foo} - ${this.bar}`);
  },
};

export default {
  name: 'App',
  setup () {},
  render () {
    return h('div', {}, [h('p', {}, 'apiInject'), h(Provider)]);
  },
};
