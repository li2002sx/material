<template>
  <section>
    <div v-title data-title="个人中心"></div>
    <!-- <head-top title="我的"></head-top> -->
    <footer-buttom tab="2"></footer-buttom>
    <!-- list -->
    <div class="myuserbox">
        <i></i>
        <h3>用户昵称</h3>
        <table>
            <tr>
                <td>公司：</td>
                <td>公司总部</td>
            </tr>
            <tr>
                <td>部门：</td>
                <td>技术部</td>
            </tr>
        </table>
    </div>
    <!-- userbox end -->
    <!-- list -->
    <dl class="mylist">
        <dd @click="toUrl('/user/findpass')">
            <label class="ico-mypw"></label>
            <p class="after">修改密码</p>
        </dd>
    </dl>

    <dl class="mylist">
        <dd @click="toUrl('/user/feedback')">
            <label class="ico-myfb"></label>
            <div class="layout">
                <p class="after">意见反馈</p>
            </div>
        </dd>
        <dd @click="toUrl('/user/aboutus')">
            <label class="ico-myfb"></label>
            <div class="layout">
                <p class="after">关于我们</p>
            </div>
        </dd>
    </dl>
    <div class="mybtnbox">
        <button class="btnblue">退出登录</button>
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

