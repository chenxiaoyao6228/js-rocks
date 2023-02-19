import { isDate } from '../types';
// https://stackoverflow.com/questions/43182667/why-does-javascript-new-dateyear-month-0-getdate-return-the-number-of-day
function getDaysInMonth(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return res;
}

function isLeapYear(date) {
  // 二月有29天的为闰年
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), 2, 0).getDate() === 29;
  return res;
}

function getFirstDateInQuarter(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1);
  return res;
}
function getLastDateInQuarter(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3 + 3, 0);
  return res;
}

function getFirstDateInMonth(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), date.getMonth(), 1);
  return res;
}
function getLastDateInMonth(date) {
  date = convertToDate(date);
  let res = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return res;
}

function getPeriod(start, end) {
  start = convertToDate(start);
  end = convertToDate(end);
  return Math.abs(start * 1 - end * 1) / 60 / 60 / 1000 / 24;
}

function convertToDate(date) {
  return isDate(date) ? date : new Date(date);
}

export {
  getDaysInMonth,
  isLeapYear,
  getFirstDateInQuarter,
  getLastDateInQuarter,
  getFirstDateInMonth,
  getLastDateInMonth,
  getPeriod,
};
