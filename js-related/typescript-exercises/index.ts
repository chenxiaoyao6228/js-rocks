function firstElement<Type>(arr: Type[]): Type {
  return arr[0];
}

type Input = "string" | "number";
type Output = "string" | "number";

function map<Input, Output>(arr: Input[], fun: (n: Input) => Output): Output[] {
  return arr.map(fun);
}

function longest<Type extends { length: number }>(a: Type, b: Type) {
  return a.length > b.length ? a : b;
}

const res = longest("aaaaaa", "bbbb");

const res2 = longest([1, 2, 3], [4, 5, 6]);

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// wont work
// const res3 = combine([1, 2, 3], ["string"]);

const res4 = combine<string | number>([1, 2, 3], ["string"]);

// Object type
interface Box<Type> {
  contents: Type;
}

interface StringBox {
  contents: string;
}
let boxA: Box<string> = { contents: "hello " };
boxA.contents;

let boxB: StringBox = { contents: "world" };

boxB.contents;

interface Apple {
  price: string;
}

type AppleBox = Box<Apple>;

const apple: AppleBox = {
  contents: {
    price: "100RMB",
  },
};

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
const a: OneOrManyOrNullStrings = null;

// The Array type

function doSomething(value: Array<string>) {}

// 其他的通用数据类型
// Map<K,V>, Set<T>, Promise<T>

// ReadOnly Array

// Tuple

interface StringNumberPair {
  length: 2;
  0: string;
  1: number;
  slice(start?: number, end?: number): Array<string | number>;
}

type Either2dOr3d = [number, number, number];

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  console.log(`provided coordinated had ${coord.length} dimension`);
}

// create types from types => generics 泛型
// function identity(arg: number): number {
//   return arg;
// }

function identity2<Type>(arg: Type): Type {
  return arg;
}

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let MyIdentity: GenericIdentityFn = identity;

// generic class
class GenericNumber<NumberType> {
  zeroValue: NumberType;
  add: (x: NumberType, y: NumberType) => NumberType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x: number, y: number) => {
  return x + y;
};

// ---------
interface LengthWise {
  length: number;
}

function logginIdentity<Type extends LengthWise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
console.log('getProperty(x, "a")', getProperty(x, "a"));
// console.log('getProperty(x, "m")', getProperty(x, "m"));

// using class types in generics
function create<Type>(c: { new (): Type }): Type {
  return new c();
}

// the keyof operator
type Point = {
  x: number;
  y: number;
  z: number;
};

type P = keyof Point;

type Arrayish = { [n: number]: unknown }; // unknown数据类型

type A = keyof Arrayish;

type Mapish = { [k: string]: boolean };

type M = keyof Mapish;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

// indexed types
type Person = { age: string; name: string; alive: boolean };

type I1 = Person["age" | "name"];

type I2 = Person[keyof Person];

type AliveOrName = "alive" | "name";

type I3 = Person[AliveOrName];

// conditional types
interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;

type Example2 = RegExp extends Animal ? number : string;

// conditional type with generic types
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let aaa = createLabel("typescript");

let bbb = createLabel(2.8);

let ccc = createLabel(Math.random() ? "hello" : 42);

// conditional type constraints
type MessageOf<T> = T["message"];
