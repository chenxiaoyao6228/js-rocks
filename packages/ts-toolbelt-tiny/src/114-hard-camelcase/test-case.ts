import { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<_CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<_CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<_CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<_CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<_CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<_CamelCase<''>, ''>>
];
