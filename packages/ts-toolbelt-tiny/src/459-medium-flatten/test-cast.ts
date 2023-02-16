import { Equal, Expect } from '@type-challenges/utils';
import { _Flatten } from './template';

// [1, 2, 3, 4, 5]
type cases = [
  Expect<Equal<_Flatten<'1'>, ['1']>>,
  Expect<Equal<_Flatten<[]>, []>>,
  Expect<Equal<_Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>
];
