import { h } from '../src/index';

describe('h', () => {
  test('element', () => {
    expect(<div />).toEqual({
      type: 'div',
      props: {},
      children: [],
    });
  });
});
