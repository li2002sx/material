<template>
    <section>
        <dd>
            <p class="td">照片<i class="c-chartred"></i></p>
            <p class="td tr">
                <i class="button">
                    从手机相册选择
                    <input type="file" accept="image/*" @change="onFileChange" multiple="multiple"/>
                </i>
            </p>
        </dd>
        <dd v-if="images.length >0">
            <ul class="layout imglist">
                <li class="td" v-for="(image,index) in images">
                    <b class="imgbox">
                        <em class="del" title="删除" @click='delImage(index)'></em>
                        <img :src="image"/>
                    </b>
                </li>
            </ul>
        </dd>
    </section>
</template>

<script>
  import {TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {},
    data () {
      return {
        files: [],
        images: []
      }
    },
    computed: {
      picData: function () {
        return {
          files: this.files,
          images: this.images
        }
      }
    },
    methods: {
//      addPic (e) {
//        e.preventDefault()
//        document.getElementById('fileInput').click()
//          var evt = document.createEvent('MouseEvents')
//          evt.initEvent('click', true, true)
//          document.getElementById('fileInput').dispatchEvent(evt)
//        return false
//      },

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
          this.files.push(file[i])
          var reader = new FileReader()
          reader.readAsDataURL(file[i])
          reader.onload = function (e) {
            that.images.push(e.target.result)
          }
        }
        this.$emit('selectPicData', this.picData)
      },
      delImage: function (index) {
        this.files.shift(index)
        this.images.shift(index)
        this.$emit('selectPicData', this.picData)
      },
      removeImage: function (e) {
        this.images = []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
