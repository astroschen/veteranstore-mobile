import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import router from '@/router'
import { throttle } from 'underscore'
// import { getUrlParamValue } from '@/utils/common.js'

if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'api'
}

/* axios.interceptors.request.use(
  request => {
    if (store?.state?.user?.access_token) {
      request.headers.Authorization = 'Bearer ' + (store?.state?.user?.access_token || '')
    }
    if (getUrlParamValue('mode') === '1') {
      request.params = {
        mode: '1',
        ...request.params
      }
    }
    if (request.method.toLowerCase() === 'post' && typeof request.data === 'object') {
      if (getUrlParamValue('mode') === '1') {
        request.data = {
          mode: '1',
          ...request.data
        }
      }
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
) */

/**
 * 节流函数，避免多次重复调用
 * @type {throttled}
 */
const throttled = throttle(() => {
  Toast.fail({
    message: '登录超时，2秒后跳转到登录页面！',
    duration: 2000,
    onClose () {
      store.dispatch('Logout').then(() => {
        router.replace({
          path: '/login'
        })
      })
    }
  })
}, 10000)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    switch (error.response.status) {
      case 404:
        Toast.fail('系统错误')
        break
      case 401:
        if (window.location.href.indexOf('/login') === -1) {
          throttled()
        }
        break
      case 403:
        Toast.fail('无权进行此操作')
        break
      default:
        Toast.fail('操作失败')
    }
    return Promise.reject(new Error(error))
  }
)

export const getRequest = (url, params) => {
  return axios.get(url, { params: params || '' })
}

export const postRequest = (url, params, headers) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    transformRequest: [
      function (data) {
        let ret = ''
        for (const key in data) {
          ret +=
            encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return ret
      }
    ],
    headers: Object.assign(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': 'Bearer ' + '8da88a25-02fc-4a10-81b9-941769100146'
      },
      headers || {}
    )
  })
}

export const postRequestJson = (url, params, timeout = 60000) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    timeout: timeout,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${url}`,
    data: params
  })
}

export const deleteRequest = url => {
  return axios({
    method: 'delete',
    url: `${url}`
  })
}

export const axiosUtil = {
  axios,
  post: postRequest,
  postJson: postRequestJson,
  put: putRequest,
  get: getRequest,
  delete: deleteRequest
}

export default axios
