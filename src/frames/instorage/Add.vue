<template>
  <section>
    <div v-title data-title="新增验收单"></div>
    <!-- menu -->
    <dl class="stocktool">
        <dd @click="toUrl('/work')">
            <i class="ico-menu01"></i>放弃</dd>
        <dd @click="stepTo(-1)">
            <i class="ico-menu02"></i>上一步</dd>
        <dd @click="stepTo(1)">
            <i class="ico-menu03"></i>下一步</dd>
        <dd>
            <i class="ico-menu04"></i>提交</dd>
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
              <select-supplier @selectData="selectContractData"></select-supplier>
              <select-date title="验收日期" @selectDate="getSelectDate"></select-date>
              <select-dict title="付款方式" type="pay_mode"></select-dict>
              <!-- <select-date title="入库日期" @selectDate="getSelectDate"></select-date> -->
              <!-- <dd>
                  <label>项目</label>
                  <p class="txt"></p> -->
                  <!-- <i class="ico-sel"></i> -->
              <!-- </dd> -->
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
                  <textarea rows="3" placeholder="输入备注信息"></textarea>
              </dd>
          </dl>
        </div>
        <div v-else-if="step == 2">
            <div class="materiallist">
              <h4 class="stocktit" @click="showMaterial($event)">1.CLZLJH-201612-0004 螺纹钢</h4>
              <dl class="stockstep1 hide">
                  <dd>
                      <label>材料类别</label>
                      <p class="txt">主材料</p>
                  </dd>
                  <dd>
                      <label>生产厂家</label>
                      <input type="text" class="input" placeholder="请填写生产厂家" />
                  </dd>
                  <dd>
                      <label>交库量</label>
                      <input type="text" class="input" placeholder="请填写交库量" />
                  </dd>
                  <dd>
                      <label>无税单价</label>
                      <p class="txt">18.00</p>
                  </dd>
                  <dd>
                      <label>无税金额</label>
                      <p class="txt">1800.00</p>
                  </dd>
                  <dd>
                      <label>税率</label>
                      <p class="txt">17%</p>
                  </dd>
                  <dd>
                      <label>含税单价</label>
                      <p class="txt">20.00</p>
                  </dd>
                  <dd>
                      <label>含税金额</label>
                      <p class="txt">2000.00</p>
                  </dd>
                  <dd>
                      <label>税额</label>
                      <p class="txt">200.00</p>
                  </dd>
                  <dd>
                      <label>不可抵扣</label>
                      <p class="txt">是</p>
                  </dd>
                  <dd>
                      <label>抵扣税额</label>
                      <p class="txt">0.00</p>
                  </dd>
                  <dd>
                      <label>计成本单价</label>
                      <p class="txt">15.00</p>
                  </dd>
                  <dd>
                      <label>计成本金额</label>
                      <p class="txt">1500.00</p>
                  </dd>
                  <dd>
                      <label>备注</label>
                      <textarea rows="3" placeholder="请填写备注"></textarea>
                  </dd>
              </dl>
            </div>
            <div class="materiallist">
              <h4 class="stocktit" @click="showMaterial($event)">2.CLZLJH-201612-0004 螺纹钢</h4>
              <dl class="stockstep1 hide">
                  <dd>
                      <label>材料类别</label>
                      <p class="txt">主材料</p>
                  </dd>
                  <dd>
                      <label>生产厂家</label>
                      <p class="txt">甲级供应商</p>
                  </dd>
              </dl>
            </div>
            <div class="materiallist">
              <h4 class="stocktit" @click="showMaterial($event)">3.CLZLJH-201612-0004 螺纹钢</h4>
              <dl class="stockstep1 hide">
                  <dd>
                      <label>材料类别</label>
                      <p class="txt">主材料</p>
                  </dd>
                  <dd>
                      <label>生产厂家</label>
                      <p class="txt">甲级供应商</p>
                  </dd>
              </dl>
            </div>
            <div class="materiallist">
              <h4 class="stocktit" @click="showMaterial($event)">4.CLZLJH-201612-0004 螺纹钢</h4>
              <dl class="stockstep1 hide">
                  <dd>
                      <label>材料类别</label>
                      <p class="txt">主材料</p>
                  </dd>
                  <dd>
                      <label>生产厂家</label>
                      <p class="txt">甲级供应商</p>
                  </dd>
              </dl>
            </div>
            <div class="materiallist">
              <h4 class="stocktit" @click="showMaterial($event)">5.CLZLJH-201612-0004 螺纹钢</h4>
              <dl class="stockstep1 hide">
                  <dd>
                      <label>材料类别</label>
                      <p class="txt">主材料</p>
                  </dd>
                  <dd>
                      <label>生产厂家</label>
                      <p class="txt">甲级供应商</p>
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
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>螺纹钢</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>螺纹银</td>
                        <td>303</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>螺纹铅锡</td>
                        <td>1000</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>螺纹钢</td>
                        <td>3000</td>
                    </tr>
                    <tr>
                        <td colspan="2">总计</td>
                        <td>5000</td>
                    </tr>
                </table>
            </div>
        </div>
        <div v-else-if="step == 4">
          <dl class="imagelist">
            <dd>
                <ul class="uploadimg">
                    <li>
                        <i class="del" title="删除"></i>
                        <img src="http://img5.mtime.cn/mg/2018/02/05/095205.81892970_200X200X4.jpg" />
                    </li>
                    <li>
                        <i class="del" title="删除"></i>
                        <img src="http://img5.mtime.cn/mg/2018/02/05/095205.81892970_200X200X4.jpg" />
                    </li>
                    <li>
                        <i class="del" title="删除"></i>
                        <img src="http://img5.mtime.cn/mg/2018/02/05/095205.81892970_200X200X4.jpg" />
                    </li>
                    <li>
                        <i class="del" title="删除"></i>
                        <img src="http://img5.mtime.cn/mg/2018/02/05/095205.81892970_200X200X4.jpg" />
                    </li>
                    <li>
                        <i class="del" title="删除"></i>
                        <img src="http://img5.mtime.cn/mg/2018/02/05/095205.81892970_200X200X4.jpg" />
                    </li>
                    <li>
                        <i class="del" title="删除"></i>
                        <img src="http://img5.mtime.cn/mg/2018/02/05/095205.81892970_200X200X4.jpg" />
                    </li>
                    <li class="upfile">
                        <input type="file" />
                    </li>
                </ul>
            </dd>
          </dl>
        </div>
    </div>
    <!-- list end -->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
import selectDate from '../../components/SelectDate.vue'
import selectSupplier from '../../components/SelectSupplier'
import selectHandler from '../../components/SelectHandler'
import selectDict from '../../components/SelectDict'
import selectDeduct from '../../components/SelectDeduct'
import selectWarehouse from '../../components/SelectWarehouse'
import $ from 'jquery'

export default {
  directives: {
    TransferDom
  },
  components: {
    selectDate,
    selectSupplier,
    selectHandler,
    selectDict,
    selectDeduct,
    selectWarehouse
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
      contractFull: {}
    }
  },
  created () {
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
    getSelectDate: function (data) {
      this.date = data.value
    },
    stepTo (index) {
      if (this.project.value === undefined) {
        this.toastShow('text', '请选择一个项目')
        return
      }
      if (this.control.value === undefined) {
        this.toastShow('text', '请选择一个总控计划')
        return
      }
      if (this.need.value === undefined) {
        this.toastShow('text', '请选择一个需用计划')
        return
      }
      if (this.supplier.value === undefined) {
        this.toastShow('text', '请选择一个供应商')
        return
      }
      if (this.contract.value === undefined) {
        this.toastShow('text', '请选择一个合同')
        return
      }
      this.step += index
      if (this.step === 2) {
        this.getContractMaterials()
        this.getNeedMaterials()
      }
    },
    getContractMaterials () {
      var param = {
        compact: {
          id: this.contract.value
        }
      }
      let requestUrl = 'appData/app/getCompactMaterial'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {
          // that.data = result.map
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    getNeedMaterials () {
      var param = {
        compact: {
          id: this.need.value
        }
      }
      let requestUrl = 'appData/app/getNeedplanMaterial'
      let that = this
      this.post(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.data = result.map
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    showMaterial (event) {
      let target = event.target
      $(target).next('dl').slideToggle('normal')
    }
  }
}
</script>

