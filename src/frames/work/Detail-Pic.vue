<template>
  <section>
    <div v-transfer-dom>
      <previewer :list="showList" ref="previewer" :options="options"></previewer>
    </div>
    <!-- list -->
    <div class="picturewall">
        <dl>
            <dd @click="show(index)" v-for="(item, index) in attachList">
                <img class="previewer-demo-img" :src="item | realPath" alt="图片名称" />
            </dd>
        </dl>
    </div>
    <!-- list end -->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom, Previewer } from 'vux'
export default {
  props: ['attachList'],
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  data () {
    return {
      showList: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
        }
      }
    }
  },
  created () {
    // this.getAttachList()
  },
  filters: {
    realPath (item) {
      return global.picUrl + item.filePath + '/' + item.id + '.' + item.fileSuffix
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    getAttachList () {
      for (let item of this.attachList) {
        let param = {
          src: global.picUrl + item.filePath + '/' + item.id + '.' + item.fileSuffix
        }
        this.showList.push(param)
      }
    },
    show (index) {
      this.$refs.previewer.show(index)
    }
  }
}
</script>

