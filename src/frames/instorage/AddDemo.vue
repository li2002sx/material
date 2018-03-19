<template>
  <section>
    <div v-title data-title="中建东方装饰有限公司"></div>
    <!-- <head-top title="工作台"></head-top> -->
    <!-- <footer-buttom tab="1"></footer-buttom> -->
    <!-- menu -->
    <dl class="stocktool">
        <dd>
            <i class="ico-menu01"></i>放弃</dd>
        <dd>
            <i class="ico-menu02"></i>保存</dd>
        <dd>
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
            <li class="on">
                <span>
                    <i>2</i>
                    材料明细
                </span>
            </li>
            <li>
                <span>
                    <i>3</i>
                    验收统计
                </span>
            </li>
            <li>
                <span>
                    <i>4</i>
                    附件信息
                </span>
            </li>
        </ul>
        <h4 class="stocktit">1.CLZLJH-201612-0004 螺纹钢</h4>
        <dl class="stockstep1">
            <dd>
                <label>规格</label>
                <input type="text" value="10000" class="input" />
            </dd>
            <dd>
                <label>型号</label>
                <input type="text" value="CDFA8909" class="input" />
            </dd>
            <dd>
                <label>材质</label>
                <input type="text" value="不锈钢" class="input" />
            </dd>
            <dd>
                <label>单位</label>
                <input type="text" value="8283748343" class="input" />
            </dd>
            <dd>
                <label>部位全名称</label>
                <select class="select">
                    <option></option>
                </select>
                <i class="ico-sel"></i>
            </dd>
            <dd>
                <label>总控计划编号</label>
                <input type="text" class="input" />
            </dd>
        </dl>
        <h4 class="stocktit">1.CLZLJH-201612-0004 螺纹钢
            <a href="#">上传附件</a>
            <a href="#">删除附件</a>
        </h4>
        <dl class="stockstep1">
            <dd>
                <label>规格</label>
                <input type="text" value="10000" class="input" />
            </dd>
            <dd>
                <label>型号</label>
                <input type="text" value="CDFA8909" class="input" />
            </dd>
            <dd>
                <label>材质</label>
                <input type="text" value="不锈钢" class="input" />
            </dd>
            <dd>
                <label>单位</label>
                <input type="text" value="8283748343" class="input" />
            </dd>
            <dd>
                <label>部位全名称</label>
                <select class="select">
                    <option></option>
                </select>
                <i class="ico-sel"></i>
            </dd>
            <dd>
                <label>总控计划编号</label>
                <input type="text" class="input" />
            </dd>
        </dl>
        <dl class="stockstep1">
            <dt>单据编号（保存后自动生成）</dt>
            <dd>
                <label>验收日期</label>
                <input type="text" value="2017-09-10" class="input" />
                <i class="ico-date"></i>
            </dd>
            <dd>
                <label>入库日期</label>
                <input type="text" value="2017-09-10" class="input" />
                <i class="ico-date"></i>
            </dd>
            <dd>
                <label>供应商</label>
                <input type="text" class="input" />
            </dd>
            <dd>
                <label>合同编号</label>
                <p class="txt">88fd7-kladk-fjlda-3i43</p>
            </dd>
            <dd>
                <label>经办人</label>
                <select class="select">
                    <option>张三</option>
                </select>
                <i class="ico-sel"></i>
            </dd>
            <dd>
                <label>备注</label>
                <textarea rows="3">备注</textarea>
            </dd>
            <dd>
                <label>图片</label>
                <ul class="uploadimg">
                    <li>
                        <img src="http://img5.mtime.cn/mg/2018/02/05/095205.81892970_200X200X4.jpg" />
                    </li>
                    <li>
                        <img src="http://img5.mtime.cn/mg/2018/02/05/095205.81892970_200X200X4.jpg" />
                    </li>
                    <li>
                        <img src="http://img5.mtime.cn/mg/2018/02/05/095205.81892970_200X200X4.jpg" />
                    </li>
                    <li class="upfile">
                        <input type="file" />
                    </li>
                </ul>

            </dd>
            <dd>
                <div class="btnbox">
                    <button class="btnblue">保存</button>
                </div>
            </dd>
        </dl>
    </div>
    <!-- list end -->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
import headTop from '../../components/Header.vue'
import footerButtom from '../../components/Footer.vue'
export default {
  directives: {
    TransferDom
  },
  components: {
    headTop,
    footerButtom
  },
  data () {
    return {
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

  }
}
</script>

