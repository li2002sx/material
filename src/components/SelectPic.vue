<template>
  <section>
    <dl class="imagelist">
      <dd>
          <ul class="uploadimg">
              <li v-for="(image,index) in images">
                  <i class="del" title="删除" @click='delImage(index)'></i>
                  <img :src="image" />
              </li>
              <li class="upfile">
                  <input type="file" accept="image/*" @change="onFileChange" multiple="multiple" />
              </li>
          </ul>
      </dd>
    </dl>
  </section>
</template>

<script>
import Exif from 'exif-js'
export default {
  props: ['images'],
  components: {

  },
  data () {
    return {

    }
  },
  created () {
    // this.images = []
  },
  mounted: function () {

  },
  methods: {
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
      this.fileCount = file.length
      let Orientation
      for (var i = 0; i < this.fileCount; i++) {
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
            that.images.push(result)
            that.$emit('selectData', that.images)
          } else {
            img.onload = function () {
              let data = that.compress(img, Orientation)
              if (that.images === undefined) {
                that.images = []
              }
              that.images.push(data)
              that.$emit('selectData', that.images)
            }
          }
        }
      }
    },
    delImage: function (index) {
      this.images.shift(index)
      this.$emit('selectData', this.images)
    },
    removeImage: function (e) {
      this.images = []
    }
  }
}
</script>
