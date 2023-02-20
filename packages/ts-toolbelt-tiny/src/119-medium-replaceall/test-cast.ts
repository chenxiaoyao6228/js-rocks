import { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MyReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<MyReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<MyReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<MyReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<MyReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<MyReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<MyReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<MyReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<MyReplaceAll<'', '', ''>, ''>>
];
