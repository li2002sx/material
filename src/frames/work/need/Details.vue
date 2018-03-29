<template>
  <section>
    <div v-title data-title="中建东方装饰有限公司"></div>
    <dl class="stocktool" v-show="data.status == '02'">
        <dd @click="auditDialog()">审批</dd>
    </dl>
    <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
      </tab-item>
    </tab>
    <!--list-->
    <div class="stockin">
        <detail-info :material-map="materialMap" :status-map="statusMap" :data="data" v-show="index==0"></detail-info>
        <detail-material :material-map="materialMap" v-show="index==1" :data="data"></detail-material>
        <detail-attach :attach-list="data.attachList" v-show="index==2"></detail-attach>
        <detail-history v-show="index==3"></detail-history>
    </div>
    <!--list-->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom, Tab, TabItem } from 'vux'
import detailInfo from './Detail-Info'
import detailMaterial from './Detail-Material'
import detailAttach from '../Detail-Attach'
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
    detailAttach,
    detailHistory
  },
  data () {
    return {
      list2: ['基本信息', '材料明细', '附件信息', '历史审批'],
      demo2: '基本信息',
      index: 0,
      procId: this.$route.params.procId || '',
      taskId: this.$route.params.taskId || '',
      billId: this.$route.params.billId || '',
      data: {
        project: {},
        gcontrol: {}
      },
      materialMap: new Map(),
      statusMap: new Map()
    }
  },
  created () {
    this.materialMap = this.getDict('materialClass')
    this.statusMap = this.getDict('status')
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
      let requestUrl = 'appData/app/getNeedplanInfo'
      let that = this
      this.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.data = result.map.needplan
          if (that.data.gcontrol === undefined) {
            that.data.gcontrol = {}
          }
          if (that.data.attachList === undefined) {
            that.data.attachList = []
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

