import { Equal, Expect } from '@type-challenges/utils';

type cases = [Expect<Equal<_Capitalize<'hello world'>, 'Hello world'>>];
