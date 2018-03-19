<template>
  <section>
    <div class="materiallist" @click="showMaterial($event)" v-for="(item, index) in materialList">
      <h4 class="stocktit">{{index + 1}}.{{item.material.materialName}}</h4>
      <dl class="stockstep1 hide">
          <dd>
              <label>验收量</label>
              <p class="txt">{{item.arrivalCount}}</p>
          </dd>
          <dd>
              <label>无税单价</label>
              <p class="txt">{{item.priceExtax}}</p>
          </dd>
          <dd>
              <label>无税金额</label>
              <p class="txt">{{item.amtExtax}}</p>
          </dd>
          <dd>
              <label>税率</label>
              <p class="txt">{{item.taxRate}}</p>
          </dd>
          <dd>
              <label>含税单价</label>
              <p class="txt">{{item.priceIntax}}</p>
          </dd>
          <dd>
              <label>含税金额</label>
              <p class="txt">{{item.amtIntax}}</p>
          </dd>
          <dd>
              <label>税额</label>
              <p class="txt">{{item.amtTax}}</p>
          </dd>
          <dd>
              <label>最大可验收</label>
              <p class="txt"></p>
          </dd>
          <dd>
              <label>余额</label>
              <p class="txt">{{item.arrivalCount * item.priceExtax}}</p>
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

