import parse from '../src';

describe('parse', () => {
  test('test', () => {
    expect(parse('<div>lala</div>')).toEqual('h(\'div\', {},[])');
  });
});
