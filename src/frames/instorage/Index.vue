<template>
  <section>
    <div v-title data-title="验收单"></div>
    <dl class="stocktool">
        <dd v-if="index==0" @click="toUrl('/in/add')">新增主材料验收单</dd>
        <dd v-else-if="index==1" @click="toUrl('/in/addhalf/00')">新增半成品中间验收单</dd>
        <dd v-else-if="index==2" @click="toUrl('/in/addhalf/01')">新增半成品最终验收单</dd>
        <dd v-else-if="index==3" @click="toUrl('/in/addlittle')">新增零星材料验收单</dd>
    </dl>
    <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
      </tab-item>
    </tab>
    <!--list-->
    <div class="stockin">
      <dl v-show="index == 0" class="todolist">
          <dd v-for="(item, index) in mainData.list" @click="toUrl('/work/in/detail/0/0/' + item.id)">
              <div class="title">
                  <i>{{index + 1}}</i>
                  <h3>项目名称：{{item.project.projectName}}</h3>
                  <p class="time">验收单编号：{{item.inNo}}</p>
                  <p class="time">申请时间：{{item.createDate}}</p>
                  <p class="time">验收时间：{{item.checkDate}}</p>
                  <p class="time">付款方式：{{payModeMap.get(item.payMode)}}</p>
                  <p class="time">材料类型：{{materialMap.get(item.materialClass)}}</p>
                  <p class="status">状态：{{statusMap.get(item.status)}}</p>
              </div>
              <div class="other">
                  <span>供应商：{{item.supplier.venderName}}</span>
              </div>
          </dd>
      </dl>
      <dl v-show="index == 1" class="todolist">
          <dd v-for="(item, index) in halfMidData.list" @click="toUrl('/work/inhalf/detail/0/0/' + item.id)">
              <div class="title">
                  <i>{{index + 1}}</i>
                  <h3>项目名称：{{item.project.projectName}}</h3>
                  <p class="time">验收单编号：{{item.checkNo}}</p>
                  <p class="time">申请时间：{{item.createDate}}</p>
                  <p class="time">验收时间：{{item.checkDate}}</p>
                  <!-- <p class="time">付款方式：{{payModeMap.get(item.payMode)}}</p> -->
                  <p class="time">材料类型：{{materialMap.get(item.materialClass)}}</p>
                  <p class="time">验收类型：{{checkTypeMap.get(item.checkType)}}</p>
                  <p class="status">状态：{{statusMap.get(item.status)}}</p>
              </div>
              <div class="other">
                  <span>供应商：{{item.supplier.venderName}}</span>
              </div>
          </dd>
      </dl>
      <dl v-show="index == 2" class="todolist">
          <dd v-for="(item, index) in halfLastData.list" @click="toUrl('/work/inhalf/detail/0/0/' + item.id)">
              <div class="title">
                  <i>{{index + 1}}</i>
                  <h3>项目名称：{{item.project.projectName}}</h3>
                  <p class="time">验收单编号：{{item.checkNo}}</p>
                  <p class="time">申请时间：{{item.createDate}}</p>
                  <p class="time">验收时间：{{item.checkDate}}</p>
                  <!-- <p class="time">付款方式：{{payModeMap.get(item.payMode)}}</p> -->
                  <p class="time">材料类型：{{materialMap.get(item.materialClass)}}</p>
                  <p class="time">验收类型：{{checkTypeMap.get(item.checkType)}}</p>
                  <p class="status">状态：{{statusMap.get(item.status)}}</p>
              </div>
              <div class="other">
                  <span>供应商：{{item.supplier.venderName}}</span>
              </div>
          </dd>
      </dl>
      <dl v-show="index == 3" class="todolist">
          <dd v-for="(item, index) in littleData.list" @click="toUrl('/work/in/detail/0/0/' + item.id)">
              <div class="title">
                  <i>{{index + 1}}</i>
                  <h3>项目名称：{{item.project.projectName}}</h3>
                  <p class="time">验收单编号：{{item.inNo}}</p>
                  <p class="time">申请时间：{{item.createDate}}</p>
                  <p class="time">验收时间：{{item.checkDate}}</p>
                  <p class="time">付款方式：{{payModeMap.get(item.payMode)}}</p>
                  <p class="time">材料类型：{{materialMap.get(item.materialClass)}}</p>
                  <p class="status">状态：{{statusMap.get(item.status)}}</p>
              </div>
              <div class="other">
                  <span>供应商：{{item.supplier.venderName}}</span>
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
      list2: ['主材料', '半成品(中)', '半成品(终)', '零星材料'],
      demo2: '主材料',
      index: 0,
      materialMap: new Map(),
      statusMap: new Map(),
      payModeMap: new Map(),
      checkTypeMap: new Map(),
      materialType: '',
      mainData: {},
      halfMidData: {},
      halfLastData: {},
      littleData: {}
    }
  },
  created () {
    this.materialMap = this.getDict('materialClass')
    this.statusMap = this.getDict('status')
    this.payModeMap = this.getDict('payMode')
    this.checkTypeMap = this.getDict('checkType')
    this.getList('01')
    this.getList('03')
    this.getHalfList('00')
    this.getHalfList('01')
  },
  filters: {
  },
  computed: {},
  mounted () {

  },
  methods: {
    getList (materialType) {
      var param = {
        materialClass: materialType
      }
      let requestUrl = 'appData/app/checkInBillList'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {
          if (materialType === '01') {
            that.mainData = result.map
          } else if (materialType === '03') {
            that.littleData = result.map
          }
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    getHalfList (checkType) {
      var param = {
        checkType: checkType
      }
      let requestUrl = 'appData/app/checkHalfList'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {
          if (checkType === '00') {
            that.halfMidData = result.map
          } else if (checkType === '01') {
            that.halfLastData = result.map
          }
        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>
