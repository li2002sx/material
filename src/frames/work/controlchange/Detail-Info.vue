<template>
  <section>
    <dl class="stockstep1">
        <dd>
            <label>调整类型</label>
            <p class="txt">{{adjustMap.get(data.adjustReasonClass)}}</p>
        </dd>
        <div v-show="data.adjustReasonClass == '01'">
          <dd>
              <label>变更指令</label>
              <p class="txt">{{adjustSubMap.get(data.adjustReasonSubClass)}}</p>
          </dd>
          <dd>
              <label>计划签证日期</label>
              <p class="txt">{{data.visaPlanDate}}</p>
          </dd>
        </div>
        <dd>
            <label>变更原因</label>
            <p class="txt">{{data.adjustReason}}</p>
        </dd>
        <dd>
            <label>编号</label>
            <p class="txt">{{data.planNo}}</p>
        </dd>
        <dd>
            <label>状态</label>
            <p class="txt">{{statusMap.get(data.status)}}</p>
        </dd>
        <dd>
            <label>编制机构</label>
            <p class="txt">{{data.createOrg}}</p>
        </dd>
        <dd>
            <label>编制人</label>
            <p class="txt">{{data.project.projectName}}</p>
        </dd>
        <dd>
            <label>计划日期</label>
            <p class="txt">{{data.visaDate}}</p>
        </dd>
        <dd>
            <label>所属项目</label>
            <p class="txt">{{data.project.projectName}}</p>
        </dd>
        <dd>
            <label>备注</label>
            <p class="txt">{{data.remarks}}</p>
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
  props: ['materialMap', 'statusMap', 'adjustMap', 'adjustSubMap', 'data'],
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

