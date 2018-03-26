<template>
  <dd>
      <label>{{title}}</label>
      <p class="txt">{{date | format}}</p>
      <!-- <input type="text" :value="date | format" class="input" /> -->
      <i class="ico-date" @click="showPlugin()"></i>
  </dd>
</template>

<script>
import { numberPad, Datetime, dateFormat } from 'vux'
export default {
  props: ['title', 'type', 'date'],
  data () {
    return {

    }
  },
  components: {
    numberPad,
    Datetime
  },
  filters: {
    format: function (value) {
      if (value === null) {
        value = new Date()
      }
      return dateFormat(value, 'YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    showPlugin () {
      let that = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD HH:mm',
        value: dateFormat(this.endDate, 'YYYY-MM-DD HH:mm:ss'),
        onConfirm (val) {
          let data = {
            type: that.type,
            value: val
          }
          that.date = val
          that.$emit('selectData', data)
        },
        onShow () {

        },
        onHide () {

        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
