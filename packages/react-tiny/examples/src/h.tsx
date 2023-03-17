import { render, h } from '../../src/index';

const elements = <div>hello world</div>;

console.log(elements);

render(elements, document.getElementById('app'));
