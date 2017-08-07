<template>
  <section>
    <div v-title data-title="共享车源"></div>
    <!--search  -->
    <div class="searchtop">
      <div class="searchmod layout">
        <div class="td" @click="toUrl('/car/search')">
          <input type="text" placeholder="输入车型名称" v-model="modelsName" />
        </div>
        <div class="td">
          <button @click="toUrl('/car/search')">取消</button>
        </div>
      </div>
    </div>
    <!--search end  -->
    <!--mybox  -->
    <scroller ref="scroller" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="-40" @on-pullup-loading="getCarModels">
      <div class="sharelist">
        <dl v-for="(item, index) in carModels" @click="toUrl('/car/template/'+item.carModelId)">
          <dd>
            <img :src="item.picUrl" />
          </dd>
          <dt class="layout">
            <h3 class="td">{{item.modelsName}}</h3>
            <span class="td tr">{{item.specName}}</span>
          </dt>
          <dt class="btnbox">
            <button class="btnred" @click="addCar(item.carModelId)">选用此模板</button>
          </dt>
        </dl>
      </div>
    </scroller>
    <!--mybox end  -->
  </section>
</template>

<script>
import { cookie, Scroller, Spinner } from 'vux'

export default {
  components: {
    cookie,
    Scroller,
    Spinner
  },
  data () {
    return {
      carModels: [],
      modelsId: this.$route.params.modelsId,
      modelsName: this.$route.params.modelsName,
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
    this.getCarModels()
  },
  computed: {},
  mounted () {
  },
  methods: {
    addCar (carModelId) {
      this.$router.push('/my/editcar/' + carModelId + '/0')
    },
    getCarModels (uuid) {
      let param = {
        modelsId: this.modelsId,
        searchKey: this.modelsName,
        pageIndex: this.pageIndex
      }
      this.get('/rest/carmodel/list', param, function (result) {
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
@import "../../style-router/search.css";
</style>
