<template>
  <section>
    <div v-title data-title="新增主材出库单"></div>
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
              <select-supplier type='instorage' :project="project" :need="need" :supplier="supplier" :contract="contract" :relaCompactNo="contractFull.relaCompactno"  :instorage="instorage" @selectData="selectContractData"></select-supplier>
              <select-date title="出库日期" :date="date" @selectData="selectInDate"></select-date>
              <!-- <select-dict title="付款方式" type="pay_mode" :infoName="payMode.name"  @selectData="selectPayMode"></select-dict> -->
              <!-- <select-date title="入库日期" @selectDate="getSelectDate"></select-date> -->
              <dd>
                  <label>领料单位</label>
                  <p class="txt">{{user.office.name}}</p>
              </dd>
              <dd>
                  <label>领料人</label>
                  <p class="txt">{{user.name}}</p>
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
                    <p class="txt">{{materialMap.get(item.matreialClass)}}</p>
                </dd>
                <dd>
                    <label>验收入库数量</label>
                    <p class="txt">{{item.arrivalCount}}</p>
                </dd>
                <dd>
                    <label>剩余数量</label>
                    <p class="txt">{{item.remainNum}}</p>
                </dd>
                <dd>
                    <label class="red">本次出库</label>
                    <input type="text" class="input" :value="item.inNum" @blur="changeInNum($event,index)" placeholder="请填写本次验收数量" />
                </dd>
                <dd>
                    <label>库存数量</label>
                    <p class="txt">{{item.inventoryCount}}</p>
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
                    <p class="txt">{{item.priceTax}}</p>
                </dd>
                <dd>
                    <label>含税金额</label>
                    <p class="txt">{{item.amtIntax}}</p>
                </dd>
                <dd>
                    <label>税率</label>
                    <p class="txt">{{item.taxRate}}%</p>
                </dd>
                <dd>
                    <label>税额</label>
                    <p class="txt">{{item.amtTax}}</p>
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
                      <th>出库数量</th>
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
          <select-pic :images="images" @selectData="selectPicData"></select-pic>
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
// import bridge from './vue-temp/vue-editor-bridge';

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
      billId: this.$route.params.billId || '',
      procId: this.$route.params.procId || '',
      billNo: '',
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
      instorage: {},
      instorageFull: {},
      payMode: {},
      remark: '',
      materialMap: new Map(),
      statusMap: new Map(),
      totalInNum: 0,
      totalInAmount: 0,
      totalAmtTax: 0,
      images: [],
      materialClass: '01',
      user: {},
      inMaterialMap: new Map()
    }
  },
  created () {
    this.materialMap = this.getDict('materialClass')
    this.statusMap = this.getDict('status')
    this.user = this.getFieldByUseInfo().user
    this.getCompany()
    this.getDetail()
  },
  filters: {
  },
  computed: {},
  mounted () {
  },
  methods: {
    getDetail () {
      if (this.billId.length > 0) {
        var param = {
          id: this.billId
        }
        let requestUrl = 'appData/app/OutBill'
        let that = this
        this.get(requestUrl, param, function (result) {
          if (result.status === '1') {
            let data = result.map.checkBill
            that.billNo = data.inNo
            that.checkDate = new Date(data.checkDate)
            that.inDate = new Date(data.inDate)
            that.project = {
              value: data.project.id,
              name: data.project.projectName
            }
            that.control = {
              value: data.gcontrol.id,
              name: data.gcontrol.planNo
            }
            that.need = {
              value: data.needPlan.id,
              name: data.needPlan.nplanNo
            }
            that.supplier = {
              value: data.supplier.id,
              name: data.supplier.venderName
            }
            that.contract = {
              value: data.compact.id,
              name: data.compact.compactNo
            }
            that.contractFull = data.compact
            that.contractFull.relaCompactno = data.releCompactno
            that.payMode = {
              value: data.payMode,
              name: that.getDict('payMode').get(data.payMode)
            }
            that.remark = data.remarks
            if (data.attachList !== undefined) {
              for (let item of data.attachList) {
                let imageUrl = global.picUrl + item.filePath + '/' + item.id + '.' + item.fileSuffix
                that.getBase64(imageUrl)
                  .then(function (base64) {
                    that.images.push(base64)
                  }, function (err) {
                    console.log(err)
                  })
              }
            }
            if (data.inMaterialList !== undefined) {
              data.inMaterialList.forEach(function (info) {
                that.inMaterialMap.set(info.material.id, info)
              })
            }
          } else {
            that.toastShow('text', result.message)
          }
        })
      }
    },
    getCompany () {
      let requestUrl = 'appData/app/getTreeData'
      let that = this
      this.get(requestUrl, null, function (result) {
        if (result.status === '1') {
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    selectContractData: function (data) {
      if (data != null) {
        this.project = data.project
        this.control = data.control
        this.need = data.need
        this.supplier = data.supplier
        this.contract = data.contract
        this.contractFull = data.contractFull
        this.instorage = data.instorage
        this.instorageFull = data.instorageFull
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
      if (inNum > item.remainNum) {
        this.toastShow('text', '出库最大数量不能超过剩余数量:' + item.remainNum)
        return
      }
      item.inNum = inNum
      this.$set(this.compactMaterialFull.list, index, item)
      // for (let i = 0; i < this.compactMaterialFull.list.length; i++) {
      //   if (i === index) {
      //     this.compactMaterialFull.list[i] = item
      //     break
      //   }
      // }
    },
    stepTo (index) {
      if (this.project.value === undefined) {
        this.toastShow('text', '请选择一个项目')
        return
      }
      // if (this.control.value === undefined) {
      //   this.toastShow('text', '请选择一个总控计划')
      //   return
      // }
      if (this.need.value === undefined) {
        this.toastShow('text', '请选择一个需用计划')
        return
      }
      if (this.instorage.value === undefined) {
        this.toastShow('text', '请选择一个验收单')
        return
      }
      // if (this.contract.value === undefined) {
      //   this.toastShow('text', '请选择一个合同')
      //   return
      // }
      this.step += index
      if (this.step === 2) {
        if (index > 0) {
          this.getContractMaterials()
        }
      } else if (this.step === 3) {
        if (this.compactMaterialFull.list.length === 0) {
          this.toastShow('text', '没有可以验收的材料，请核对合同是否正确')
        } else {
          let that = this
          that.totalInNum = 0
          that.totalInAmount = 0
          that.totalAmtTax = 0
          this.compactMaterialFull.list.forEach(function (info) {
            let inNum = parseInt(info.inNum) || 0
            that.totalInNum += inNum
            that.totalInAmount += info.priceExtax * inNum
            that.totalAmtTax += (info.priceTax - info.priceExtax) * inNum
          })
          if (that.totalInNum === 0) {
            that.toastShow('text', '您还没有出库材料')
          }
        }
      }
    },
    getContractMaterials () {
      var param = {
        materialIn: {
          // id: '68b070874cd44eb99b41808c678f90eb'
          id: this.instorage.value
        }
      }
      let requestUrl = 'appData/app/getInMaterialList'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.compactMaterialFull = result.map
          that.compactMaterialFull.list.forEach(function (info) {
            let item = that.inMaterialMap.get(info.material.id)
            if (item !== undefined) {
              info.inNum = item.arrivalCount
            }
          })
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
      if (this.totalInNum === 0) {
        this.toastShow('text', '出库库总数量不能为0')
        return
      }

      if (this.payMode === undefined) {
        this.toastShow('text', '请选择一个结算方式')
        return
      }
      var inMaterialList = []
      var errArr = []
      let that = this
      this.compactMaterialFull.list.forEach(function (info) {
        let item = {
          material: info.material,
          inventoryCount: info.arrivalCount,
          outCount: info.inNum,
          priceExtax: info.priceExtax,
          amtExtax: info.priceExtax * info.inNum,
          taxRate: info.taxRate,
          priceTax: info.priceTax,
          amtIntax: info.priceTax * info.inNum,
          amtTax: (info.priceTax - info.priceExtax) * info.inNum,
          matreialClass: that.materialClass
        }
        inMaterialList.push(item)
        if (info.inNum > info.remainNum) {
          errArr.push(this.stringFormat('{0}的需用剩余数为{1},你录入的值为{2}', info.material.materialName, info.remainNum, info.inNum))
        }
      })

      if (errArr.length === 0) {
        var param = {
          // gcontrol: {
          //   id: that.instorageFull.gcontrol.id
          // },
          materialIn: {
            id: that.instorageFull.id
          },
          project: {
            id: that.project.value
          },
          outDate: that.dateToString(that.date, 'yyyy-MM-dd hh:mm:ss'),
          receiveOrg: {
            // id: '011201'
            id: that.getFieldByUseInfo().user.office.id
          },
          receivePerson: {
            id: that.getFieldByUseInfo().userInfo.userId
          },
          materialClass: that.materialClass,
          remarks: that.remark,
          amt: that.totalInAmount,
          amtTax: that.totalAmtTax,
          outMaterialList: inMaterialList,
          attachPics: [],
          businAttachPics: that.images
        }

        if (that.billId.length > 0) {
          param.id = that.billId
        }
        if (that.procId.length > 0 && that.procId !== '0') {
          param.procInsId = that.procId
        }

        let requestUrl = 'appData/app/newOutBill'
        that.post(requestUrl, param, function (result) {
          if (result.status === '1') {
            that.toastShow('success', '提交出库成功')
            that.toUrl('/out')
          } else {
            that.toastShow('text', result.message)
          }
        })
      } else {
        this.toastShow('text', errArr.join('\n'))
      }
    }
  }
}
</script>

