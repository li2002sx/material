<template>
  <section>
    <div v-title data-title="关于我们"></div>
    <div class="aboutus">
        <div class="logo">
            <img src="/static/images/qrcode.png" alt="二维码">
        </div>
        <p class="comname">中建东方装饰有限公司</p>
    </div>
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
export default {
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

