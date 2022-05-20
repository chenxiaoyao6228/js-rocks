/* eslint-disable */
import { createRenderer } from '../../lib/vue-tiny.esm.js';
import { App } from './App.js';

const game = new PIXI.Application({
  width: 500,
  height: 500,
});

document.body.append(game.view);

const renderer = createRenderer({
  createElement: type => {
    if (type === 'rect') {
      const rect = new PIXI.Graphics();
      rect.beginFill(0xff0000);
      rect.drawRect(0, 0, 100, 100);
      rect.endFill();
    }
  },
  patchProps: (el, key, val) => {
    el[key] = val;
  },
  insert: (parent, el) => {
    parent.addChild(el);
  },
});

const rootContainer = document.querySelector('#app');
renderer.createApp(App).mount(game.stage);

// let app = new PIXI.Application({ width: 640, height: 360 });
