import parse from '../src/parser';

describe('parse', () => {
  describe('basic', () => {
    test('basic', () => {
      expect(parse('<div></div>')).toEqual({
        type: 'div',
        props: {},
        children: []
      });
      expect(parse('hello')).toEqual({
        type: '#text',
        nodeValue: 'hello'
      });
      expect(parse('<div>hello world</div>')).toEqual({
        type: 'div',
        props: {},
        children: []
      });
    });
  });
  describe('attr', () => {
    test('parse <div id="id1" name="name1"></div>', () => {
      expect(parse('<div id="id1" name="name1"></div>')).toEqual({
        type: 'div',
        props: {
          id: 'id1',
          name: 'name1'
        },
        children: []
      });
    });
  });
});
