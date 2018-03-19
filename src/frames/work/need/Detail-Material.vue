<template>
  <section>
    <div class="materiallist" @click="showMaterial($event)" v-for="(item, index) in data.list">
      <h4 class="stocktit">{{index + 1}}.{{item.material.materialName}}</h4>
      <dl class="stockstep1 hide">
          <dd>
              <label>材料类别</label>
              <p class="txt">{{materialMap.get(item.matrialClass)}}</p>
          </dd>
          <dd>
              <label>本期计划数量</label>
              <p class="txt">{{item.planCount}}</p>
          </dd>
          <dd>
              <label>剩余额度</label>
              <p class="txt">{{item.leftNeednum}}</p>
          </dd>
          <dd>
              <label>成本单价</label>
              <p class="txt">{{item.costUnivalent}}</p>
          </dd>
          <dd>
              <label>型号</label>
              <p class="txt">{{item.material.model}}</p>
          </dd>
          <dd>
              <label>规格</label>
              <p class="txt">{{item.material.standard}}</p>
          </dd>
          <dd>
              <label>单位</label>
              <p class="txt">{{item.material.unit}}</p>
          </dd>
          <!-- <dd>
              <label>备注</label>
              <p class="text">搞保护主义如同把自己关入黑屋子，看似躲过了风吹雨打，但也隔绝了阳光和空气。打贸易战的结果只能是两败俱伤</p>
          </dd> -->
      </dl>
    </div>
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
import $ from 'jquery'
export default {
  props: ['materialMap'],
  directives: {
    TransferDom
  },
  components: {

  },
  data () {
    return {
      billId: this.$route.params.billId || '',
      data: {}
    }
  },
  created () {
    this.getMaterials()
  },
  filters: {
  },
  computed: {},
  mounted () {

  },
  methods: {
    showMaterial (event) {
      let target = event.target
      $(target).closest('.materiallist').find('dl').slideToggle('100')
    },
    getMaterials () {
      var param = {
        plan: {
          id: this.billId
        }
      }
      let requestUrl = 'appData/app/getNeedplanMaterial'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.data = result.map
        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>

