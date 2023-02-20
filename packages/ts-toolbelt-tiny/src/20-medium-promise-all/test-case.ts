import { Equal, Expect } from '@type-challenges/utils';

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

const p = Promise.all([promise1, promise2, promise3] as const);

type cases = [Expect<Equal<typeof p, Promise<[number, 42, string]>>>];
