import parse from '../src/parser';

describe('basic', () => {
  test('<div></div>', () => {
    expect(parse('<div></div>')).toEqual({
      type: 'div',
      props: {},
      children: []
    });
  });
  test('<div />', () => {
    expect(parse('<div />')).toEqual({
      type: 'div',
      props: {},
      children: []
    });
  });

  test('hello', () => {
    expect(parse('hello')).toEqual({
      type: '#text',
      nodeValue: 'hello'
    });
  });

  describe('<<<<1 as text', () => {
    test('<div>1<<<<1</div>', () => {
      expect(parse('<div>1<<<<1</div>')).toEqual({
        type: 'div',
        props: {},
        children: [
          {
            type: '#text',
            nodeValue: '1<<<<1'
          }
        ]
      });
    });
    test('<div>1<<<<1<!-- xxx --></div>', () => {
      expect(parse('<div>1<<<<1<!-- xxx --></div>')).toEqual({
        type: 'div',
        props: {},
        children: [
          {
            type: '#text',
            nodeValue: '1<<<<1'
          },
          {
            type: '#comment',
            nodeValue: 'xxx'
          }
        ]
      });
    });
    test('<div>1<<<<1<div></div></div>', () => {
      expect(parse('<div>1<<<<1<div></div></div>')).toEqual({
        type: 'div',
        props: {},
        children: [
          {
            type: '#text',
            nodeValue: '1<<<<1'
          },
          { type: 'div', props: {}, children: [] }
        ]
      });
    });
  });
});

test('<div>hello world</div>', () => {
  expect(parse('<div>hello world</div>')).toEqual({
    type: 'div',
    props: {},
    children: [{ type: '#text', nodeValue: 'hello world' }]
  });
});
test('<!--comment content-->', () => {
  expect(parse('<!--comment content-->')).toEqual({
    type: '#comment',
    nodeValue: 'comment content'
  });
});
describe('attr', () => {
  test('<div id="id1" name="name1"></div>', () => {
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

describe('jsx', () => {
  test('<div >{111}</div>', () => {
    expect(parse('<div >{111}</div>')).toEqual({
      type: 'div',
      props: {},
      children: [
        {
          type: '#jsx',
          nodeValue: '111'
        }
      ]
    });
  });
  test('<div>xx{111}xx{222}xx</div>', () => {
    expect(parse('<div>xx{111}yy{222}zz</div>')).toEqual({
      type: 'div',
      props: {},
      children: [
        {
          type: '#text',
          nodeValue: 'xx'
        },
        {
          type: '#jsx',
          nodeValue: '111'
        },
        {
          type: '#text',
          nodeValue: 'yy'
        },
        {
          type: '#jsx',
          nodeValue: '222'
        },
        {
          type: '#text',
          nodeValue: 'zz'
        }
      ]
    });
  });
});
