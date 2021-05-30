export default function xhr({ method = 'get', data = null, url }) {
  const xhr = new XMLHttpRequest()

  xhr.open(method, url, true)

  xhr.send(data)
}
