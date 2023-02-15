import React from '../src/react'
describe('react', () => {
  describe('React.React.createElement', () => {
    test('should return an vnode', () => {
      let vnode = React.createElement('div', {}, 'hello world')
      expect(vnode).toEqual({
        tag: 'div',
        attrs: {},
        children: ['hello world'],
        key: null
      })
    })
    test('should handle nested creation and attributes', () => {
      let vnode = React.createElement(
        'ul',
        { className: 'list' },
        React.createElement('li', { className: 'item' }, 'item1'),
        React.createElement('li', { className: 'item' }, 'item2'),
        React.createElement('li', { className: 'item' }, 'item3')
      )
      expect(vnode).toEqual({
        tag: 'ul',
        attrs: { className: 'list' },
        key: null,
        children: [
          {
            tag: 'li',
            attrs: { className: 'item' },
            children: ['item1'],
            key: null
          },
          {
            tag: 'li',
            attrs: { className: 'item' },
            children: ['item2'],
            key: null
          },
          {
            tag: 'li',
            attrs: { className: 'item' },
            children: ['item3'],
            key: null
          }
        ]
      })
    })
  })
})
