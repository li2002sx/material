<template>
  <section>
    <dd @click="modiAttrPopupPicker('incompany')">
        <label>领料单位</label>
        <p class="txt">{{incompany.name}}</p>
        <i class="ico-sel"></i>
    </dd>
    <dd @click="modiAttrPopupPicker('inperson')">
        <label>领料人</label>
        <p class="txt">{{inperson.name}}</p>
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
      incompany: {},
      inperson: {}
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
      if (this.attr === 'incompany') {
        let arr = [{ id: 0, name: '工程部1' }, { id: 1, name: '工程部2' }]
        this.popupPickerData.push(arr)
      }
      this.showPopupPicker = true
    },
    changePopupPicker (val) {
      if (this.attr === 'incompany') {
        for (let item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.incompany = item
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
