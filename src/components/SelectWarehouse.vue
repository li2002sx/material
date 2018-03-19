<template>
  <section>
    <dd @click="modiAttrPopupPicker('ware')">
        <label>库房</label>
        <p class="txt">{{ware.name}}</p>
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
  props: [],
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
      ware: {}
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
    modiAttrPopupPicker (attr) {
      this.popupPickerData = []
      this.attr = attr
      if (this.attr === 'ware') {
        let arr = [{ id: 0, name: '仓库一' }, { id: 1, name: '仓库二' }]
        this.popupPickerData.push(arr)
      }
      this.showPopupPicker = true
    },
    changePopupPicker (val) {
      if (this.attr === 'ware') {
        for (let item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.ware = item
            break
          }
        }
      }
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
