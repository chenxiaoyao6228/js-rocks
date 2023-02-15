import { AxiosRequestConfig } from '../types/index'
import { isPlainObject, deepMerge } from '../helpers/util'

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
// custom merge strategy for each key, eg: {url:fromVal2Strategy}
const strategys = Object.create(null)

const StrategyKeysFromVal2 = ['url', 'params', 'data']

StrategyKeysFromVal2.forEach(key => {
  strategys[key] = fromVal2Strategy
})

const strategyKeysDeepMerge = ['headers']

strategyKeysDeepMerge.forEach(key => {
  strategys[key] = deepMergeStrategy

  function deepMergeStrategy(val1: any, val2: any): any {
    if (isPlainObject(val2)) {
      return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
      return val2
    } else if (isPlainObject(val1)) {
      return deepMerge(val1)
    } else if (typeof val1 !== 'undefined') {
      return val1
    }
  }
})

function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  // some default keys only exist in config1, not overwriten by config2
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  return config

  function mergeField(key: string): void {
    const strategy = strategys[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }
}
export default mergeConfig
