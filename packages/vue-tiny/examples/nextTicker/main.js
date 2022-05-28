import { createApp } from '../../lib/vue-tiny.esm.js';
import App from './App.js';

const rootContainer = document.querySelector('#root');
createApp(App).mount(rootContainer);
