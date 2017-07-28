<template>
    <dd @click="showPlugin()">
        <p class="td">{{title}}<i class="c-chartred"></i></p>
        <p class="td tr"><span class="after">{{endDate | format}}</span></p>
    </dd>
</template>

<script>
  import {numberPad, Datetime, dateFormat} from 'vux'
  export default {
    props: ['title'],
    data () {
      return {
        endDate: new Date()
      }
    },
    components: {
      numberPad,
      Datetime
    },
    filters: {
      format: function (value) {
        return dateFormat(value, 'YYYY-MM-DD')
      }
    },
    methods: {
      showPlugin () {
        let that = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: dateFormat(this.endDate, 'YYYY-MM-DD'),
          onConfirm (val) {
            console.log('plugin confirm', val)
            that.endDate = val
            that.$emit('selectSingleDate', that.endDate)
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
