<template>
    <section>
        <div class="chartmod2">
            <h4 @click="showPopup">{{title}} | {{selectCompanyName}} ∨</h4>
        </div>
        <group title="">
            <popup-picker :show="showPopupPicker" :show-cell="false" :title="companyName" :data="companyNameData"
                          @on-show="showCompany" v-model="companyNameValue" show-name
                          @on-change="changeCompany" @on-hide="hideCompany"></popup-picker>
        </group>
    </section>
</template>

<script>
  import {TransferDom, Popup, Group, PopupPicker} from 'vux'
  export default {
    props: ['title'],
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
        selectCompanyName: '公司',
        companyName: '公司',
        companyNameData: [],
        companyNameValue: []
      }
    },
    methods: {
      showPopup () {
        this.showPopupPicker = true
      },
      showCompany () {
        this.companyNameData = []
        this.post('/LaborManage/appcommon/appOrgList.htm', {}, function (result) {
          if (result != null && result.length > 0) {
            let companys = []
            result.forEach(function (item) {
              let company = {
                name: item.orgname,
                value: item.orgid == null ? '' : item.orgid
              }
              companys.push(company)
            })
            this.companyNameData.push(companys)
          } else {
            this.toastShow('text', '没有找到公司记录')
          }
        }.bind(this))
      },
      changeCompany (val) {
//        this.formData.companyId = val[0]
        this.$emit('selectCompany', val[0])
        if (val !== this.companyNameValue) {
        }
      },
      hideCompany () {
        this.showPopupPicker = false
        this.companyNameData[0].forEach(function (item) {
          if (item.value.length > 0 && item.value === this.companyNameValue[0]) {
            this.selectCompanyName = item.name
            return
          }
        }.bind(this))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
