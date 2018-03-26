<template>
  <section>
    <div class="materiallist" @click="showMaterial($event)">
      <!-- <h4 class="stocktit">{{index + 1}}.{{item.material.materialName}}</h4>
      <dl class="stockstep1 hide"> -->
          <!-- <dd>
              <label>材料类别</label>
              <p class="txt">{{materialMap.get(item.materialClass)}}</p>
          </dd> -->
          <!-- <dd>
              <label>备注</label>
              <p class="text">搞保护主义如同把自己关入黑屋子，看似躲过了风吹雨打，但也隔绝了阳光和空气。打贸易战的结果只能是两败俱伤</p>
          </dd> -->
      <!-- </dl>-->
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

