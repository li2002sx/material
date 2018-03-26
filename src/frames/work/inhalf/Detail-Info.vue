<template>
  <section>
    <dl class="stockstep1">
        <dd>
            <label>验收单编号</label>
            <p class="txt">{{data.checkNo}}</p>
        </dd>
        <dd>
            <label>验收日期</label>
            <p class="txt">{{data.checkDate}}</p>
        </dd>
        <dd>
            <label>所属项目</label>
            <p class="txt">{{data.project.projectName}}</p>
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
            <label>总控计划</label>
            <p class="txt">{{data.gcontrol.planNo}}</p>
        </dd>
        <dd>
            <label>材料类别</label>
            <p class="txt">{{materialMap.get(data.materialClass)}}</p>
        </dd>
        <dd>
            <label>本期结算不含税金额</label>
            <p class="txt">{{data.nowAmount}}</p>
        </dd>
        <dd>
            <label>增值税税率</label>
            <p class="txt">{{data.taxRate}}%</p>
        </dd>
        <dd>
            <label>本期结算含税金额</label>
            <p class="txt">{{data.nowTaxAmount}}</p>
        </dd>
        <dd>
            <label>验收人</label>
            <p class="txt">{{data.checkPerson.name}}</p>
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

