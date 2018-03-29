<template>
  <section>
    <div v-title data-title="我的申请"></div>
    <!-- <head-top title="工作台"></head-top> -->
    <footer-buttom tab="1"></footer-buttom>
    <!-- search -->
    <!-- <div class="indexsearch">
        <div class="searchmod">
            <input type="text" />
            <span>
                <i class="ico-search"></i>
                <em>搜索</em>
            </span>
        </div>
    </div> -->
    <!-- search end -->
    <!-- list -->
    <div class="bg">
      <dl class="todolist">
          <dd v-for="(item, index) in data.list">
              <div class="title" @click="toWorkDetail('detail',item.procInsId,item.procDefKey,0,item.businessId)">
                  <i>{{index + 1}}</i>
                  <h3>{{item.vars.map.applyName}}的申请单</h3>
                  <p class="time">单据编号：{{item.vars.map.billMarkNo}}</p>
                  <p class="time">单据类型：{{item.procDefName}}</p>
                  <p class="time">申请人：{{item.vars.map.applyName}}</p>
                  <p class="time">申请时间：{{item.procStartDate}}</p>
                  <p class="time" v-show="item.procEndDate != undefined">完成时间：{{item.procEndDate}}</p>
                  <p class="status">状态：
                    <template v-if="item.procEndDate != undefined">
                      已完成
                    </template>
                    <template v-else>
                      进行中
                    </template>
                  </p>
                  <p class="lastdate">{{item.procStartDate | format}}</p>
              </div>
              <div class="other">
                  <span>项目名称：{{item.vars.map.projectName}}</span>
              </div>
          </dd>

      </dl>
    </div>
    <!-- list end -->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom, Tab, TabItem, Datetime, dateFormat } from 'vux'
import headTop from '../../components/Header.vue'
import footerButtom from '../../components/Footer.vue'
// import bridge from './vue-temp/vue-editor-bridge';
export default {
  directives: {
    TransferDom
  },
  components: {
    headTop,
    footerButtom,
    Tab,
    TabItem,
    Datetime
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.getMyApplies()
  },
  filters: {
    format: function (value) {
      return dateFormat(value, 'YYYY-MM-DD')
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    getMyApplies () {
      var param = {
        pageNo: 1,
        pageSize: 100
      }
      let requestUrl = 'appData/app/myApplyData'
      let that = this
      this.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.data = result.map
        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>

