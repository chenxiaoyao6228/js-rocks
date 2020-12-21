import { Money, Sum, Expression } from './Dollar'

export class Bank {
  private rates: Map<string, number>
  constructor() {
    this.rates = new Map()
  }
  equals(bank: Bank): boolean {
    return JSON.stringify(this) === JSON.stringify(bank)
  }
  reduce(source: Expression, to: string): Money | undefined {
    return source.reduce(this, to)
  }

  rate(from: string, to: string) {
    if (from === to) return 1
    const rate = this.rates.get(this.makeKey(from, to))
    return rate
  }
  addRate(from: string, to: string, rate: number) {
    this.rates.set(this.makeKey(from, to), rate)
  }
  makeKey(from: string, to: string): string {
    return from + '=>' + to
  }
}