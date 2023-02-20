type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : [];

// js的解法
const permutation = inputArr => {
  const result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(inputArr);
  return result;
};

const res = permutation([1, 2, 3]); // [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2],[3,2,1]]
console.log('res-------', res); // run this code
