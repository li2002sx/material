<template>
  <section>
    <div v-title data-title="我的工作台"></div>
    <!-- <head-top title="工作台"></head-top> -->
    <footer-buttom tab="1"></footer-buttom>
    <div class="plathead">
        <img src="/static/images/work-pic.jpg" />
    </div>
    <!-- list -->
    <div class="platlist">
        <!-- <h4></h4> -->
        <dl>
            <dd @click="toUrl('/work/todo')">
                <div class="plat08"></div>
                <p>我的待办</p>
            </dd>
            <dd @click="toUrl('/work/apply')">
                <div class="plat01"></div>
                <p>我的申请</p>
            </dd>
            <dd @click="toUrl('/in')">
                <div class="plat02"></div>
                <p>验收管理</p>
            </dd>
            <dd @click="toUrl('/out')">
                <div class="plat03"></div>
                <p>出库管理</p>
            </dd>
            <dd @click="tip()">
                <div class="plat06"></div>
                <p>变更签证</p>
            </dd>
            <dd @click="toUrl('/notice')">
                <!-- <i class="notify">10+</i> -->
                <div class="plat05"></div>
                <p>成本管理</p>
            </dd>
            <dd @click="tip()">
                <div class="plat09"></div>
                <p>成本统计</p>
            </dd>
            <dd @click="tip()">
                <div class="plat10"></div>
                <p>付款统计</p>
            </dd>
            <dd @click="tip()">
                <div class="plat07"></div>
                <p>结算单</p>
            </dd>
            <dd @click="tip()">
                <div class="plat04"></div>
                <p>超耗管理</p>
            </dd>
            <dd @click="tip()">
                <div class="plat11"></div>
                <p>退货单</p>
            </dd>
            <dd @click="tip()">
                <div class="plat12"></div>
                <p>退货统计</p>
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
    tip () {
      this.toastShow('text', '功能开发中，敬请期待')
    }
  }
}
</script>

