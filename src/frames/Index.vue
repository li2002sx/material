<template>
  <section>
    <div v-title data-title="共享车源"></div>
    <footerMenu tab="0"></footerMenu>
    <!--search  -->
    <div class="searchbox">
      <div class="searchmod cur" @click="toUrl('/car/search')">
        <input type="text" placeholder="搜索车型" />
      </div>
    </div>
    <!--search end  -->
    <!--mybox  -->
    <div class="indexbox">
      <scroller ref="scroller" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="954px" @on-pullup-loading="getCarModels">
        <div class="sharelist">
          <dl v-for="(item, index) in carModels" @click="toUrl('/car/template/'+item.carModelId)">
            <dd>
              <img :src="item.picUrl" />
            </dd>
            <dt class="layout">
              <h3 class="td">{{item.modelsName}}</h3>
              <span class="td tr">{{item.specName}}</span>
            </dt>
          </dl>
        </div>
      </scroller>
    </div>
    <!--mybox end  -->

  </section>
</template>

<script>
import { cookie, Scroller, Spinner } from 'vux'
import footerMenu from '../components/Footer.vue'

export default {
  components: {
    cookie,
    footerMenu,
    Scroller,
    Spinner
  },
  data () {
    return {
      carModels: [],
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
    // this.wxAuth()
    this.getCarModels()
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    getCarModels (uuid) {
      this.get('/rest/carmodel/list', { pageIndex: this.pageIndex }, function (result) {
        if (result.status === 1) {
          if (result.carModelList.length === 0) {
            this.$nextTick(() => {
              this.$refs.scroller.disablePullup()
            })
          } else {
            this.pageIndex++
            for (let item of result.carModelList) {
              this.carModels.push(item)
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
    }
  }
}
</script>

<style>
@import "../style-router/index.css";
</style>
