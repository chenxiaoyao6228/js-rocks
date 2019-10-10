const { isHappy } = require('../src/202.happy-number')

test('happy number', () => {
  expect(isHappy(19)).toEqual(true)
  expect(isHappy(18)).toEqual(false)
})

test('number with one digit', () => {
  expect(isHappy(1)).toEqual(true)
  expect(isHappy(2)).toEqual(false)
  expect(isHappy(3)).toEqual(false)
  expect(isHappy(7)).toEqual(true)
})
