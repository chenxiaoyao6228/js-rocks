import {
  repeat,
  padStart,
  padEnd,
  trim,
  trimStart,
  trimEnd,
  underscored,
  dasherize,
  capitalize,
  camelize,
  contains,
  startsWith,
  endsWith,
} from './index';

test('repeat', () => {
  expect(repeat('allen', 2)).toEqual('allenallen');
});

describe('pad', () => {
  test('padStart', () => {
    expect(padStart('abc', 8)).toEqual('     abc');
    expect(padStart('abc', 10, 'foo')).toEqual('foofoofabc');
    expect(padStart('abc', 6, '123465')).toEqual('123abc');
    expect(padStart('abc', 8, '0')).toEqual('00000abc');
    expect(padStart('abc', 1)).toEqual('abc');
  });
  test('padEnd', () => {
    expect(padEnd('abc', 10)).toEqual('abc       ');
    expect(padEnd('abc', 10, 'foo')).toEqual('abcfoofoof');
    expect(padEnd('abc', 6, '123456')).toEqual('abc123');
    expect(padEnd('abc', 1)).toEqual('abc');
  });
});

describe('trim', () => {
  test('trim', () => {
    expect(trim(' hello ')).toEqual('hello');
  });
  test('trimStart', () => {
    expect(trimStart(' hello ')).toEqual('hello ');
  });
  test('trimEnd', () => {
    expect(trimEnd(' hello ')).toEqual(' hello');
  });
});

describe('format string', () => {
  test('underscored', () => {
    expect(underscored('yorkIsHandsome')).toEqual('york_is_handsome');
  });
  test('dasherize', () => {
    expect(dasherize('yorkIsHandsome')).toEqual('york-is-handsome');
  });
  test('capitalize', () => {
    expect(capitalize('yorkIsHandsome')).toEqual('Yorkishandsome');
  });
  test('camelize', () => {
    expect(camelize('york-is_handsome')).toEqual('yorkIsHandsome');
  });
});

test('contains', () => {
  let str = 'To be, or not to be, that is the question.';
  expect(contains(str, 'To be')).toEqual(true);
  expect(contains(str, 'question')).toEqual(true);
  expect(contains(str, 'nonexistent')).toEqual(false);
  expect(contains(str, 'To be', 1)).toEqual(false);
  expect(contains(str, 'TO BE')).toEqual(false);
});

test('startWith', () => {
  let str = 'To be, or not to be, that is the question.';

  expect(startsWith(str, 'To be')).toEqual(true);
  expect(startsWith(str, 'not to be')).toEqual(false);
  expect(startsWith(str, 'not to be', 10)).toEqual(true);
});

test('endsWith', () => {
  let str = 'To be, or not to be, that is the question.';

  expect(endsWith(str, 'question.')).toEqual(true);
  expect(endsWith(str, 'to be')).toEqual(false);
  expect(endsWith(str, 'to be', 19)).toEqual(true);
});

test('stripTags', () => {});
