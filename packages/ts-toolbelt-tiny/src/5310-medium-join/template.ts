// eg: 1
type Join<T, U extends string | number> = T extends [infer x]
  ? x
  : T extends [infer x, ...infer xs]
  ? x extends string
    ? `${x}${U}${Join<xs, U>}`
    : never
  : '';

// eg: 2
type ArrayStuct<Head extends string, Tail extends string[]> = [Head, ...Tail];

type Join2<Arr extends string[], Sp extends string> = Arr extends []
  ? ''
  : Arr extends ArrayStuct<infer Head, []>
  ? Head
  : Arr extends ArrayStuct<infer Head, infer Tail>
  ? `${Head}${Sp}${Join<Tail, Sp>}`
  : never;

type Test = Join2<['foo', 'bar', 'hello'], ','>;
// => type Test = "foo,bar,hello"

// js, recursion
function join(arr, seperator) {
  const len = arr => arr.length;
  const last = arr => arr[arr.length - 1];
  const head = arr => arr.slice(0, -1);
  function joinInner(arr, seperator, res = '') {
    return len(arr) > 0 ? joinInner(head(arr), seperator, last(arr) + seperator + res) : res;
  }
  return joinInner(head(arr), seperator, last(arr));
}
const k = join(['a', 'p', 'p', 'l', 'e'], '-');
console.log(k); // a-p-p-l-e
