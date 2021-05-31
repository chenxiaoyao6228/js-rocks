import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { bulidURL } from '../src/helpers/url'
import { transformRequest } from '../src/helpers/data'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config)
}

export default axios
