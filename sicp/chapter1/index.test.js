import { sum_of_squares_of_larger_two, count_change, pascal_triangle } from '.'

test('sum_of_squares_of_larger_two', () => {
  expect(sum_of_squares_of_larger_two(1, 2, 3)).toEqual(13)
  expect(sum_of_squares_of_larger_two(3, 2, 1)).toEqual(13)
})

test('count_change', () => {
  expect(count_change(10)).toEqual(4)
  expect(count_change(100)).toEqual(292)
})

test('pascal_triangle', () => {
  expect(pascal_triangle(1, 1)).toEqual(1)
  expect(pascal_triangle(2, 1)).toEqual(1)
  expect(pascal_triangle(2, 2)).toEqual(1)
  expect(pascal_triangle(3, 1)).toEqual(1)
  expect(pascal_triangle(3, 2)).toEqual(2)
  expect(pascal_triangle(3, 3)).toEqual(1)
  expect(pascal_triangle(4, 1)).toEqual(1)
  expect(pascal_triangle(4, 2)).toEqual(3)
  expect(pascal_triangle(4, 3)).toEqual(3)
  expect(pascal_triangle(4, 4)).toEqual(1)
  expect(pascal_triangle(5, 1)).toEqual(1)
  expect(pascal_triangle(5, 2)).toEqual(4)
  expect(pascal_triangle(5, 3)).toEqual(6)
  expect(pascal_triangle(5, 4)).toEqual(4)
  expect(pascal_triangle(5, 5)).toEqual(1)
})
