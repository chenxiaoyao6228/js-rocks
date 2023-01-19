import { createJSXParser } from '../src';

test('should first', () => {
  const jsx = createJSXParser({
    createElement: (type, props, children) => {
      return { type, props, children };
    }
  });
  expect(jsx('<div>{this.count}</div>')).toEqual({
    type: 'div',
    props: {},
    children: []
  });
});
