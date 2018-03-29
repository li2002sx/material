<template>
  <section>
    <div v-title data-title="出库单"></div>
    <dl class="stocktool" v-show="hasRole('project_construct')">
        <dd @click="toUrl('/out/add')">新增出库单</dd>
    </dl>
    <!--list-->
    <div class="stockin">
      <dl class="todolist">
          <dd v-for="(item, index) in mainData.list" @click="toBillUrl(item)">
              <div class="title">
                  <i>{{index + 1}}</i>
                  <h3>项目名称：{{item.project.projectName}}</h3>
                  <p class="time">出库单编号：{{item.outNo}}</p>
                  <p class="time">出库时间：{{item.outDate}}</p>
                  <p class="time">材料类型：{{materialMap.get(item.materialClass)}}</p>
                  <p class="time">验收单编号：{{item.materialIn.inNo}}</p>
                  <p class="time">验收时间：{{item.materialIn.checkDate}}</p>
                  <p class="status">状态：{{statusMap.get(item.status)}}</p>
              </div>
              <div class="other">
                  <span>领料人：{{item.receivePerson.name}} 金额：{{item.amt}}</span>
              </div>
          </dd>
      </dl>
    </div>
    <!--list-->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom, Tab, TabItem } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      materialMap: new Map(),
      statusMap: new Map(),
      mainData: {}
    }
  },
  created () {
    this.materialMap = this.getDict('materialClass')
    this.statusMap = this.getDict('status')
    this.getList()
  },
  filters: {
  },
  computed: {},
  mounted () {

  },
  methods: {
    toBillUrl (item) {
      let procId = item.procInsId
      if (procId === undefined) {
        procId = '0'
      }
      if (this.hasRole('project_construct') && (item.status === '01' || item.status === '03')) {
        this.toUrl('/work/out/add/' + procId + '/' + item.id)
      } else {
        this.toUrl('/work/out/detail/' + procId + '/0/' + item.id)
      }
    },
    getList () {
      var param = {

      }
      let requestUrl = 'appData/app/OutBillList'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.mainData = result.map
          if (that.mainData.list.length === 0) {
            that.toastShow('text', '暂无出库单')
          }
        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>

