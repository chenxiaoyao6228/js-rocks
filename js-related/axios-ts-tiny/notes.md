## 一些思考

1. processConfig中的每个函数都修改了config入参，这样的操作是合理的吗？ 有没有更好的方案

```js
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}
```