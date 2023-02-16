import { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<_Trim<'str'>, 'str'>>,
  Expect<Equal<_Trim<' str'>, 'str'>>,
  Expect<Equal<_Trim<'     str'>, 'str'>>,
  Expect<Equal<_Trim<'     str     '>, 'str'>>,
  Expect<Equal<_Trim<'   \n\t foo bar '>, 'foo bar'>>
];
