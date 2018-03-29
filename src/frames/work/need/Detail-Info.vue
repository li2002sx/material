<template>
  <section>
    <dl class="stockstep1">
        <dd>
            <label>需用计划编号</label>
            <p class="txt">{{data.nplanNo}}</p>
        </dd>
        <dd>
            <label>所属项目</label>
            <p class="txt">{{data.project.projectName}}</p>
        </dd>
        <dd>
            <label>材料类别</label>
            <p class="txt">{{materialMap.get(data.matrialClass)}}</p>
        </dd>
        <dd>
            <label>计划指定日期</label>
            <p class="txt">{{data.planDate}}</p>
        </dd>
        <dd>
            <label>计划使用日期</label>
            <p class="txt">{{data.planUseDate}}</p>
        </dd>
        <dd>
            <label>计划验收日期</label>
            <p class="txt">{{data.planacceptDate}}</p>
        </dd>
        <dd>
            <label>总控计划</label>
            <p class="txt">{{data.gcontrol.planNo}}</p>
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
      billId: this.$route.params.billId || ''
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

