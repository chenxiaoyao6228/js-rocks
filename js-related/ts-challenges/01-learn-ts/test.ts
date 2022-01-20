const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 18 },
];

type Person2 = typeof MyArray[number];

/**
 type Person2 = {
    name: string;
    age: number;
}
*/

type Age2 = typeof MyArray[number]["age"];
