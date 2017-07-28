// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './vuex/store'
import mUtils from './config/mUtils'
import axios from '../node_modules/axios'
import Qs from 'qs'
// 引入echarts
// import echarts from 'echarts'

// Vue.use(viewPort)

// plugins
import {
  ToastPlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  WechatPlugin,
  DatetimePlugin,
  AjaxPlugin
} from 'vux'

Vue.use(VueRouter)
Vue.use(mUtils)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(DatetimePlugin)
Vue.use(AjaxPlugin)

// Vue.prototype.$echarts = echarts

const router = new VueRouter({
  routes
})

// 点击延迟
FastClick.attach(document.body)

// 日志输出开关
Vue.config.productionTip = false

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', true)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', 'forward')
    } else {
      store.commit('updateDirection', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', 'forward')
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', false)
})

// Vue.prototype.axios = axios
// const baseURL = 'http://172.168.1.26:8081/'
const baseURL = 'http://210.22.94.211:5389/'
// axiosGet请求
Vue.prototype.get = function (url, params, callback) {
  // 显示
  this.$vux.loading.show({
    text: '加载中...'
  })
  axios({
    url: url,
    method: 'get',
    baseURL: baseURL,
    headers: {},
    params: params,
    withCredentials: true, // default
    responseType: 'json', // default
    timeout: 100000
  }).then(response => {
    let data = response.data
    if (data === null) {
      this.$router.push('/login')
    } else {
      callback(data)
    }
    // 隐藏
    this.$vux.loading.hide()
  }).catch(error => {
    // 隐藏
    this.$vux.loading.hide()
    console.log(error)
  })
}

// axiosPost请求
Vue.prototype.post = function (url, data, callback) {
  // 显示
  this.$vux.loading.show({
    text: '加载中...'
  })

  let key = url
  for (var p in data) {
    key += '_' + data[p]
  }

  if (url.indexOf('login.htm') > -1) {
    this.removeStore(key)
  }

  new Promise(function (resolve, reject) {
    let jsonData = this.getStore(key)
    if (jsonData !== null && jsonData.length > 3) {
      resolve(JSON.parse(jsonData))
    } else {
      reject()
    }
  }.bind(this)).then(function (data) {
    callback(data)
    // 隐藏
    this.$vux.loading.hide()
  }.bind(this)).catch(function () {
    axios({
      url: url,
      method: 'post',
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
        data.CustData = JSON.stringify(data.CustData)
        // 由于使用的form-data传数据所以要格式化
        data = Qs.stringify(data)
        return data
      }],
      transformResponse: [function (data) {
        return data
      }],
      data: data,
      withCredentials: true, // default
      responseType: 'json', // default
      timeout: 100000,
      // `onUploadProgress`上传进度事件
      onUploadProgress: function (progressEvent) {
      },
      // 下载进度的事件
      onDownloadProgress: function (progressEvent) {
      }
    }).then(response => {
      let data = response.data
      if (data === null) {
        this.$router.push('/login')
      } else {
        this.setStore(key, JSON.stringify(data))
        callback(data)
      }
      // 隐藏
      this.$vux.loading.hide()
    }).catch(error => {
      // 隐藏
      this.$vux.loading.hide()
      console.log(error)
    })
  }.bind(this))
}

// axiosPost请求
Vue.prototype.postForm = function (url, data, callback) {
  // 显示
  this.$vux.loading.show({
    text: '加载中...'
  })
  axios({
    url: url,
    method: 'post',
    baseURL: baseURL,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [function (data) {
      // 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
      // data.CustData = JSON.stringify(data.CustData)
      // 由于使用的form-data传数据所以要格式化
      // data = Qs.stringify(data)
      return data
    }],
    transformResponse: [function (data) {
      return data
    }],
    data: data,
    withCredentials: true, // default
    responseType: 'json', // default
    timeout: 100000,
    // `onUploadProgress`上传进度事件
    onUploadProgress: function (progressEvent) {
    },
    // 下载进度的事件
    onDownloadProgress: function (progressEvent) {
    }
  }).then(response => {
    let data = response.data
    if (data === null) {
      this.$router.push('/login')
    } else {
      callback(data)
    }
    // 隐藏
    this.$vux.loading.hide()
  }).catch(error => {
    // 隐藏
    this.$vux.loading.hide()
    console.log(error)
  })
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
