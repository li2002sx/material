/*
 * 视图固定缩放
 */
var Viewport = (function () {
  function Viewport (size) {
    this.size = isNaN(Number(size)) ? 320 : size
    this.index = 0
    // this.resize()
    window.addEventListener('orientationchange', this.resize.bind(this))
    window.addEventListener('load', this.resize.bind(this))
    window.addEventListener('resize', this.resize.bind(this))
  }

  Viewport.prototype.resize = function () {
    var info = document.getElementById('info')
    // window.orientation
    var width = window.screen.width
    // iphone下，旋转时 高度即宽度！
    if ((window.orientation === 90 || window.orientation === -90) && /iphone/.test(navigator.userAgent.toLowerCase())) {
      width = window.screen.height
    }

    var meta = document.querySelector('meta[name=\'viewport\']')
    var content = []
    content.push('width=' + this.size)
    content.push('initial-scale=' + width / this.size)
    content.push('minimum-scale=' + width / this.size)
    content.push('maximum-scale=' + width / this.size)
    content.push('user-scalable=no')
    meta.content = content.join(',')
    if (info !== null) {
      this.index = this.index + 1
      info.innerText = ('orientationchange' in window) + ' ' + this.index + ' ' + ' ' + meta.content
    }
  }
  return Viewport
}())
// 宽度
Viewport(750)
