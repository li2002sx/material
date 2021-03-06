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
import './config/globalUtil'
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
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})

// 点击延迟
FastClick.attach(document.body)

// 日志输出开关
Vue.config.productionTip = false

// simple history management
// const history = window.sessionStorage
// history.clear()
// let historyCount = history.getItem('count') * 1 || 0
// history.setItem('/', 0)

// router.beforeEach(function (to, from, next) {
// store.commit('updateLoadingStatus', true)
// const toIndex = history.getItem(to.path)
// const fromIndex = history.getItem(from.path)

// if (toIndex) {
//   if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
//     store.commit('updateDirection', 'forward')
//   } else {
//     store.commit('updateDirection', 'reverse')
//   }
// } else {
//   ++historyCount
//   history.setItem('count', historyCount)
//   to.path !== '/' && history.setItem(to.path, historyCount)
//   store.commit('updateDirection', 'forward')
// }

// if (/\/http/.test(to.path)) {
//   let url = to.path.split('http')[1]
//   window.location.href = `http${url}`
// } else {
//   next()
// }
// })

// router.afterEach(function (to) {
// store.commit('updateLoadingStatus', false)
// })

// Vue.prototype.axios = axios
const baseURL = global.apiUrl
const timeOut = 100000
const withCredentials = true
// const token = '1234567token7654321'
const roleMap = new Map([
  ['强制删除角色', 'force_delete'],
  ['总部人员', 'company_worker'],
  ['数据权限角色-查看所有项目', 'datarole_allproject'],
  ['数据权限角色-查看分公司所有项目', 'datarole_companyproject'],
  ['数据权限角色-查看项目组项目', 'datarole-teamproject'],
  ['物资采购岗', 'goods_purchase'],
  ['成本管理岗', 'cost_manager'],
  ['物资部经理', 'goods_chief'],
  ['商务部经理', 'business_chief'],
  ['分公司经理', 'subcompany_chief'],
  ['董事长', 'chairman'],
  ['项目质量员', 'project_quality'],
  ['业务菜单只读权限', 'menu_readonly'],
  ['项目施工员', 'project_construct'],
  ['项目商务人员', 'project_business'],
  ['项目经理', 'project_manager'],
  ['项目物资管理员', 'goods_manager'],
  ['目标设定中心', 'goal_set'],
  ['管理员', 'system'],
  ['项目生产经理', 'project_productmanager']
])

Vue.prototype.getFieldByUseInfo = function () {
  let userInfo = window.localStorage.getItem(global.userInfo)
  if (userInfo !== null) {
    userInfo = JSON.parse(userInfo)
    if (userInfo !== null) {
      return userInfo
      // return Reflect.get(userInfo, field) || ''
    }
  }
  return {}
}

Vue.prototype.getToken = function () {
  let userInfo = this.getFieldByUseInfo().userInfo
  if (userInfo === undefined) {
    return ''
  } else {
    return userInfo.token
  }
}

Vue.prototype.isLogin = function () {
  let userInfo = this.getFieldByUseInfo().userInfo
  if (userInfo.userInfo.token !== '') {
    return false
  } else {
    return true
  }
}

Vue.prototype.hasRole = function (role) {
  let flag = false
  let user = this.getFieldByUseInfo().user
  let userRoleArr = user.roleNames.split(',')
  for (let [key, value] of roleMap.entries()) {
    if (role === value) {
      if (userRoleArr.includes(key)) {
        flag = true
        break
      }
    }
  }
  return flag
}

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
    headers: {
      'token': this.getToken()
      // 'token': token
    },
    params: params,
    withCredentials: withCredentials, // default
    responseType: 'json', // default
    timeout: timeOut
  }).then(response => {
    let data = response.data
    if (data === null || data.status === '-1') {
      this.toUrl('/login')
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
Vue.prototype.post = function (url, data, callback, showLoad) {
  // 显示
  this.$vux.loading.show({
    text: '请稍候...'
  })
  axios({
    url: url,
    method: 'post',
    baseURL: baseURL,
    headers: {
      'token': this.getToken(),
      // 'token': token,
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Content-Type': 'application/json'
    },
    transformRequest: [function (data) {
      // 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
      data.CustData = JSON.stringify(data.CustData)
      // 由于使用的form-data传数据所以要格式化
      data = Qs.stringify(data, { allowDots: true })
      // data = JSON.stringify(data)
      return data
    }],
    transformResponse: [function (data) {
      return data
    }],
    data: data,
    withCredentials: withCredentials, // default
    responseType: 'json', // default
    timeout: timeOut,
    // `onUploadProgress`上传进度事件
    onUploadProgress: function (progressEvent) {
    },
    // 下载进度的事件
    onDownloadProgress: function (progressEvent) {
    }
  }).then(response => {
    let data = response.data
    if (data === null || data.status === '-1') {
      this.toUrl('/login')
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
      'token': this.getToken(),
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
    withCredentials: withCredentials, // default
    responseType: 'json', // default
    timeout: timeOut,
    // `onUploadProgress`上传进度事件
    onUploadProgress: function (progressEvent) {
    },
    // 下载进度的事件
    onDownloadProgress: function (progressEvent) {
    }
  }).then(response => {
    let data = response.data
    if (data === null || data.status === '-1') {
      this.toUrl('/login')
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

Vue.prototype.toUrl = function (url) {
  if (url === '/login') {
    var referrer = document.URL
    if (referrer.indexOf('/login') === -1) {
      this.setStore('referrer', referrer.split('#')[1])
    } else {
      this.removeStore('referrer')
    }
  }
  if (url === -1) {
    window.history.go(-1)
  } else {
    this.$router.push(url)
  }
}

Vue.prototype.loginToUrl = function () {
  // var referrer = this.getStore('referrer')
  // if (referrer === null) {
  //   referrer = '/index'
  // }
  // // location.href = referrer
  // this.$router.push(referrer)
  this.$router.push('/index')
}

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Vue.prototype.stringFormat = function () {
  var args = arguments
  if (args.length === 0) return ''
  if (args.length === 1) return arguments[0]

  var regex = /{(\d+)?}/g
  var arg
  var result
  if (args[1] instanceof Array) {
    arg = args[1]
    result = args[0].replace(regex, function ($0, $1) {
      return arg[parseInt($1)]
    })
  } else {
    arg = args
    result = args[0].replace(regex, function ($0, $1) {
      return arg[parseInt($1) + 1]
    })
  }
  return result
}

Vue.prototype.getDict = function (type) {
  let map = new Map()
  var param = {
    type: type
  }
  if (type === 'materialClass') {
    map.set('01', '主材')
    map.set('02', '半成品')
    map.set('03', '零星材料')
  } else if (type === 'status') {
    map.set('01', '草稿')
    map.set('02', '审批中')
    map.set('03', '驳回')
    map.set('04', '完成')
    map.set('05', '销毁')
  } else if (type === 'flowStatus') {
    map.set('01', '编辑')
    map.set('02', '提交')
    map.set('03', '取消')
    map.set('04', '审批中')
    map.set('05', '完成')
  } else if (type === 'payMode') {
    map.set('0', '后期结算')
    map.set('1', '直接付款')
  } else if (type === 'checkType') {
    map.set('00', '中间验收')
    map.set('01', '最终验收')
  } else if (type === 'adjustReasonClass') {
    map.set('01', '变更签证')
    map.set('02', '超耗')
  } else if (type === 'adjustReasonSubClass') {
    map.set('01', '业务指令')
    map.set('02', '业务口头指令')
    map.set('03', '业务变更')
  } else {
    let requestUrl = 'appData/app/getDictType'
    let that = this
    this.get(requestUrl, param, function (result) {
      if (result.status === '1') {
        let list = result.map.list
        for (let item of list) {
          map.set(item.value, item.label)
        }
        return map
      } else {
        that.toastShow('text', result.message)
      }
    })
  }
  return map
}

Vue.prototype.audit = function (taskId, procId, comment, flag) {
  var param = {
    taskId: taskId,
    procInsId: procId,
    comment: comment,
    flag: flag
  }
  let requestUrl = 'appData/app/complete'
  let that = this
  this.post(requestUrl, param, function (result) {
    if (result.status === '1') {
      that.toastShow('success', '提交审批成功')
      that.toUrl('/work/todo')
    } else {
      that.toastShow('text', result.message)
    }
  })
}

Vue.prototype.getCanUseAmount = function (projectId, controlId, type, callback) {
  var param = {
    gcontrol: {
      id: controlId
    }
  }
  let requestUrl = null
  switch (type) {
    case '01':
      requestUrl = 'appData/app/getMainMaterialAmt'
      break
    case '02':
      requestUrl = 'appData/app/getHalfMaterialAmt'
      break
    case '03':
      requestUrl = 'appData/app/getNeedPlanAmt'
      break
    default:
      break
  }
  let that = this
  this.post(requestUrl, param, function (result) {
    if (result.status === '1') {
      callback(result.map.amt)
    } else {
      that.toastShow('text', result.message)
    }
  })
}

Vue.prototype.dateToString = function (date, format) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

Vue.prototype.toWorkDetail = function (action, procId, procKey, taskId, billId) {
  switch (procKey) {
    case 'gcontrolplan':
      this.toUrl('/work/control/' + action + '/' + procId + '/' + taskId + '/' + billId)
      break
    case 'gcontrolplan_change':
      this.toUrl('/work/controlchange/' + action + '/' + procId + '/' + taskId + '/' + billId)
      break
    case 'in_main':
    case 'in_little':
      this.toUrl('/work/in/' + action + '/' + procId + '/' + taskId + '/' + billId)
      break
    case 'check_half':
    case 'partiall_check':
      this.toUrl('/work/inhalf/' + action + '/' + procId + '/' + taskId + '/' + billId)
      break
    case 'settle':
      this.toUrl('/work/settle/' + action + '/' + procId + '/' + taskId + '/' + billId)
      break
    case 'material_out':
      this.toUrl('/work/out/' + action + '/' + procId + '/' + taskId + '/' + billId)
      break
    case 'needplan':
      this.toUrl('/work/need/' + action + '/' + procId + '/' + taskId + '/' + billId)
      break
    case 'compact':
      this.toUrl('/work/contract/' + action + '/' + procId + '/' + taskId + '/' + billId)
      break
    case 'goal_set':
      this.toUrl('/work/target/' + action + '/' + procId + '/' + taskId + '/' + billId)
      break
    default:
      break
  }
}

import $ from 'jquery'

Vue.prototype.getBase64 = function (img) {
  function getBase64Image (img, width, height) { // width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
    var canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    var dataURL = canvas.toDataURL()
    return dataURL
  }
  var image = new Image()
  image.crossOrigin = ''
  image.src = img
  var deferred = $.Deferred()
  if (img) {
    image.onload = function () {
      deferred.resolve(getBase64Image(image)) // 将base64传给done上传处理
    }
    return deferred.promise() // 问题要让onload完成后再return sessionStorage['imgTest']
  }
}

Vue.prototype.wxShare = function (title, desc, imgUrl, link) {
  imgUrl = this.getPicUrl(imgUrl)
  this.get('/rest/user/wxshareconf', { url: location.href }, function (result) {
    if (result !== null) {
      this.$wechat.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      this.$wechat.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        this.$wechat.onMenuShareTimeline({
          title: title, // 分享标题
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })

        this.$wechat.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })

        this.$wechat.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })

        this.$wechat.onMenuShareWeibo({
          title: '', // 分享标题
          desc: '', // 分享描述
          link: '', // 分享链接
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })

        this.$wechat.onMenuShareQZone({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
      }.bind(this))

      this.$wechat.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    } else {
      this.toastShow('text', '分享失败')
    }
  }.bind(this))
}

Vue.prototype.wxChooseImage = function (callback) {
  this.get('/rest/user/wxshareconf', { url: location.href }, function (result) {
    if (result !== null) {
      this.$wechat.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: ['chooseImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      this.$wechat.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        this.$wechat.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            callback(res.localIds) // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          }
        })
      }.bind(this))
      this.$wechat.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    } else {
      this.toastShow('text', '初始化失败')
    }
  }.bind(this))
}

Vue.prototype.wxGetLocalImgData = function (localId, callback) {
  this.get('/rest/user/wxshareconf', { url: location.href }, function (result) {
    if (result !== null) {
      this.$wechat.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      this.$wechat.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        this.$wechat.getLocalImgData({
          localId: localId, // 图片的localID
          success: function (res) {
            callback(res.localData) // localData是图片的base64数据，可以用img标签显示
          }
        })
      }.bind(this))

      this.$wechat.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    } else {
      this.toastShow('text', '分享失败')
    }
  }.bind(this))
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
