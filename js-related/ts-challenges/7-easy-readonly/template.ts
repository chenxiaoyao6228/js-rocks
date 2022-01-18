/*
* js 实现
function readonly(obj){
  const result = {}
  for(const key in obj){
    result['readonly' + key] = obj[key];
  }
  return result
}
*/

// interface B {
//   a: number;
//   b: number;
// }

// type K = keyof B;
// const k: K = "a"; //也可以是b;

type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};
