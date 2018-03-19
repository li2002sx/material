<template>
  <section>
    <div class="materiallist" @click="showMaterial($event)" v-for="(item, index) in materialList">
      <h4 class="stocktit" >{{index + 1}}.{{item.material.materialName}}</h4>
      <dl class="stockstep1 hide">
          <dd>
              <label>计划数量</label>
              <p class="txt">{{item.planCount}}</p>
          </dd>
          <dd>
              <label>成本单价</label>
              <p class="txt">{{item.costUnivalent}}</p>
          </dd>
          <dd>
              <label>总控金额</label>
              <p class="txt">{{item.planCount * item.costUnivalent}}</p>
          </dd>
          <dd>
              <label>投标预算量</label>
              <p class="txt">{{item.budgetCount}}</p>
          </dd>
          <dd>
              <label>投标预算价格</label>
              <p class="txt">{{item.budgetPrice}}</p>
          </dd>
          <dd>
              <label>预算金额</label>
              <p class="txt">{{item.budgetCount * item.budgetPrice}}</p>
          </dd>
          <dd>
              <label>是否存在调整</label>
              <p class="txt">否</p>
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
  props: ['materialList'],
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
    showMaterial (event) {
      let target = event.target
      $(target).closest('.materiallist').find('dl').slideToggle('100')
    }
  }
}
</script>

