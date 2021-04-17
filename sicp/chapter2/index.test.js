import {
  pair,
  head,
  tail,
  make_rat,
  numer,
  denom,
  print_rat,
  make_rat_better
} from './'

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
