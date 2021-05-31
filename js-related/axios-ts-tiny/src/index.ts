import { AxiosRequestConfig, AxiosPromise } from './types'
import { bulidURL } from '../src/helpers/url'
import { transformRequest } from '../src/helpers/data'
import { processHeader } from '../src/helpers/headers'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeader(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config)
}

export default axios
