<template>
    <section class="child_page">
        <headerTop title="人员分析"></headerTop>
        <!--tabchange-->
        <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
            <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"
                      @click="demo2 = item"
                      :key="index">{{item}}
            </tab-item>
        </tab>
        <!--tab end-->
        <staffAge v-show="index==0"></staffAge>
        <staffJob v-show="index==1"></staffJob>
        <!--<staffAge v-show="index==2"></staffAge>-->
    </section>
</template>

<script>
  import headerTop from '../../components/Header.vue'
  import staffAge from './Staff-Age.vue'
  import staffJob from './Staff-Job.vue'
  import {Tab, TabItem} from 'vux'
  export default {
    components: {
      headerTop,
      Tab,
      TabItem,
      staffAge,
      staffJob
    },
    data () {
      return {
        list2: ['年龄', '工种', '籍贯', '文化', '性别', '年限'],
        demo2: '年龄',
        index: 0
      }
    },
    created: function () {
//      this.getData()
    },
    filters: {
      subStr: function (value, num) {
        return value.substr(0, num)
      }
    },
    computed: {},
    mounted: function () {
//      this.drawCompanyChart()
//      this.drawAreaChart()
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
    @import "../../less/analysis.css";
</style>
