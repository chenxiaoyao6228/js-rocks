import { fizzBuzz } from './src'
describe('fizzbuzz', () => {
  test('input 3 should return fizz', () => {
    expect(fizzBuzz(3)).toEqual('fizz')
  })
  test('input 5 should return buzz', () => {
    expect(fizzBuzz(5)).toEqual('buzz')
  })
  test('input 15 should return fizzBuzz', () => {
    expect(fizzBuzz(15)).toEqual('fizzBuzz')
  })
})
