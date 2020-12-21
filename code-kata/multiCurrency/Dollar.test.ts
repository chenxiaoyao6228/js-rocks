import { Money, Sum } from './Dollar'
import { Bank } from './Bank'


describe('Dollars', () => {
  test('test multiplication', () => {
    const five = Money.dollar(5)
    expect(five.times(2)).toEqual(Money.dollar(10))
    expect(five.times(3)).toEqual(Money.dollar(15));
  });
  test('test equality', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
    expect(Money.franc(5).equals(Money.franc(5))).toBeTruthy();
    expect(Money.dollar(5).equals(Money.franc(6))).toBeFalsy();
  });
  test('test Currency', () => {
    expect(Money.dollar(1).currency).toEqual("USD");
    expect(Money.franc(1).currency).toEqual("CHF");
  })

  test('test simple addition', () => {
    let five = Money.dollar(5)
    let sum = five.plus(five)
    let bank = new Bank();
    bank.addRate("CHF", "USD", 2)
    let reduced = bank.reduce(sum, 'USD')
    expect(Money.dollar(10)).toEqual(reduced);
  });

  test('test Identity rate', () => {
    expect(new Bank().rate('USD', 'USD')).toEqual(1);
  });

  test('test reduce money with different currency', () => {
    let bank = new Bank()
    bank.addRate("CHF", "USD", 2)
    let result = bank.reduce(Money.franc(2), 'USD')
    expect(Money.dollar(1)).toEqual(result);
  });
  test('test reduce money', () => {

    let bank = new Bank()
    let result = bank.reduce(Money.dollar(1), "USD")
    expect(Money.dollar(1)).toEqual(result)
  });

  test('test Mixed addition', () => {
    const fiveBucks = Money.dollar(5)
    const tenFrancs = Money.franc(10)
    let bank = new Bank()
    bank.addRate("CHF", "USD", 2)
    const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD')
    expect(Money.dollar(10)).toEqual(result);
  });

});  
