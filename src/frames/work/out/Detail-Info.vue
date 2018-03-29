<template>
  <section>
    <dl class="stockstep1">
        <dd>
            <label>出库单编号</label>
            <p class="txt">{{data.outNo}}</p>
        </dd>
        <dd>
            <label>验收单编号</label>
            <p class="txt">{{data.materialIn.inNo}}</p>
        </dd>
        <dd>
            <label>验收日期</label>
            <p class="txt">{{data.materialIn.checkDate}}</p>
        </dd>
        <dd>
            <label>所属项目</label>
            <p class="txt">{{data.project.projectName}}</p>
        </dd>
        <dd>
            <label>出库日期</label>
            <p class="txt">{{data.outDate}}</p>
        </dd>
        <dd>
            <label>领料单位</label>
            <p class="txt">{{data.receiveOrg.name}}</p>
        </dd>
        <dd>
            <label>领料人</label>
            <p class="txt">{{data.receivePerson.name}}</p>
        </dd>
        <dd>
            <label>材料类别</label>
            <p class="txt">{{materialMap.get(data.materialClass)}}</p>
        </dd>
        <dd>
            <label>状态</label>
            <p class="txt">{{statusMap.get(data.status)}}</p>
        </dd>
        <!-- <dd>
            <label>金额</label>
            <p class="txt">0107-CLZKJH-201802-0004</p>
        </dd> -->
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

