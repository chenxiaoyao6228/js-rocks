type Join<T, U extends string | number> = T extends [infer x]
  ? x
  : T extends [infer x, ...infer xs]
  ? x extends string
    ? `${x}${U}${Join<xs, U>}`
    : never
  : "";

// js, recursion
function join(arr, joiner) {
  const len = (arr) => arr.length;
  const last = (arr) => arr[arr.length - 1];
  const head = (arr) => arr.slice(0, -1);
  function joinInner(arr, joiner, res = "") {
    return len(arr) > 0
      ? joinInner(head(arr), joiner, last(arr) + joiner + res)
      : res;
  }
  return joinInner(head(arr), joiner, last(arr));
}
const k = join(["a", "p", "p", "l", "e"], "-");
console.log(k); // a-p-p-l-e
