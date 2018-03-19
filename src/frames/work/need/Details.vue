<template>
  <section>
    <div v-title data-title="中建东方装饰有限公司"></div>
    <dl class="stocktool">
        <dd @click="audit()">审批</dd>
    </dl>
    <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
      </tab-item>
    </tab>
    <!--list-->
    <div class="stockin">
        <detail-info :material-map="materialMap" :status-map="statusMap" v-show="index==0"></detail-info>
        <detail-material :material-map="materialMap" v-show="index==1"></detail-material>
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
      materialMap: new Map(),
      statusMap: new Map()
    }
  },
  created () {
    this.materialMap = this.getDict('materialClass')
    this.statusMap = this.getDict('status')
  },
  filters: {
  },
  computed: {},
  mounted () {

  },
  methods: {
    audit () {
      this.$vux.confirm.prompt('', {
        title: '任务审批',
        hideOnBlur: true,
        confirmText: '同意',
        cancelText: '驳回',
        onConfirm (msg) {

        },
        onCancel (msg) {

        }
      })
    }
  }
}
</script>

