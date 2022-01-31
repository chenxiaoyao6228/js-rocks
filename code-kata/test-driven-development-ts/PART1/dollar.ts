/*
    * todolist
    * ✅ 5 * 2 = 10美元
    * ✅ 将amount定义为私有
    * ✅ Money类有副作用吗
    * 钱数必须为整数?
    * 实现hashCode()函数
    * 与空对象判等
    * 与非同类对象判等
    * 5 瑞士法郎 * 2 = 10瑞士法郎
    
*/

// 这种向上转型的方式还真是麻烦
export class Money {
  protected amount: number
  protected currency: string // ?
  static dollar(amount: number) {
    return new Dollar(amount, 'USD') // 工厂方法
  }
  static france(amount: number) {
    return new France(amount, 'CHF') // 工厂方法
  }
  constructor(amount: number, currency: string) {
    this.amount = amount
    this.currency = currency
  }
  // 这里该使用什么类型?
  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency)
  }
  plus() {}
  getCurrency() {
    return this.currency
  }
}

export class Dollar extends Money {
  constructor(amount: number, currency: string) {
    super(amount, currency)
  }
}

export class France extends Money {
  constructor(amount: number, currency: string) {
    super(amount, currency)
  }
}
