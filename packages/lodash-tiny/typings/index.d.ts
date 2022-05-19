declare module '@js-rocks/lodash-tiny' {
  import { EventBus } from '.';
  // types
  function isObject(param: any): boolean;
  function isPlainObject(param: any): boolean;
  function isString(param: any): boolean;
  function isNaN(param: any): boolean;
  function isUndefined(param: any): boolean;
  function isNull(param: any): boolean;
  function isBoolean(param: any): boolean;
  function isNumber(param: any): boolean;
  function isSymbol(param: any): boolean;
  function isFunction(param: any): boolean;
  function isDate(param: any): boolean;
  function isRegExp(param: any): boolean;
  function isError(param: any): boolean;
  function isArray(param: any): boolean;
  function isArrayLike(param: any): boolean;
  function isWindow(param: any): boolean;

  // date
  function getDaysInMonth(param: Date): Date;
  function isLeapYear(param: Date): boolean;
  function getFirstDateInQuarter(param: Date): Date;
  function getLastDateInQuarter(param: Date): Date;
  function getFirstDateInMonth(param: Date): Date;
  function getLastDateInMonth(param: Date): Date;
  function getPeriod(param: Date): Date;
  function convertToDate(param: Date): Date;

  // array
  function arrayToTree(param: unknown[]): Record<string, any>;
  function get(object: Record<string, any>, path: string, defaultValue: string): any;
  function deepClone(param: any): boolean;
  function stringify(param: any): string;

  // string
  function capitalize(str: string): string;
  function padStart(str: string): string;
  function padEnd(str: string): string;
  function trim(str: string): string;
  function trimEnd(str: string): string;
  function underscored(str: string): string;
  function dasherize(str: string): string;
  function camelize(str: string): string;
  function contains(str: string): string;
  function startsWith(str: string): string;
  function endsWith(str: string): string;

  // fp
  function pipe(str: Function[]): Function;
  function partial(str: Function): Function;
  function partialRight(str: Function): Function;

  // eventBus
  class EventBus {
    on: (name: string, callback: Function) => void;
    emit: (name: string) => void;
    once: (name: string, callback: Function) => void;
    off: (name: string, listener: Function) => void;
  }
}
