<template>
  <section>
    <div v-transfer-dom>
      <previewer :list="showList" ref="previewer" :options="options"></previewer>
    </div>
    <div v-title data-title="成交客户"></div>
    <!--header end  -->
    <dl class="toolbar" v-if="userId==undefined">
      <dd @click="savePhoto">
        <i>保存</i>
      </dd>
      <dd class="tc" @click="delPhotos">
        <i>删除</i>
      </dd>
      <dd class="tr">
        <i>上传</i>
        <input type="file" accept="image/*" @change="onFileChange" class="allfile" multiple="multiple" /> </dd>
    </dl>
    <!--mybox  -->
    <div class="guestbox">
      <div class="guestnull" v-if="userPhotos.length == 0 && addPhotos.length == 0">
        <i class="ico-guestnull"></i>
        <p>暂无成交客户信息</p>
        <p>点击左下角“添加图片”按钮进行添加</p>
      </div>
      <div v-else>
        <scroller ref="scroller" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="-48" @on-pullup-loading="getPhotos">
          <div class="guestlist">
            <dl>
              <dd v-for="(item, index) in addPhotos" @click="selectImage(index)">
                <img :src="item" />
              </dd>
              <!--一定要生成正方形的图  -->
              <dd v-for="(item, index) in userPhotos" @click="select(item.photoId,index)">
                <img class="previewer-demo-img" :src="item.picUrl" />
              </dd>
            </dl>
          </div>
        </scroller>
      </div>
    </div>

    <!--mybox end  -->
    <div v-transfer-dom>
      <popup v-model="showTip" position="bottom" :show-mask="false">
        <div class="position-vertical-demo">
          您有{{addPhotos.length}}张图片未保存，请点击保存按钮
        </div>
      </popup>
    </div>
  </section>
</template>

<script>
import { cookie, TransferDom, Popup, Previewer, Scroller, Spinner } from 'vux'
import Exif from 'exif-js'
export default {
  directives: {
    TransferDom
  },
  components: {
    cookie,
    Popup,
    Previewer,
    Scroller,
    Spinner
  },
  data () {
    return {
      userId: this.$route.params.userId,
      showTip: false,
      userPhotos: [],
      addPhotos: [],
      photoIdSet: new Set(),
      imageSet: new Set(),
      showList: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
        }
      },
      pageIndex: 1,
      pullupStatus: 'default',
      pullupConfig: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '努力加载中...'
      }
    }
  },
  created () {
    this.getPhotos()
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    },
    select (photoId, index) {
      if (this.userId === undefined) {
        if (this.photoIdSet.has(photoId)) {
          this.photoIdSet.delete(photoId)
          event.target.className = ''
        } else {
          this.photoIdSet.add(photoId)
          event.target.parentNode.className = 'on'
        }
      } else {
        this.show(index)
      }
    },
    selectImage (index) {
      if (this.imageSet.has(index)) {
        this.imageSet.delete(index)
        event.target.className = ''
      } else {
        this.imageSet.add(index)
        event.target.parentNode.className = 'on'
      }
    },
    delPhotos () {
      if (this.imageSet.size > 0) {
        for (let index of this.imageSet) {
          this.addPhotos.shift(index)
        }
        if (this.addPhotos.length === 0) {
          this.showTip = false
        }
      }
      if (this.photoIdSet.size > 0) {
        let that = this
        this.$vux.confirm.show({
          title: '提示',
          content: '确定要删除吗？',
          confirmText: '删除',
          onConfirm () {
            let param = {
              photoIds: [...that.photoIdSet].join(',')
            }
            that.post('/rest/userphoto/delete', param, function (result) {
              if (result.status === 1) {
                that.toastShow('success', '删除成功')
                document.querySelectorAll('.on').forEach(function (item) {
                  item.remove()
                })
              } else {
                that.toastShow('text', result.message)
              }
            })
          }
        })
      } else {
        this.toastShow('text', '至少选择一个删除')
      }
    },
    getPhotos (uuid) {
      let param = {
        pageIndex: this.pageIndex
      }
      this.get('/rest/userphoto/list', param, function (result) {
        if (result.status === 1) {
          if (result.userPhotos.length === 0) {
            if (this.pageIndex > 1) {
              this.$nextTick(() => {
                this.$refs.scroller.disablePullup()
              })
            }
          } else {
            this.pageIndex++
            for (let item of result.userPhotos) {
              this.userPhotos.push(item)
              param = {
                src: item.picUrl
              }
              this.showList.push(param)
            }
            this.$nextTick(() => {
              this.$refs.scroller.reset()
              this.$refs.scroller.donePullup()
            })
          }
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files)
    },
    createImage (file) {
      if (typeof FileReader === 'undefined') {
        this.toastShow('text', '您的浏览器不支持图片上传，请升级您的浏览器')
        return false
      }
      var that = this
      var leng = file.length
      for (var i = 0; i < leng; i++) {
        let Orientation
        // 去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file[i], function () {
          Orientation = Exif.getTag(this, 'Orientation')
        })

        var reader = new FileReader()
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          var img = new Image()
          let result = e.target.result
          img.src = result

          // 判断图片是否大于100K,是就直接上传，反之压缩图片
          if (result.length <= (100 * 1024)) {
            that.addPhotos.push(result)
          } else {
            img.onload = function () {
              let data = that.compress(img, Orientation)
              that.addPhotos.push(data)
            }
          }
        }
      }
      this.showTip = true
    },
    savePhoto () {
      if (this.addPhotos.length > 0) {
        this.$vux.toast.show({
          type: 'text',
          text: '1/' + this.addPhotos.length,
          time: 10000000,
          position: 'middle'
        })
        let i = 0
        for (var image of this.addPhotos) {
          this.post('/rest/userphoto/upload', { image: image }, function (result) {
            if (result.status === 1) {
              i++
              document.querySelector('.weui-toast__content').innerHTML = i + '/' + this.addPhotos.length
              if (i === this.addPhotos.length) {
                location.reload()
              }
            } else {
              this.toastShow('text', result.message)
            }
          }.bind(this))
        }
      } else {
        this.toastShow('text', '请选择需要上传的图片')
      }
    },
    rotateImg (img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const minStep = 0
      const maxStep = 3
      if (img === null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step === null) {
        step = minStep
      }
      if (direction === 'right') {
        step++
        // 旋转到原位置，即超过最大值
        step > maxStep && (step = minStep)
      } else {
        step--
        step < minStep && (step = maxStep)
      }
      // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      // let initSize = img.src.length

      let width = img.width
      let height = img.height
      // if (width > 750) {
      //   let w = 750
      //   width = w
      //   height = w * (img.height / img.width)
      // }

      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        // console.log("大于400万像素")
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 1000000) > 1) {
        // console.log("超过100W像素")
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        // 计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6: // 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8: // 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3: // 需要180度旋转
            this.rotateImg(img, 'right', canvas) // 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      // console.log('压缩前：' + initSize);
      // console.log('压缩后：' + ndata.length);
      // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style-router/guest.css";
@import '~vux/src/styles/close.less';
.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}

.vux-popup-dialog {
  bottom: 100px;
}
</style>
