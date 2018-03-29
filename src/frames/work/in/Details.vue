<template>
  <section>
    <div v-title data-title="中建东方装饰有限公司"></div>
    <dl class="stocktool" v-show="action == 'approve' && data.status == '02'">
        <dd @click="auditDialog()">审批</dd>
    </dl>
    <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
      </tab-item>
    </tab>
    <!--list-->
    <div class="stockin">
        <detail-info :material-map="materialMap" :status-map="statusMap" :pay-mode-map="payModeMap" :data="data" v-show="index==0"></detail-info>
        <detail-material :material-map="materialMap" :data="data" v-show="index==1"></detail-material>
        <detail-pic v-show="index==2" :attach-list="data.attachList"></detail-pic>
        <detail-history v-show="index==3"></detail-history>
    </div>
    <!--list-->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom, Tab, TabItem } from 'vux'
import detailInfo from './Detail-Info'
import detailMaterial from './Detail-Material'
import detailPic from '../Detail-Pic'
import detailHistory from '../Detail-History'
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    detailInfo,
    detailMaterial,
    detailPic,
    detailHistory
  },
  data () {
    return {
      list2: ['基本信息', '材料明细', '附件信息', '历史审批'],
      demo2: '基本信息',
      index: 0,
      action: this.$route.params.action || '',
      procId: this.$route.params.procId || '',
      taskId: this.$route.params.taskId || '',
      billId: this.$route.params.billId || '',
      data: {
        materialIn: {},
        project: {},
        gcontrol: {
          planNo: ''
        },
        supplier: {},
        compact: {},
        checkPerson: {},
        needPlan: {
          nplanNo: ''
        },
        inMaterialList: []
      },
      materialMap: new Map(),
      statusMap: new Map(),
      payModeMap: new Map()
    }
  },
  created () {
    this.materialMap = this.getDict('materialClass')
    this.statusMap = this.getDict('status')
    this.payModeMap = this.getDict('payMode')
    this.getDetail()
  },
  filters: {
  },
  computed: {},
  mounted () {

  },
  methods: {
    getDetail () {
      var param = {
        id: this.billId
      }
      let requestUrl = 'appData/app/checkInBill'
      let that = this
      this.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.data = result.map.checkBill
          if (that.data.gcontrol === undefined) {
            that.data.gcontrol = {
              planNo: ''
            }
          }
          if (that.data.needPlan === undefined) {
            that.data.needPlan = {
              nplanNo: ''
            }
          }
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    auditDialog () {
      let that = this
      this.$vux.confirm.prompt('请填写审批内容', {
        title: '任务审批',
        hideOnBlur: true,
        confirmText: '同意',
        cancelText: '驳回',
        onConfirm (msg) {
          if (msg.length === 0) {
            msg = '同意'
          }
          that.audit(that.taskId, that.procId, msg, 'yes')
        },
        onCancel (msg) {
          if (msg.length > 0) {
            that.audit(that.taskId, that.procId, msg, 'no')
          } else {
            that.toastShow('text', '驳回内容不能为空')
          }
        }
      })
    }
  }
}
</script>
