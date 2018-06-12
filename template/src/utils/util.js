import Vue from 'vue'
import urlencode from 'urlencode'

let startTime = 0
let loadingTimer = null
let loadingDelay = 800
let toastDelay = 3000

export const wisToast = (text, type = 'success', position = 'default') => {
  Vue.$vux.toast.show({
    text,
    type,
    time: toastDelay,
    position
  })
}

const wisLoading = (flag, immediately = false) => {
  if (flag) {
    if (loadingTimer) clearTimeout(loadingTimer)
    startTime = new Date().getTime()
    Vue.$vux.loading.show()
  } else {
    if (immediately) {
      if (loadingTimer) clearTimeout(loadingTimer)
      Vue.$vux.loading.hide()
    } else {
      let nowTime = new Date().getTime()
      if ((nowTime - startTime) > loadingDelay) {
        Vue.$vux.loading.hide()
      } else {
        loadingTimer = setTimeout(() => {
          Vue.$vux.loading.hide()
        }, (loadingDelay - (nowTime - startTime)))
      }
    }
  }
}

const dealResponse = (res) => {
  if (res.status !== 200) {
    wisLoading(false, true)
    wisToast('请求错误，状态：' + res.status, 'text')
    return {}
  } else {
    if (res.data) {
      if (+res.data.status === 0) {
        return res.data
      } else if (+res.data.status === 401) {
        wisLoading(false, true)
        window.location.href = window.HOST + '/app/visitor/' + window.corpId + '/dispatch?redirectUrl=' + encodeURIComponent(window.location.href)
      } else {
        wisLoading(false, true)
        wisToast('请求接口错误：' + (res.data.message || '无错误信息'), 'text')
        return {}
      }
    } else {
      wisLoading(false, true)
      return {
        status: 0,
        message: '',
        data: null
      }
    }
  }
}

/**
 * 通用请求方法
 * @param config 可设置url、method、data、useUrlencode
 * @param options
 * @returns {Promise.<T>}
 */
export const request = (config = {}, options = {}) => {
  let _config = {
    host: window.HOST,
    url: '',
    method: 'GET',
    data: {},
    useUrlencode: false,
    ...config
  }
  let { host, url, method, data, useUrlencode } = _config
  let requestUrl = ''
  if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
    requestUrl = host + url
  } else {
    requestUrl = url
  }
  wisLoading(true)
  return Vue.http({
    url: requestUrl,
    method: method,
    data: useUrlencode ? urlencode.stringify(data) : data,
    headers: {
      'Content-Type': useUrlencode ? 'application/x-www-form-urlencoded' : 'application/json'
    },
    ...options
  })
    .then(res => {
      wisLoading(false)
      return dealResponse(res)
    })
    .catch(e => {
      console.log(e)
    })
}
