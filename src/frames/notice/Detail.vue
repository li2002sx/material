<template>
  <section>
    <div v-title data-title="通知"></div>
      <!-- bottombar -->
      <div class="articlebottom">
          <ul class="layout">
              <li class="td"><i class="ico-download"></i></li>
              <li class="td"><i class="ico-fav"></i></li>
              <li class="td"><i class="ico-share"></i></li>
          </ul>
      </div>
      <!-- bottombar end -->
      <!-- content -->
      <div class="bg">
        <div class="articledetail">
            <h2>关于启用办公自动化系统的通知</h2>
            <div class="editbox">
                <b>总经办</b> <b>2017-08-16</b>
            </div>
            <div class="content">
                <p>教学目标：掌握剪刻基本方法和步骤, 锻炼学生动手动脑动口能力, 培养学生热爱生活的情感。</p>
                <p>课前准备：彩色纸, 胶水, 剪刀, 小刀，色卡纸, 优秀的剪纸作品等。</p>
                <p>教材分析：这是一节融剪, 刻, 说为一体的剪纸课, 表现内容以人物为主, 。要求学生先编一个故事，然后大胆地直接剪出故事中人物的外形, 用刀刻划出人物细节, 最后将剪、刻完成的人物形象组合在一起, 说一说故事的情节,
                    借以抒发内在蕴涵的情感，表达对生活的热爱 教学过程</p>
                <p>一 故事导入</p>
                <p>师： 同学们, 咱们平常是不是都喜欢听故事呢？</p>
                <p>生：是！</p>
                <p>师：老师今天为你们带来了一个有趣的故事, 你们想听吗 ？</p>
            </div>
        </div>
      </div>
      <!-- content end -->
  </section>
</template>

<script>
import { cookie, XDialog, TransferDomDirective as TransferDom, XButton } from 'vux'
// var PDFJS = require('pdfjs')
// import PDFJS from '../../config/pdf.js'
// import pdf from 'vue-pdf'
// import vueshowpdf from 'vueshowpdf'
export default {
  directives: {
    TransferDom
  },
  components: {
    cookie,
    // pdf,
    // vueshowpdf,
    XDialog,
    XButton
  },
  data () {
    return {
      artiId: parseInt(this.$route.params.artiId) || 0,
      arti: {},
      collect: false,
      showHideOnBlur: false,
      index: 0,
      page: 1,
      numPages: 0,
      interval: null,
      isshowpdf: false,
      size: 320
    }
  },
  created () {
    // this.getArti(this.artiId)
  },
  filters: {
    subStr: function (value, num) {
      return value.substr(0, num)
    },
    classStr: function (value) {
      return 'ico-' + value
    },
    fileNameStr: function (value) {
      return value.substr(value.lastIndexOf('/') + 1)
    },
    getRealPic: function (value, num) {
      return value.replace('-*.', '-' + (num - 1) + '.')
    }
  },
  computed: {},
  mounted () {
    this.resize(750)
  },
  beforeDestroy () {
    if (this.interval != null) {
      clearInterval(this.interval)
    }
  },
  methods: {
    resize (size) {
      this.size = isNaN(Number(size)) ? 320 : size
      // this.index = 0
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
      if (location.hash.indexOf('/arti/detail') > -1) {
        content.push('maximum-scale=' + width * 2 / this.size)
        content.push('user-scalable=yes')
      } else {
        content.push('maximum-scale=' + width / this.size)
        content.push('user-scalable=no')
      }
      meta.content = content.join(',')
      if (info !== null) {
        this.index = this.index + 1
        info.innerText = ('orientationchange' in window) + ' ' + this.index + ' ' + ' ' + meta.content
      }
    },
    closepdf () {
      this.isshowpdf = false
    },
    pdferr (errurl) {
      console.log(errurl)
    },
    getArti (artiId) {
      var param = {
        artiId: artiId
      }
      let that = this
      this.get('/rest/arti/info', param, function (result) {
        if (result.status === 1) {
          that.arti = result.arti
          that.collect = that.arti.collect === 1
          document.title = that.arti.title
          if (that.arti.firstTreeId === 2) {
            that.waterMarker()
          }
          // 显示
          that.$vux.loading.show({
            text: '文档加载中...'
          })
          that.interval = window.setInterval(function () {
            let contentHeight = document.querySelector('.content').offsetHeight
            if (contentHeight > 150) {
              // 隐藏
              that.$vux.loading.hide()
              clearInterval(that.interval)
              // console.log(1)
            }
          }, 200)
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    share (relatedType) {
      var param = {
        relatedType: relatedType,
        relatedId: this.artiId
      }
      let that = this
      this.post('/rest/userrecord/save', param, function (result) {
        if (result.status === 1) {
          that.toastShow('success', '操作成功')
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    userop (value) {
      switch (value) {
        case 1:
          this.share(1)
          this.collect = !this.collect
          break
        case 2:
          this.share(2)
          this.showHideOnBlur = true
          // location.href = global.apiUrl + 'rest/arti/down?artiId=' + this.artiId
          // var param = {
          //   artiId: this.artiId
          // }
          // let that = this
          // this.get('/rest/arti/down', param, function (result) {
          //   if (result.status === 1) {
          //   } else {
          //     that.toastShow('text', result.message)
          //   }
          // })
          // location.href = this.arti.fileUrl
          break
        case 3:
          this.toastShow('text', '请单击右上角去分享')
          break
        default:
          break
      }
    },
    downFile (item) {
      location.href = item.realFileUrl
    },
    goPage (index, num) {
      if (this.index !== index) {
        this.page = 1
      } else {
        let page = this.page + num
        if (page < 1) {
          page = 1
          this.toastShow('text', ' 已经是第一页了')
        } else if (page > this.numPages) {
          page = this.numPages
          this.toastShow('text', ' 已经是最后一页了')
        }
        this.page = page
      }
    },
    waterMarker () {
      let userName = this.getFieldByUseInfo('userName')
      if (userName.length > 0) {
        this.addWaterMarker(userName)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "~vux/src/styles/close";

.dialog-demo {
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
