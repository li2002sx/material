<template>
  <section>
    <dd @click="modiAttrPopupPicker('handler')">
        <label>经办人</label>
        <p class="txt">{{handler.name}}</p>
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
      handler: {}
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
      if (this.attr === 'handler') {
        let arr = [{ id: 1, name: '赵一' }, { id: 2, name: '王二' }, { id: 3, name: '张三' }]
        this.popupPickerData.push(arr)
      }
      this.showPopupPicker = true
    },
    changePopupPicker (val) {
      if (this.attr === 'handler') {
        for (let item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.handler = item
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
