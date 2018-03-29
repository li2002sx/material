<template>
  <section>
    <dl class="stockstep1" v-if="data.materialClass == '01'">
        <dd>
            <label>验收单编号</label>
            <p class="txt">{{data.inNo}}</p>
        </dd>
        <dd>
            <label>材料类别</label>
            <p class="txt">{{materialMap.get(data.materialClass)}}</p>
        </dd>
        <dd>
            <label>验收日期</label>
            <p class="txt">{{data.checkDate}}</p>
        </dd>
        <dd>
            <label>付款方式</label>
            <p class="txt">{{payModeMap.get(data.payMode)}}</p>
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
            <p class="txt">{{data.gcontrol==undefined?'':data.gcontrol.planNo}}</p>
        </dd>
        <dd>
            <label>材料类别</label>
            <p class="txt">{{materialMap.get(data.materialClass)}}</p>
        </dd>
        <dd>
            <label>云筑网合同编号</label>
            <p class="txt">{{data.releCompactno}}</p>
        </dd>
        <dd>
            <label>需用计划</label>
            <p class="txt">{{data.needPlan==undefined?'':data.needPlan.nplanNo}}</p>
        </dd>
        <!-- <dd>
            <label>验收金额</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>剩余额度</label>
            <p class="txt"></p>
        </dd> -->
        <!-- <dd>
            <label>备注</label>
            <p class="text">搞保护主义如同把自己关入黑屋子，看似躲过了风吹雨打，但也隔绝了阳光和空气。打贸易战的结果只能是两败俱伤</p>
        </dd> -->
    </dl>
    <dl class="stockstep1" v-else>
        <dd>
            <label>验收单编号</label>
            <p class="txt">{{data.inNo}}</p>
        </dd>
        <dd>
            <label>材料类别</label>
            <p class="txt">{{materialMap.get(data.materialClass)}}</p>
        </dd>
        <dd>
            <label>验收日期</label>
            <p class="txt">{{data.checkDate}}</p>
        </dd>
        <dd>
            <label>付款方式</label>
            <p class="txt">{{payModeMap.get(data.payMode)}}</p>
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
            <label>需用计划</label>
            <p class="txt">{{data.needPlan==undefined?'':data.needPlan.nplanNo}}</p>
        </dd>
    </dl>
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
export default {
  props: ['materialMap', 'statusMap', 'payModeMap', 'data'],
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

