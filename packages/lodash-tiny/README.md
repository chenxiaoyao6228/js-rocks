# @js-rocks/lodash-tiny

Javascript doesn't ship with a fully functional official SDK, so we have to use third-party tools like `lodashJS`, `momentJS` for daily development. For learning purposes, we will implement those functions by ourselves.

## Quick start

Installation

```sh
yarn add @js-rocks/lodash-tiny
```

Usage

```
import * as _ from '@js-rocks/lodash-tiny';

_.isObject({})
```

## APIs

### string

- [x] startWith, endWith, contains(includes), padStart, padEnd(fillZero)
- [x] trim, trimStart, trimEnd, repeat, camelize, capitalize, dasherize, underscored

### array

- [x] contains, removeAt,remove,flatten,unique,compact,pluck,
- [x] max, min, groupBy,sortBy,union,intersect,diff

### inheritances

- [x] ES6 Class implementation
- [x] new
- [x] instanceOf

### date

pass a date

- [x] getDaysInMonth
- [x] isLeapYear
- [x] getFirstDateInQuarter
- [x] getLastDateInQuarter
- [x] getFirstDateInMonth
- [x] getLastDateInMonth
- [x] getDatePeriod

### oop

- [x] eventBus （on, emit, off, once）

### fp tools

- [x] currying
- [x] compose(pipe)
- [x] partial, partialRight

### others

- [x] is-xx-like function(isFunction, isArray)
- [x] function 的 bind, call, apply
- [x] deepClone
- [x] debounce, throttle
- [x] get
- [x] arrayToTree
- [x] JSON.parse, JSON.stringify
