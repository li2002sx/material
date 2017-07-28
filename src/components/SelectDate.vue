<template>
    <!--datetab-->
    <div class='datechange'>
        <ul class='layout'>
            <li class='td' @click="showDay(-1)">前一天</li>
            <li class='td'>出勤 | <em @click="showPlugin()">{{endDate | format}}</em></li>
            <li class='td' @click="showDay(1)">后一天</li>
        </ul>
    </div>
    <!--datetab end-->
</template>

<script>
  import {numberPad, Datetime, dateFormat} from 'vux'
  export default {
    props: ['tab'],
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
            that.$emit('statFun', that.endDate)
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
      showDay: function (value) {
        value = parseInt(value) || 0
        this.endDate = this.addDate(this.endDate, value)
        this.$emit('statFun', this.endDate)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
