<template>
    <group title="">
        <popup-picker :title="title" :data="typeNameData"
                      @on-show="showType" v-model="typeNameValue" show-name
                      @on-change="changeType"></popup-picker>
    </group>
</template>

<script>
  import {TransferDom, Popup, Group, PopupPicker} from 'vux'
  export default {
    props: ['title', 'code'],
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
        typeNameData: [],
        typeNameValue: []
      }
    },
    methods: {
      showType () {
        this.typeNameData = []
        let param = {
          classCode: this.code
        }
        this.post('/LaborManage/sysDic/findDicByClassCode.htm', param, function (result) {
          if (result != null && result.length > 0) {
            let types = []
            result.forEach(function (item) {
              let type = {
                name: item.dataValue,
                value: item.dataCode == null ? '0' : item.dataCode
              }
              types.push(type)
            })
            this.typeNameData.push(types)
          } else {
            this.toastShow('text', '没有找到班组记录')
          }
        }.bind(this))
      },
      changeType (val) {
        this.$emit('selectType', val[0])
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
