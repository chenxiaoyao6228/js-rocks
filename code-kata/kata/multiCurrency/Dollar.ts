import { Bank } from './Bank'



export class Money implements Expression {
  amount: number
  protected _currency: string
  constructor(amount: number, currency: string) {
    this.amount = amount
    this._currency = currency
  }
  reduce(bank: Bank, to: string): Money {
    let rate = bank.rate(this.currency, to)
    return new Money(this.amount / rate!, to)
  }
  equals(object: Object): boolean {
    const money = object as Money
    return this.amount === money.amount
      && this.currency === money.currency
  }
  plus(addend: Money): Sum {
    return new Sum(this, addend)
  }
  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency)
  }
  get currency(): string {
    return this._currency
  }
  static dollar(amount: number): Money {
    return new Money(amount, 'USD')
  }
  static franc(amount: number): Money {
    return new Money(amount, "CHF")
  }
}

export class Sum implements Expression {
  augend: Money
  addend: Money
  constructor(augend: Money, addend: Money) {
    this.addend = addend
    this.augend = augend
  }
  reduce(bank: Bank, to: string): Money {
    let amount = this.augend.reduce(bank, to).amount
      + this.addend.reduce(bank, to).amount
    return new Money(amount, to)
  }
}


export interface Expression {
  reduce(bank:Bank, to: string): Money
}