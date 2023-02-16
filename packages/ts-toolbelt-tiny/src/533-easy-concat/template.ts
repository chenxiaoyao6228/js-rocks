// type Concat<T, U> = T extends [...infer K]
//   ? U extends [...infer P]
//     ? [...K, ...P]
//     : []
//   : [];

type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

// js
// const concat = (arr1, arr2) => [...arr1, ...arr2];
