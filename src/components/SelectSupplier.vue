<template>
  <section>
    <dd @click="modiAttrPopupPicker('project')">
        <label>项目</label>
        <p class="txt">{{projectName}}</p>
        <i class="ico-sel"></i>
    </dd>
    <!-- <dd @click="modiAttrPopupPicker('control')">
        <label>总控计划</label>
        <p class="txt">{{control.name}}</p>
        <i class="ico-sel"></i>
    </dd> -->
    <dd v-show="type!='half'" @click="modiAttrPopupPicker('need')">
        <label>需用计划</label>
        <p class="txt">{{needName}}</p>
        <i class="ico-sel"></i>
    </dd>
    <dd v-show="type!='instorage'" @click="modiAttrPopupPicker('supplier')">
        <label>供应商</label>
        <p class="txt">{{supplierName}}</p>
        <i class="ico-sel"></i>
    </dd>
    <dd v-show="type!='little' && type!='instorage'" @click="modiAttrPopupPicker('contract')">
        <label>合同编号</label>
        <p class="txt">{{contractName}}</p>
        <i class="ico-sel"></i>
    </dd>
    <dd v-show="type!='little' && type!='instorage'">
        <label>云筑网合同编号</label>
        <p class="txt">{{relaCompactNo}}</p>
    </dd>
    <dd v-show="type=='instorage'" @click="modiAttrPopupPicker('instorage')">
        <label>验收单</label>
        <p class="txt">{{instorageName}}</p>
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
  props: ['type', 'projectName', 'needName', 'supplierName', 'contractName', 'relaCompactNo', 'instorageName'],
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
      project: {},
      control: {},
      need: {},
      supplier: {},
      contract: {},
      contractList: {},
      contractFull: {},
      instorageList: {},
      instorage: {},
      instorageFull: {}
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
      var param
      if (this.attr === 'project') {
        let requestUrl = 'appData/app/getProjectList'
        let that = this
        param = {
          pageNo: 1,
          pageSize: 1000
        }
        this.get(requestUrl, param, function (result) {
          if (result.status === '1') {
            that.popupPickerData = []
            let items = [{ name: '请选择', value: '' }]
            result.map.list.forEach(function (info) {
              var item = {
                name: info.projectName,
                value: info.id
              }
              items.push(item)
            })
            that.popupPickerData.push(items)
          } else {
            that.toastShow('text', result.message)
          }
        })
      } else if (this.attr === 'control') {
        param = {
          project: {
            id: this.project.value
          }
        }
        if (param.project.id === undefined) {
          this.toastShow('text', '请先选择一个项目')
          return
        }
        let requestUrl = 'appData/app/getGcontrolPlanList'
        let that = this
        this.post(requestUrl, param, function (result) {
          if (result.status === '1') {
            that.popupPickerData = []
            let items = [{ name: '请选择', value: '' }]
            result.map.list.forEach(function (info) {
              var item = {
                name: info.planNo,
                value: info.id
              }
              items.push(item)
            })
            that.popupPickerData.push(items)
          } else {
            that.toastShow('text', result.message)
          }
        })
      } else if (this.attr === 'need') {
        param = {
          project: {
            id: this.project.value
          },
          gcontroller: {
            id: this.control.value
          }
        }
        if (param.project.id === undefined) {
          this.toastShow('text', '请先选择一个项目')
          return
        }
        let requestUrl = 'appData/app/getNeedplanList'
        let that = this
        this.post(requestUrl, param, function (result) {
          if (result.status === '1') {
            that.popupPickerData = []
            let items = [{ name: '请选择', value: '' }]
            // items.push({ name: '供应商测试', value: '817462fa85af4babaaea3575c4c2bc9f' })
            result.map.list.forEach(function (info) {
              var item = {
                name: info.nplanNo,
                value: info.id
              }
              items.push(item)
            })
            that.popupPickerData.push(items)
          } else {
            that.toastShow('text', result.message)
          }
        })
      } else if (this.attr === 'supplier') {
        param = {
          projectId: this.project.value
        }
        if (param.projectId === undefined) {
          this.toastShow('text', '请先选择一个项目')
          return
        }
        let requestUrl = 'appData/app/getSuppliers'
        let that = this
        this.post(requestUrl, param, function (result) {
          if (result.status === '1') {
            that.popupPickerData = []
            let items = [{ name: '请选择', value: '' }]
            // items.push({ name: '供应商测试', value: '817462fa85af4babaaea3575c4c2bc9f' })
            result.map.suppliers.forEach(function (info) {
              var item = {
                name: info.venderName,
                value: info.id
              }
              items.push(item)
            })
            that.popupPickerData.push(items)
          } else {
            that.toastShow('text', result.message)
          }
        })
      } else if (this.attr === 'contract') {
        let arr = []
        param = {
          project: {
            id: this.project.value
          },
          gcontroller: {
            id: this.control.value
          },
          supplier: {
            id: this.supplier.value
          }
        }
        if (param.project.id === undefined) {
          this.toastShow('text', '请先选择一个项目')
          return
        }
        if (param.supplier.id === undefined) {
          this.toastShow('text', '请先选择一个供应商')
          return
        }
        let requestUrl = 'appData/app/getCompactList'
        let that = this
        this.post(requestUrl, param, function (result) {
          if (result.status === '1') {
            that.popupPickerData = []
            let items = [{ name: '请选择', value: '' }]
            that.contractList = result.map.list
            result.map.list.forEach(function (info) {
              var item = {
                name: info.compactName,
                value: info.id
              }
              items.push(item)
            })
            that.popupPickerData.push(items)
          } else {
            that.toastShow('text', result.message)
          }
        })
        this.popupPickerData.push(arr)
      } else if (this.attr === 'instorage') {
        let arr = []
        param = {
          needPlan: {
            id: this.need.value
          }
        }
        if (param.needPlan.id === undefined) {
          this.toastShow('text', '请先选择一个需用计划')
          return
        }
        let requestUrl = 'appData/app/checkInBillList'
        let that = this
        this.post(requestUrl, param, function (result) {
          if (result.status === '1') {
            that.popupPickerData = []
            let items = [{ name: '请选择', value: '' }]
            that.instorageList = result.map.list
            result.map.list.forEach(function (info) {
              var item = {
                name: info.inNo,
                value: info.id
              }
              items.push(item)
            })
            that.popupPickerData.push(items)
          } else {
            that.toastShow('text', result.message)
          }
        })
        this.popupPickerData.push(arr)
      }
      this.showPopupPicker = true
    },
    changePopupPicker (val) {
      if (this.attr === 'project') {
        for (let item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.project = item
            this.projectName = item.name
            break
          }
        }
        this.supplier = {}
        this.contract = {}
      } else if (this.attr === 'control') {
        for (let item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.control = item
            break
          }
        }
        this.contract = {}
      } else if (this.attr === 'need') {
        for (let item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.need = item
            this.needName = item.name
            break
          }
        }
        this.contract = {}
      } else if (this.attr === 'supplier') {
        for (let item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.supplier = item
            this.supplierName = item.name
            break
          }
        }
        this.contract = {}
      } else if (this.attr === 'contract') {
        for (let item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.contract = item
            this.contractName = item.name
            break
          }
        }
        for (let item of this.contractList) {
          if (item.id.toString() === val[0]) {
            this.contractFull = item
            this.relaCompactNo = item.relaCompactno
            break
          }
        }
      } else if (this.attr === 'instorage') {
        for (let item of this.popupPickerData[0]) {
          if (item.value.toString() === val[0]) {
            this.instorage = item
            this.instorageName = item.name
            break
          }
        }
        for (let item of this.instorageList) {
          if (item.id.toString() === val[0]) {
            this.instorageFull = item
            break
          }
        }
      }
      this.showPopupPicker = false
      this.emit()
    },
    hidePopupPicker () {
      this.showPopupPicker = false
    },
    emit () {
      let selectData = {
        project: this.project,
        control: this.control,
        need: this.need,
        supplier: this.supplier,
        contract: this.contract,
        contractFull: this.contractFull,
        instorage: this.instorage,
        instorageFull: this.instorageFull
      }
      this.$emit('selectData', selectData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
