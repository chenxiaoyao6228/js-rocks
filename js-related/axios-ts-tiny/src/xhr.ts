import { AxiosRequestConfig } from '../src/types'

export default function xhr(config: AxiosRequestConfig) {
  let { data = null, url, method = 'get', headers = {} } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    if (data === null && name.toLocaleLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
