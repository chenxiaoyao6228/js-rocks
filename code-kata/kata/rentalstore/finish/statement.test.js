import { statement, invoices, plays } from './statement'

describe('statement ', () => {
  test('should return false', () => {
    expect(statement(invoices[0], plays).replace(/\s/g, '')).toBe(
      `Statement for BigCo
       Hamlet: $650.00 (55 seats)
       As You Like It: $580.00 (35 seats)
       Othello: $500.00 (40 seats)
      Amount owed is $1,730.00
      You earned 47 credits`.replace(/\s/g, '')
    )
  })
})
