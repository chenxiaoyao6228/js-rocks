import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { bulidURL } from '../helpers/url'
import { processHeader } from '../helpers/headers'
import { transformRequest, transformResponse } from '../helpers/data'
import xhr from './xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
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

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default dispatchRequest
