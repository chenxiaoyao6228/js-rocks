import { sum_of_squares_of_larger_two } from '.'

test('sum_of_squares_of_larger_two', () => {
  expect(sum_of_squares_of_larger_two(1, 2, 3)).toEqual(13)
  expect(sum_of_squares_of_larger_two(3, 2, 1)).toEqual(13)
})
