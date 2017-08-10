/**
 * 自定义常用类
 */
exports.install = function (Vue, options) {
  // 简单的mobile检查
  Vue.prototype.isMobile = value => {
    return /^1[0-9]\d{9}$/.test(value)
  }

  // trim
  Vue.prototype.isNumber = function (value) {
    return value.replace(/(^[\s]*)|([\s]*$)/g, '')
  }

  // toast
  Vue.prototype.toastShow = function (type, text) {
    this.$vux.toast.show({
      type: type,
      text: text,
      time: 2000,
      position: 'middle'
    })
  }

  // 1秒之后跳转
  Vue.prototype.toUrl = function (url) {
    window.setTimeout(function () {
      this.$router.push(url)
    }.bind(this), 1000)
  }

  /**
   * 存储localStorage
   */
  Vue.prototype.setStore = function (name, content) {
    if (!name) return
    window.localStorage.setItem(name, content)
  }

  /**
   * 获取localStorage
   */
  Vue.prototype.getStore = function (name) {
    if (!name) return
    return window.localStorage.getItem(name)
  }

  /**
   * 删除localStorage
   */
  Vue.prototype.removeStore = function (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }

  Vue.prototype.loadingShow = function () {
    // 显示
    this.$vux.loading.show({
      text: 'Loading'
    })
  }

  Vue.prototype.loadingHide = function () {
    // 隐藏
    this.$vux.loading.hide()
  }

  // 日期加减天数
  Vue.prototype.addDate = function (d, days) {
    if (days === undefined || days === '') {
      days = 1
    }
    var date = new Date(d)
    date.setDate(date.getDate() + days)
    var month = date.getMonth() + 1
    var day = date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
  }

  Vue.prototype.getPicUrl = function (picUrl) {
    if (picUrl === undefined || picUrl.length === 0) {
      // return '/static/images/ico-user.png'
      return ''
    }
    return picUrl
  }

  Vue.prototype.isLogin = function () {
    if (window.localStorage.getItem('token') === null) {
      return false
    } else {
      return true
    }
  }

  Vue.prototype.openInWx = function () {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') > -1) {
      return true
    }
    return false
  }

  Vue.prototype.getOpenId = function () {
    return this.getStore('openId') || ''
  }

  Vue.prototype.wxAuth = function () {
    if (this.openInWx() === true && this.getOpenId().length === 0) {
      location.href = global.wxAuthorizeUrl
    }
  }
}
