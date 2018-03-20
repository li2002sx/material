<template>
  <section>
    <div v-title data-title="新增验收单"></div>
    <!-- menu -->
    <dl class="stocktool">
        <dd @click="giveUp()">
            <i class="ico-menu01"></i>放<em style="visibility:hidden">吧</em>弃</dd>
        <dd v-show="step > 1" @click="stepTo(-1)">
            <i class="ico-menu02"></i>上一步</dd>
        <dd v-show="step < 4" @click="stepTo(1)">
            <i class="ico-menu03"></i>下一步</dd>
        <dd @click="save()" v-show="step == 4">
            <i class="ico-menu04"></i>提<em style="visibility:hidden">吧</em>交</dd>
    </dl>
    <!-- menu end -->
    <!-- header -->
    <!-- <header class="header">
        <h3>新建入库单</h3>
        <a href="#" class="goback"></a>
    </header> -->
    <!-- header end -->
    <!-- list -->
    <div class="stockin">
        <ul class="steplist">
            <li class="on">
                <span>
                    <i>1</i>
                    基本信息
                </span>
            </li>
            <li :class="[step>=2?'on':'']">
                <span>
                    <i>2</i>
                    材料明细
                </span>
            </li>
            <li :class="[step>=3?'on':'']">
                <span>
                    <i>3</i>
                    验收统计
                </span>
            </li>
            <li :class="[step>=4?'on':'']">
                <span>
                    <i>3</i>
                    附件信息
                </span>
            </li>
        </ul>
        <div v-if="step == 1">
          <dl class="stockstep1">
              <dt>单据编号（保存后自动生成）</dt>
              <select-supplier type='little' @selectData="selectContractData"></select-supplier>
              <select-date title="验收日期" @selectDate="selectInDate"></select-date>
              <select-dict title="付款方式" type="pay_mode" @selectDate="selectPayMode"></select-dict>
              <!-- <select-date title="入库日期" @selectDate="getSelectDate"></select-date> -->
              <dd>
                  <label>增值税税率</label>
                  <input type="text" class="input" v-model="taxRate" />
                  <!-- <i class="ico-sel"></i> -->
              </dd>
              <!-- <dd>
                  <label>总控计划</label>
                  <p class="txt"></p> -->
                  <!-- <i class="ico-sel"></i> -->
              <!-- </dd> -->
              <!-- <select-deduct></select-deduct> -->
              <!-- <select-warehouse></select-warehouse> -->
              <!-- <select-handler></select-handler> -->
              <dd>
                  <label>备注</label>
                  <textarea rows="3" placeholder="输入备注信息" v-model="remark"></textarea>
              </dd>
          </dl>
        </div>
        <div v-else-if="step == 2">
          <div class="materiallist" v-for="(item, index) in compactMaterialFull.list">
            <h4 class="stocktit" @click="showMaterial($event)"><strong class="fr">{{item.inNum}}</strong>
              {{index + 1}}.{{item.material.materialName}}
              <!-- 需用剩余:{{item.need.leftNeednum}} 本次入库:{{item.inNum}} -->
            </h4>
            <dl class="stockstep1 hide">
                <dd>
                    <label>材料类别</label>
                    <p class="txt">{{materialMap.get(item.matrialClass)}}</p>
                </dd>
                <dd>
                    <label>数量</label>
                    <p class="txt">{{item.quantity}}</p>
                </dd>
                <dd>
                    <label>无税单价</label>
                    <p class="txt">{{item.priceExtax}}</p>
                </dd>
                <dd>
                    <label>无税金额</label>
                    <p class="txt">{{item.amtExtax}}</p>
                </dd>
                <dd>
                    <label>含税单价</label>
                    <p class="txt">{{item.priceIntax}}</p>
                </dd>
                <dd>
                    <label>含税金额</label>
                    <p class="txt">{{item.amtIntax}}</p>
                </dd>
                <dd>
                    <label>成本单价</label>
                    <p class="txt">{{item.costUnivalent}}</p>
                </dd>
                <dd>
                    <label>剩余数量</label>
                    <p class="txt">{{item.leftCptnum}}</p>
                </dd>
                <dd>
                    <label>剩余金额</label>
                    <p class="txt">{{item.leftCptamt}}</p>
                </dd>
                <dd>
                    <label>本次验收</label>
                    <input type="text" class="input" @blur="changeInNum($event,index)" placeholder="请填写本次验收数量" />
                </dd>
                <dd>
                    <label>备注</label>
                    <textarea rows="3" placeholder="请填写备注" v-model="item.inRemark"></textarea>
                </dd>
            </dl>
          </div>
        </div>
        <div v-else-if="step == 3">
          <div class="tablelist">
              <table>
                  <tr>
                      <th>编号</th>
                      <th>材料名称</th>
                      <th>验收数量</th>
                      <th>备注</th>
                  </tr>
                  <tr v-for="(item, index) in compactMaterialFull.list">
                      <td>{{index + 1}}</td>
                      <td>{{item.material.materialName}}</td>
                      <td>{{item.inNum}}</td>
                      <td>{{item.inRemark}}</td>
                  </tr>
                  <tr>
                      <td colspan="2">合计总数</td>
                      <td colspan="2">{{totalInNum}}</td>
                  </tr>
                  <tr>
                      <td colspan="2">合计金额</td>
                      <td colspan="2">{{totalInAmount}}</td>
                  </tr>
              </table>
          </div>
        </div>
        <div v-else-if="step == 4">
          <select-pic @selectData="selectPicData"></select-pic>
        </div>
    </div>
    <!-- list end -->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
import selectDate from '../../components/SelectDate.vue'
import selectSupplier from '../../components/SelectSupplier'
import selectPic from '../../components/SelectPic'
import selectDict from '../../components/SelectDict'
// import selectDeduct from '../../components/SelectDeduct'
// import selectWarehouse from '../../components/SelectWarehouse'
import $ from 'jquery'

export default {
  directives: {
    TransferDom
  },
  components: {
    selectDate,
    selectSupplier,
    selectPic,
    selectDict
    // selectDeduct,
    // selectWarehouse
  },
  data () {
    return {
      step: 1,
      date: new Date(),
      project: {},
      control: {},
      need: {},
      supplier: {},
      contract: {},
      contractFull: {},
      compactMaterial: {},
      needMaterial: {},
      compactMaterialFull: {},
      payMode: {},
      taxRate: '0.0',
      remark: '',
      materialMap: new Map(),
      statusMap: new Map(),
      totalInNum: 0,
      totalInAmount: 0,
      totalTaxInAmount: 0,
      images: []
    }
  },
  created () {
    this.materialMap = this.getDict('materialClass')
    this.statusMap = this.getDict('status')
  },
  filters: {
  },
  computed: {},
  mounted () {
  },
  methods: {
    selectContractData: function (data) {
      if (data != null) {
        this.project = data.project
        this.control = data.control
        this.need = data.need
        this.supplier = data.supplier
        this.contract = data.contract
        this.contractFull = data.contractFull
      }
    },
    selectInDate: function (data) {
      this.date = data.value
    },
    selectPayMode (data) {
      if (data !== null) {
        this.payMode = data || {}
      }
    },
    selectPicData (data) {
      if (data !== null) {
        this.images = data || []
      }
    },
    giveUp () {
      let that = this
      this.$vux.confirm.show({
        title: '提示',
        content: '确定要放弃编辑吗？',
        onConfirm () {
          that.toUrl('/work')
        }
      })
    },
    changeInNum (event, index) {
      let targe = event.target
      let item = this.compactMaterialFull.list[index]
      let inNum = parseInt($(targe).val()) || 0
      if (inNum > item.need.leftNeednum) {
        this.toastShow('text', '入库最大数量不能超过剩余数量:' + item.need.leftNeednum)
        return
      }
      item.inNum = inNum
      this.$set(this.compactMaterialFull.list, index, item)
    },
    stepTo (index) {
      // if (this.project.value === undefined) {
      //   this.toastShow('text', '请选择一个项目')
      //   return
      // }
      // if (this.control.value === undefined) {
      //   this.toastShow('text', '请选择一个总控计划')
      //   return
      // }
      // if (this.need.value === undefined) {
      //   this.toastShow('text', '请选择一个需用计划')
      //   return
      // }
      // if (this.supplier.value === undefined) {
      //   this.toastShow('text', '请选择一个供应商')
      //   return
      // }
      // if (this.contract.value === undefined) {
      //   this.toastShow('text', '请选择一个合同')
      //   return
      // }
      this.step += index
      if (this.step === 2) {
        this.getContractMaterials()
        // this.getNeedMaterials()
      } else if (this.step === 3) {
        let that = this
        this.compactMaterial.list.forEach(function (info) {
          let inNum = parseInt(info.inNum) || 0
          that.totalInNum += inNum
          that.totalInAmount += info.priceExtax * inNum
          that.totalTaxInAmount += info.priceTax * inNum
        })
      }
    },
    getContractMaterials () {
      var param = {
        compact: {
          // id: this.contract.value
          id: 'a3a9ca9fc95842ccb34b54340eed5013'
        }
      }
      let requestUrl = 'appData/app/getCompactMaterial'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.compactMaterial = result.map
          that.compactMaterial.list.forEach(function (info) {
            info.need = {}
          })
          that.getNeedMaterials()
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    getNeedMaterials () {
      var param = {
        plan: {
          // id: this.need.value
          id: '6001bfe9a98d4d02ba011477fef38009'
        }
      }
      let requestUrl = 'appData/app/getNeedplanMaterial'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {
          // that.needMaterial = result.map
          let map = new Map()
          result.map.list.forEach(function (info) {
            map.set(info.material.id, info)
          })
          that.compactMaterial.list.forEach(function (info) {
            info.need = map.get(info.material.id)
          })
          that.compactMaterialFull = that.compactMaterial
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    showMaterial (event) {
      let target = event.target
      $(target).next('dl').slideToggle('100')
    },
    save () {
      var halfMaterialList = []
      this.compactMaterialFull.list.forEach(function (info) {
        let item = {
          material: info.material,
          arrivalCount: info.inNum,
          priceExtax: info.priceExtax,
          amtExtax: info.priceExtax * info.inNum,
          taxRate: info.taxRate,
          priceTax: info.priceIntax,
          amtIntax: info.priceIntax * info.inNum,
          amtTax: (info.priceIntax - info.priceExtax) * info.inNum,
          matreialClass: '01',
          compact: {
            id: this.contract.value
          }
        }
        halfMaterialList.push(item)
      })

      var param = {
        checkType: '00',
        checkDate: this.date,
        project: {
          id: this.project.value
        },
        supplier: {
          id: this.supplier.value
        },
        compact: {
          id: this.contract.value
        },
        materialClass: '02',
        gcontrol: {
          id: this.contractFull.gcontrol.id
        },
        needPlan: {
          id: this.need.value
        },
        taxRate: this.taxRate,
        remarks: this.remark,
        nowAmount: this.totalInAmount,
        nowTaxAmount: this.totalTaxInAmount,
        checkPerson: {
          id: this.getFieldByUseInfo('userId')
        },
        halfMaterialList: halfMaterialList,
        attachPics: this.images
      }

      let requestUrl = 'appData/app/newCheckHalf'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {

        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>

