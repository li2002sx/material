<template>
  <section>
    <dl class="stockstep1">
        <dd>
            <label>合同编号</label>
            <p class="txt">{{data.compactNo}}</p>
        </dd>
        <dd>
            <label>所属项目</label>
            <p class="txt">{{data.project.projectName}}</p>
        </dd>
        <dd>
            <label>总控计划编号</label>
            <p class="txt">{{data.gcontrol.planNo}}</p>
        </dd>
        <dd>
            <label>甲方</label>
            <p class="txt">{{data.parta}}</p>
        </dd>
        <dd>
            <label>签约日期</label>
            <p class="txt">{{data.contractDate}}</p>
        </dd>
        <dd>
            <label>材料类别</label>
            <p class="txt">{{materialMap.get(data.materialClass)}}</p>
        </dd>
        <dd>
            <label>云筑网合同编号</label>
            <p class="txt">{{data.relaCompactno}}</p>
        </dd>
        <dd>
            <label>合同名称</label>
            <p class="txt">{{data.compactName}}</p>
        </dd>
        <dd>
            <label>备案编号</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>合同分类</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>合同形式</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>合同状态</label>
            <p class="txt">{{statusMap.get(data.status)}}</p>
        </dd>
        <dd>
            <label>乙方</label>
            <p class="txt">{{data.partbName}}</p>
        </dd>
        <dd>
            <label>乙方纳税人类别</label>
            <p class="txt"></p>
        </dd>
        <dd>
            <label>经办人</label>
            <p class="txt">{{data.operater.name}}</p>
        </dd>
        <dd>
            <label>税率(%)</label>
            <p class="txt">{{data.taxRate}}</p>
        </dd>
        <dd>
            <label>含税金额</label>
            <p class="txt">{{data.amtIntax}}</p>
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
  props: ['materialMap', 'statusMap'],
  directives: {
    TransferDom
  },
  components: {

  },
  data () {
    return {
      billId: this.$route.params.billId || '',
      data: {
        project: {},
        gcontrol: {},
        operater: {}
      }
    }
  },
  created () {
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
      let requestUrl = 'appData/app/getCompactInfo'
      let that = this
      this.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.data = result.map.compact
        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>

