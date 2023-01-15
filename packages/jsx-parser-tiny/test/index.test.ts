import parse from '../src/parser';

describe('parse', () => {
  test('test', () => {
    expect(parse('<div></div>')).toEqual({
      type: 'div',
      props: {},
      children: []
    });
  });
});
