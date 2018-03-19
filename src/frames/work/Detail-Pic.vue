<template>
  <section>
    <div v-transfer-dom>
      <previewer :list="showList" ref="previewer" :options="options"></previewer>
    </div>
    <!-- list -->
    <div class="picturewall">
        <dl>
            <dd @click="show(0)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/08/07/093148.76904222_200x200.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(1)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/12/06/145359.23295325_200x200.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(2)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/12/05/141845.40503974_200x200.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(3)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/08/07/093148.76904222_200x200.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(4)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/12/06/145359.23295325_200x200.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(5)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/08/07/093148.76904222.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(6)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/12/21/150439.86930999_200x200.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(7)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/08/07/093148.76904222_200x300.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(8)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/12/05/141845.40503974_400x200.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(9)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/08/07/093148.76904222_200x200.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(10)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/08/07/093148.76904222_200x200.jpg" alt="图片名称" />
            </dd>
            <dd @click="show(11)">
                <img class="previewer-demo-img" src="http://img5.mtime.cn/mg/2017/08/07/093148.76904222_200x200.jpg" alt="图片名称" />
            </dd>
        </dl>
    </div>
    <!-- list end -->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom, Previewer } from 'vux'

export default {
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
    this.getPhotoList()
  },
  filters: {
  },
  computed: {},
  mounted () {
  },
  methods: {
    getPhotoList () {
      for (var i = 0; i < 13; i++) {
        let param = {
          src: 'http://img5.mtime.cn/mg/2017/08/07/093148.76904222_200x200.jpg'
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

