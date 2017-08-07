<template>
  <section>
    <!--search  -->
    <div class="searchtop">
      <div class="searchmod layout">
        <div class="td">
          <input type="text" placeholder="输入车型名称" @keyup="searchByKey" v-model="searchKey" />
        </div>
        <div class="td">
          <button @click="search">搜索</button>
        </div>
      </div>
    </div>
    <!--search end  -->
    <!--kw list  -->
    <dl class="kwlist" v-for="(item, index) in carModels">
      <dd @click="searchList(item.modelsId,item.modelsName)">{{item.modelsName}}</dd>
    </dl>
    <!--kw list end  -->
  </section>
</template>

<script>
import { cookie } from 'vux'
export default {
  components: {
    cookie
  },
  data () {
    return {
      searchKey: '',
      carModels: []
    }
  },
  created () {
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    search () {
      if (this.searchKey.length > 0) {
        this.toUrl('/car/searchlist/0/' + encodeURI(this.searchKey))
      } else {
        this.toastShow('text', '关键字不能为空')
      }
    },
    searchList (value, name) {
      this.toUrl('/car/searchlist/' + value + '/' + encodeURI(name))
    },
    searchByKey () {
      this.getCarModels()
    },
    getCarModels () {
      let param = {
        searchKey: this.searchKey,
        pageIndex: 1
      }
      if (param.searchKey.length > 0) {
        this.get('/rest/carmodel/list', param, function (result) {
          if (result.status === 1) {
            this.carModels = result.carModelList
          } else {
            this.toastShow('text', result.message)
          }
        }.bind(this))
      }
    }
  }
}
</script>

<style>
@import "../../style-router/search.css";
</style>
