import { h } from '../src/index'

test('h', () => {
  expect(<div />).toEqual({
    type: 'div',
    props: {},
    children: [],
  });
});