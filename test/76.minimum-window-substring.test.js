const { minWindow } = require('../src/76.minimum-window-substring')

describe('minWin', () => {
  test('minWin', () => {
    expect(minWindow('ADOBECODEBANC', 'ABC')).toEqual('BANC')
    expect(minWindow('ADOBECODEBANC', 'ABCZ')).toEqual('')
  })
})
