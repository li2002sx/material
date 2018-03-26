<template>
  <section>
    <div class="materiallist" v-for="(item, index) in data.attachList">
      <h4 class="stocktit" @click="showAttach(item)">{{index + 1}}.{{item.fileName}}</h4>
      <dl class="stockstep1 hide">
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
// import $ from 'jquery'
export default {
  props: ['data'],
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
    // this.getMaterials()
  },
  filters: {
  },
  computed: {},
  mounted () {

  },
  methods: {
    showAttach (item) {
      location.href = global.picUrl + item.filePath + '/' + item.id + '.' + item.fileSuffix
    }
  }
}
</script>

