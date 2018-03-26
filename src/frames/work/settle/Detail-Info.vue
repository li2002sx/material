<template>
  <section>
    <dl class="stockstep1">
        <dd>
            <label>结算单编号</label>
            <p class="txt">{{data.billNo}}</p>
        </dd>
        <dd>
            <label>结算日期</label>
            <p class="txt">{{data.settleDate}}</p>
        </dd>
        <dd>
            <label>所属项目</label>
            <p class="txt">{{data.project.projectName}}</p>
        </dd>
        <dd>
            <label>关联总控计划</label>
            <p class="txt">{{data.gcontrol.planNo}}</p>
        </dd>
        <dd>
            <label>供应商</label>
            <p class="txt">{{data.supplier.venderName}}</p>
        </dd>
        <dd>
            <label>合同编号</label>
            <p class="txt">{{data.compact.compactNo}}</p>
        </dd>
        <dd>
            <label>材料类别</label>
            <p class="txt">{{materialMap.get(data.materialClass)}}</p>
        </dd>
        <dd>
            <label>含税结算金额</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>抵扣税额</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>税率</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>本期按合同应付款</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>含本期累计已结算</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>含本期累计已支付</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>含本期累计欠款</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>编制机构</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>状态</label>
            <p class="txt">{{statusMap.get(data.status)}}</p>
        </dd>
        <!-- <dd>
            <label>备注</label>
            <p class="text">搞保护主义如同把自己关入黑屋子，看似躲过了风吹雨打，但也隔绝了阳光和空气。打贸易战的结果只能是两败俱伤</p>
        </dd> -->
    </dl>
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
export default {
  props: ['materialMap', 'statusMap', 'data'],
  directives: {
    TransferDom
  },
  components: {

  },
  data () {
    return {

    }
  },
  created () {

  },
  filters: {
  },
  computed: {},
  mounted () {

  },
  methods: {
  }
}
</script>

