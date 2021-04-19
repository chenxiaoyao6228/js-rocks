import {
  pair,
  head,
  tail,
  make_rat,
  numer,
  denom,
  print_rat,
  make_rat_better,
  list,
  is_pair,
  deep_reverse,
  fringe
} from './'

const stringify = JSON.stringify

test('pair, head, tail', () => {
  const x = pair(1, 2)
  const y = pair(3, 4)
  const z = pair(x, y)
  expect(head(x)).toEqual(1)
  expect(head(y)).toEqual(3)
  expect(tail(x)).toEqual(2)
  expect(tail(y)).toEqual(4)
  expect(head(head(z))).toEqual(1)
  expect(head(tail(z))).toEqual(3)
})

test('make_rat , numer, denom', () => {
  const rat = make_rat(1, 2)
  expect(numer(rat)).toEqual(1)
  expect(denom(rat)).toEqual(2)
})

test('make_rat_better', () => {
  expect(numer(make_rat_better(-1, 2))).toEqual(-1)
  expect(denom(make_rat_better(-1, 2))).toEqual(2)
  expect(numer(make_rat_better(1, -2))).toEqual(-1)
  expect(denom(make_rat_better(-1, 2))).toEqual(2)
  expect(numer(make_rat_better(-1, -2))).toEqual(1)
  expect(denom(make_rat_better(-1, -2))).toEqual(2)
  expect(numer(make_rat_better(1, 2))).toEqual(1)
  expect(denom(make_rat_better(1, 2))).toEqual(2)
})

test('is_pair', () => {
  expect(is_pair(null)).toEqual(false)
  expect(is_pair(pair(1, 2))).toEqual(true)
  expect(is_pair(list(1, 2, 3, 4))).toEqual(true)
})

// test('deep_reverse', () => {
//   const x = list(list(1, 2), list(3, 4))
//   const x_reverse = list(list(4, 3), list(2, 1))
//   expect((deep_reverse(x))).toEqual((x_reverse))
// })

// test('fringe', () => {
//   const x = list(list(1, 2), list(3, 4))
//   let x_fringe = list(1, 2, 3, 4)
//   expect(stringify(fringe(x))).toEqual(stringify(x_fringe))
//   const xx = list(x, x)
//   let xx_fringe = list(1, 2, 3, 4, 1, 2, 3, 4)
//   expect(stringify(fringe(xx))).toEqual(stringify(xx_fringe))
// })
