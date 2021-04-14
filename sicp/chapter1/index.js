const abs = Math.abs

function square(a) {
  return a * a
}

function sum_of_square(a, b) {
  return square(a) + square(b)
}
// exercise 1.3

function sum_of_squares_of_larger_two(a, b, c) {
  let res
  // get larger two of three
  let { large, middle } = get_max_two_of_three(a, b, c)
  // return square
  res = sum_of_square(large, middle)
  return res
  function get_max_two_of_three(a, b, c) {
    let large = a,
      middle = b
    if (a < c) {
      if (b < c) {
        large = c
        if (a < b) {
          middle = b
        } else {
          middle = a
        }
      } else {
        large = b
        middle = c
      }
    }
    return { large, middle }
  }
}

// exercise 1.5

// function p() {
//   return p()
// }

// function test(x, y) {
//   return x === 0 ? 0 : y
// }I
// test(0, p()) // maxinum call size exceeded

// ⭐ 1.1.7 牛顿法求平方根
// x为需要求方根值, y为用来猜测的值, 每次使用 (y + x/y)/2的方式进行逼近

function sqrt_iter(guess, x) {
  return good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x)
}

function improve(guess, x) {
  return average(guess, x / guess)
}

function average(x, y) {
  return (x + y) / 2
}

function good_enough(guess, x) {
  return abs(square(guess) - x) < 0.001
}

function sqrt(x) {
  return sqrt_iter(1, x)
}
console.log('sqrt(9)', sqrt(9))

// exercise 1.6
// 使用函数来封装底层的条件操作符
function conditional(predicate, then_clause, else_clause) {
  return predicate ? then_clause : else_clause
}

function sqrt_iter_1(guess, x) {
  return conditional(
    good_enough(guess, x),
    guess,
    sqrt_iter(improve(guess, x), x)
  )
}
function sqrt_1(x) {
  return sqrt_iter_1(1, x)
}

console.log('sqrt_1(9)', sqrt_1(9))

// exercise 1.8 牛顿法求立方根
// 公式: ((x/y^2) + 2y) / 3

function cube_root_iter(guess, x) {
  return good_enough_cube_root(guess, x)
    ? guess
    : cube_root_iter(improve_cube_root(guess, x), x)
}
function improve_cube_root(guess, x) {
  return (x / (guess * guess) + 2 * guess) / 3
}

function good_enough_cube_root(guess, x) {
  return abs(cube(guess) - x) < 0.0000001
}

function cube_root(x) {
  return cube_root_iter(1, x)
}

function cube(x) {
  return x * x * x
}

console.log('cube_root(8)', cube_root(8))

// 小结: 体会函数作为抽象block的形式, 每个函数负责一个功能块

// 对于无法被外部复用的函数,直接定义在函数内部
// 由于函数作用域, x可以直接被内部函数获取
function sqrt_2(x) {
  function sqrt_iter(guess) {
    return good_enough(guess) ? guess : sqrt_iter(improve(guess), x)
  }

  // x省略了
  function improve(guess) {
    return average(guess, x / guess)
  }
  // x省略了
  function good_enough(guess) {
    return abs(square(guess) - x) < 0.001
  }
  function average(x, y) {
    return (x + y) / 2
  }

  return sqrt_iter(1, x)
}

console.log('sqrt_2(9)', sqrt_2(9))

// 1.2 开始讲递归与迭代了

function factorial(n) {
  return n === 1 ? 1 : n * factorial(n - 1)
}

console.log('factorial(5)', factorial(5))

// 尾递归优化
function factorial_tail(n) {
  return factorial_iter(1, 1, n)
  function factorial_iter(product, counter, max_count) {
    return counter > max_count
      ? product
      : factorial_iter(counter * product, counter + 1, max_count)
  }
}
function factorial_tail_1(n) {
  return factorial_iter(1, 1)
  function factorial_iter(product, counter) {
    return counter > n
      ? product
      : factorial_iter(counter * product, counter + 1)
  }
}
console.log('factorial_tail(5)', factorial_tail(5))
console.log('factorial_tail_1(5)', factorial_tail_1(5))

// TODO page 49+
export { sum_of_squares_of_larger_two }
