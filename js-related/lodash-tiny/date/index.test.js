import {
  getDaysInMonth,
  isLeapYear,
  getFirstDateInQuarter,
  getLastDateInQuarter,
  getFirstDateInMonth,
  getLastDateInMonth,
  getPeriod
} from './index.finish.js'
describe('date', () => {
  describe('getDaysInMonth', () => {
    test('date support', () => {
      expect(getDaysInMonth(new Date('2020-02-21'))).toEqual(29)
      expect(getDaysInMonth(new Date('2021-02-21'))).toEqual(28)
      expect(getDaysInMonth(new Date('2020-12-12'))).toEqual(31)
      expect(getDaysInMonth(new Date('2021-12-12'))).toEqual(31)
    })
    test('date string support', () => {
      expect(getDaysInMonth('2020-02-21')).toEqual(29)
      expect(getDaysInMonth('2021-02-21')).toEqual(28)
      expect(getDaysInMonth('2020-12-12')).toEqual(31)
      expect(getDaysInMonth('2021-12-12')).toEqual(31)
    })
  })
  describe('isLeapYear', () => {
    test('date support', () => {
      expect(isLeapYear(new Date('2020-02-20'))).toEqual(true)
      expect(isLeapYear(new Date('2021-02-20'))).toEqual(false)
      expect(isLeapYear(new Date('2000-02-20'))).toEqual(true)
    })
    test('date string support', () => {
      expect(isLeapYear('2020-02-20')).toEqual(true)
      expect(isLeapYear('2021-02-20')).toEqual(false)
      expect(isLeapYear('2000-02-20')).toEqual(true)
    })
  })
  describe('getFirstDateInQuarter', () => {
    test('date support', () => {
      expect(getFirstDateInQuarter(new Date('2020-02-05'))).toEqual(
        new Date('2020-01-01:00:00:00')
      )
      expect(getFirstDateInQuarter(new Date('2020-05-05'))).toEqual(
        new Date('2020-04-01:00:00:00')
      )
      expect(getFirstDateInQuarter(new Date('2020-08-05'))).toEqual(
        new Date('2020-07-01:00:00:00')
      )
      expect(getFirstDateInQuarter(new Date('2020-11-05'))).toEqual(
        new Date('2020-10-01:00:00:00')
      )
    })
    test('date string support', () => {
      expect(getFirstDateInQuarter('2020-02-05')).toEqual(
        new Date('2020-01-01:00:00:00')
      )
      expect(getFirstDateInQuarter('2020-05-05')).toEqual(
        new Date('2020-04-01:00:00:00')
      )
      expect(getFirstDateInQuarter('2020-08-05')).toEqual(
        new Date('2020-07-01:00:00:00')
      )
      expect(getFirstDateInQuarter('2020-11-05')).toEqual(
        new Date('2020-10-01:00:00:00')
      )
    })
  })
  describe('getLastDateInQuarter', () => {
    test('date support', () => {
      expect(getLastDateInQuarter(new Date('2020-02-05'))).toEqual(
        new Date('2020-03-31:00:00:00')
      )
      expect(getLastDateInQuarter(new Date('2020-05-05'))).toEqual(
        new Date('2020-06-30:00:00:00')
      )
      expect(getLastDateInQuarter(new Date('2020-08-05'))).toEqual(
        new Date('2020-09-30:00:00:00')
      )
      expect(getLastDateInQuarter(new Date('2020-11-05'))).toEqual(
        new Date('2020-12-31:00:00:00')
      )
    })
    test('date string support', () => {
      expect(getLastDateInQuarter('2020-02-05')).toEqual(
        new Date('2020-03-31:00:00:00')
      )
      expect(getLastDateInQuarter('2020-05-05')).toEqual(
        new Date('2020-06-30:00:00:00')
      )
      expect(getLastDateInQuarter('2020-08-05')).toEqual(
        new Date('2020-09-30:00:00:00')
      )
      expect(getLastDateInQuarter('2020-11-05')).toEqual(
        new Date('2020-12-31:00:00:00')
      )
    })
  })
  describe('getFirstDateInMonth', () => {
    test('date support', () => {
      expect(getFirstDateInMonth(new Date('2020-01-22'))).toEqual(
        new Date('2020-01-01:00:00:00')
      )
      expect(getFirstDateInMonth(new Date('2020-05-22'))).toEqual(
        new Date('2020-05-01:00:00:00')
      )
    })
    test('date string support', () => {
      expect(getFirstDateInMonth('2020-01-22')).toEqual(
        new Date('2020-01-01:00:00:00')
      )
      expect(getFirstDateInMonth('2020-05-22')).toEqual(
        new Date('2020-05-01:00:00:00')
      )
    })
  })
  describe('getLastDateInMonth', () => {
    test('date support', () => {
      expect(getLastDateInMonth(new Date('2020-01-22'))).toEqual(
        new Date('2020-01-31:00:00:00')
      )
      expect(getLastDateInMonth(new Date('2020-02-29'))).toEqual(
        new Date('2020-02-29:00:00:00')
      )
      expect(getLastDateInMonth(new Date('2021-02-28'))).toEqual(
        new Date('2021-02-28:00:00:00')
      )
      expect(getLastDateInMonth(new Date('2020-05-22'))).toEqual(
        new Date('2020-05-31:00:00:00')
      )
    })
    test('date string support', () => {
      expect(getLastDateInMonth('2020-01-22')).toEqual(
        new Date('2020-01-31:00:00:00')
      )
      expect(getLastDateInMonth('2020-02-29')).toEqual(
        new Date('2020-02-29:00:00:00')
      )
      expect(getLastDateInMonth('2021-02-28')).toEqual(
        new Date('2021-02-28:00:00:00')
      )
      expect(getLastDateInMonth('2020-05-22')).toEqual(
        new Date('2020-05-31:00:00:00')
      )
    })
  })
  describe('getPeriod', () => {
    test('date support', () => {
      expect(getPeriod(new Date('2020-01-22'), new Date('2020-01-23'))).toEqual(
        1
      )
      expect(getPeriod(new Date('2020-01-22'), new Date('2020-06-23'))).toEqual(
        153
      )
    })
    test('date string support', () => {
      expect(getPeriod('2020-01-22', '2020-01-23')).toEqual(1)
      expect(getPeriod('2020-01-22', '2020-06-23')).toEqual(153)
    })
  })
})
