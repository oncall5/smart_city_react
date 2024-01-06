import axios from 'axios'

// axios.defaults.baseURL = '/api'
axios.defaults.crossDomain = true
//axios.defaults.withCredentials = true;
axios.defaults.timeout = 600000*6
//请求拦截
// axios.interceptors.request.use(config => {
//   loading = Loading.service({
//     lock: false,
//     text: 'Loading',
//     fullscreen: false,
//     spinner: 'el-icon-loading',
//     background: 'rgba(0, 0, 0, 0.5)'
//   });
//   setTimeout(() => {
//     loading.close()
//   },10000)
//   return config
// });
// //响应拦截
// axios.interceptors.response.use(config => {
//   loading.close();
//
//   return config
// });
axios.$get = function (url, params, myConfig) {
  return new Promise((resolve, reject) => {
    let config = {
      params: params,
    }
    if (myConfig) {
      config = Object.assign(config, myConfig)
    }
    axios
      .get(url, config, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
axios.$post = function (url, params) {
  var headers = {
    'Content-Type': 'application/json;charset=utf-8;',
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params), {
        headers: headers,
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err.data)
      })
  })
}
axios.$put = function (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, JSON.stringify(params), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
axios.$delete = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
export default axios
