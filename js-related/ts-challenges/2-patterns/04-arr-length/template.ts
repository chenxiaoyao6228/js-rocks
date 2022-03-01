// 数组长度作计算
// 场景描述: typescript中没有数值计算的运算符, 可以用数组长度作为hack的方式
// 适用对象: 数组,字符串, etc

type _BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length
  ? Arr
  : _BuildArray<Length, Ele, [...Arr, Ele]>;

// Add
type _Add<Num1 extends number, Num2 extends number> = [
  ..._BuildArray<Num1>,
  ..._BuildArray<Num2>
]["length"];

// Subtract
type _Subtract<
  Num1 extends number,
  Num2 extends number
> = _BuildArray<Num1> extends [...arr1: _BuildArray<Num2>, ...arr2: infer Rest]
  ? Rest["length"]
  : never;

// Multiply -> 乘法转化为加法
type _Mutiply<
  Num1 extends number,
  Num2 extends number,
  ResultArr extends unknown[] = []
> = Num2 extends 0
  ? ResultArr["length"]
  : _Mutiply<Num1, _Subtract<Num2, 1>, [..._BuildArray<Num1>, ...ResultArr]>;

// Devide
type _Divide<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends 0
  ? CountArr["length"]
  : _Divide<_Subtract<Num1, Num2>, Num2, [unknown, ...CountArr]>;

// StrLen
type _StrLen<
  Str extends string,
  CountArr extends unknown[] = []
> = Str extends `${string}${infer Rest}`
  ? _StrLen<Rest, [...CountArr, unknown]>
  : CountArr["length"];

// GreaterThan
type _GreaterThan<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends Num2
  ? false
  : CountArr["length"] extends Num2
  ? true
  : CountArr["length"] extends Num1
  ? false
  : GreaterThan<Num1, Num2, [...CountArr, unknown]>;

// Fibnocci
