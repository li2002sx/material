<template>
  <section>
    <dd @click="modiAttrPopupPicker()">
        <label>{{title}}</label>
        <p class="txt">{{infoName}}</p>
        <i class="ico-sel"></i>
    </dd>
    <group v-show="showPopupPicker">
      <popup-picker :show="showPopupPicker" :show-cell="false" title="picker" :columns="2" :data="popupPickerData" @on-hide="hidePopupPicker" @on-change="changePopupPicker"></popup-picker>
    </group>
  </section>
</template>

<script>
import { TransferDom, Popup, Group, PopupPicker } from 'vux'
export default {
  props: ['title', 'type', 'infoName'],
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Group,
    PopupPicker
  },
  data () {
    return {
      showPopupPicker: false,
      popupPickerData: [],
      attr: '',
      info: {}
    }
  },
  filters: {
    subStr: function (value, num) {
      if (value !== undefined) {
        return value.substr(0, num)
      }
      return ''
    }
  },
  methods: {
    modiAttrPopupPicker () {
      this.popupPickerData = []
      var param = {
        type: this.type
      }
      let requestUrl = 'appData/app/getDictType'
      let that = this
      this.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          let items = [{ name: '请选择', value: '' }]
          result.map.list.forEach(function (info) {
            var item = {
              name: info.label,
              value: info.value
            }
            items.push(item)
          })
          that.popupPickerData.push(items)
        } else {
          that.toastShow('text', result.message)
        }
      })
      this.showPopupPicker = true
    },
    changePopupPicker (val) {
      for (let item of this.popupPickerData[0]) {
        if (item.value.toString() === val[0]) {
          this.info = item
          this.infoName = item.name
          break
        }
      }
      this.$emit('selectData', this.info)
      this.showPopupPicker = false
    },
    hidePopupPicker () {
      this.showPopupPicker = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
