/* eslint-disable */
import { h } from '../../lib/vue-tiny.esm.js';

export const App = {
  name: 'APP',
  setup() {
    let app = new PIXI.Application({ width: 640, height: 360 });
    return {
      x: 100,
      y: 100,
    };
  },
  render() {
    return h('rect', { x: this.x, y: this.y });
  },
};
