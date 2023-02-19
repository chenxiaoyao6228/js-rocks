// https://github.com/type-challenges/type-challenges/tree/master/questions/4-easy-pick
import { Equal, Expect } from '@type-challenges/utils';
import { _Pick } from './template';

type cases = [
  Expect<Equal<Expected1, _Pick<Todo, 'title'>>>,
  Expect<Equal<Expected2, _Pick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error skip
  _Pick<Todo, 'title' | 'completed' | 'invalid'>
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}
