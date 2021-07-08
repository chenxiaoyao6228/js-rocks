import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123


axios({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  },
  headers: {
    test: '321',
    'content-type': 'application/json'
  }
}).then((res) => {
  console.log(res.data)
})


// axios({
//   transformRequest: [(function (data) {
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTranformer[])],
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]),
//   function (data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   },
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// const instance = axios.create({
//   transformRequest: [(function (data) {
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTranformer[])],
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]),
//   function (data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   },
//   headers: {
//     test: '321'
//   }
// })

// instance({
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })