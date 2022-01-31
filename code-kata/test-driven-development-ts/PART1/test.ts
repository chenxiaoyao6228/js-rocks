import { Money } from './dollar'

describe('test dollar === france', () => {
  test('money dollar', () => {
    const five = Money.dollar(5)
    expect(Money.dollar(10)).toEqual(five.times(2))
    expect(Money.dollar(15)).toEqual(five.times(3))
  })
  test('money france', () => {
    const five = Money.france(5)
    expect(Money.france(10)).toEqual(five.times(2))
    expect(Money.france(15)).toEqual(five.times(3))
  })
  test('should equal', () => {
    const france = Money.france(5)
    const dollar = Money.dollar(5)
    expect(france.getCurrency()).toEqual(dollar.getCurrency())
    expect(france.amount()).toEqual(dollar.amount())
  })
})
