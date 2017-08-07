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
            this.$nextTick(() => {
              this.$refs.scroller.disablePullup()
            })
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
        var reader = new FileReader()
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          that.addPhotos.push(e.target.result)
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
              document.querySelector('.weui-toast__content').innerHTML = (i + 1) + '/' + this.addPhotos.length
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
