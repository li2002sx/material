<template>
  <section>
    <div v-title data-title="中建东方装饰有限公司"></div>
    <dl class="stocktool">
        <dd @click="auditDialog()">审批</dd>
    </dl>
    <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
      </tab-item>
    </tab>
    <!--list-->
    <div class="stockin">
        <detail-info :material-map="materialMap" :status-map="statusMap" :data="data" v-show="index==0"></detail-info>
        <detail-material :material-list="data.gcontrolMaterialList" v-show="index==1"></detail-material>
        <detail-pic v-show="index==2"></detail-pic>
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
      procId: this.$route.params.procId || '',
      taskId: this.$route.params.taskId || '',
      billId: this.$route.params.billId || '',
      data: {
        createBy: {
          company: {},
          office: {}
        },
        project: {},
        office: {},
        gcontrolMaterialList: []
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
      let requestUrl = 'appData/app/getGcontrolInfo'
      let that = this
      this.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.data = result.map.gcontrolPlan
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    auditDialog () {
      let that = this
      this.$vux.confirm.prompt('', {
        title: '任务审批',
        hideOnBlur: true,
        confirmText: '同意',
        cancelText: '驳回',
        onConfirm (msg) {
          that.audit(that.taskId, that.procId, msg, 'yes')
        },
        onCancel (msg) {
          that.audit(that.taskId, that.procId, msg, 'no')
        }
      })
    }
  }
}
</script>

