import axios, { AxiosError } from '../../src/index'
import 'nprogress/nprogress.css'

import NProgress from 'nprogress'

import qs from 'qs'

document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message);
})

axios.post('http://127.0.0.1:8088/more/server2', {}, {
  withCredentials: true
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message);
})

let instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e => {
  instance.get('data:image/jpeg;base64,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')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])
  }
  instance.post('/more/upload', data)
})

axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'York',
    password: '123456'
  }
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})


axios.get('/more/304').then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
})


axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
})


axios.get('/more/get', {
  params: new URLSearchParams('a=b&c=d')
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message);
})

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message);
})

let ins = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

ins.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message);
})


instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D',
  baseURL: 'http://localhost:8080/assets/'
})

instance.get('cat.jpg').then(res => {
  console.log(res.toString())
}).catch((e: AxiosError) => {
  console.log(e.message);
})
