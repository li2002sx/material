<template>
  <section>
    <div v-title data-title="中建东方装饰有限公司"></div>
    <div class="copyright">中建东方装饰有限公司</div>
    <div class="loginbox">
      <div class="ico-loginhead"></div>
      <dl class="">
        <dd>
          <label class="ico-loginuser"></label><input type="text" class="inputxt" placeholder="请输入账号" v-model="userId" /></dd>
        <dd>
          <label class="ico-loginpaw"></label><input type="password" class="inputxt" placeholder="请输入密码" v-model="password" /></dd>
        <dt class="layout">
          <span class="td">
            <i :class="{on:isRemember}" @click="remember"></i>自动登录</span>
          <!-- <a href="#" class="td tr">忘记密码？</a> -->
        </dt>
      </dl>
      <div class="btnbox">
        <button class="btnblue" @click="login">登录</button>
      </div>
    </div>
  </section>
</template>

<script>
import { cookie } from 'vux'

export default {
  components: {
    cookie
  },
  data () {
    return {
      isRemember: true,
      userId: 'admin',
      password: 'admin'
    }
  },
  created () {

  },
  computed: {},
  mounted: function () {
  },
  methods: {
    remember: function () {
      this.isRemember = !this.isRemember
    },
    login: function () {
      // this.toUrl('/index')
      let param = {
        userId: this.userId.trim(),
        password: this.password.trim()
      }
      if (param.userId.length === 0) {
        this.toastShow('text', '账号不能为空')
        return
      }
      if (param.password.length === 0) {
        this.toastShow('text', '密码不能为空')
        return
      }
      let requestUrl = 'appData/app/login?userName=' + param.userId + '&password=' + param.password
      this.get(requestUrl, null, function (result) {
        if (result.status === '1') {
          // let user = result
          let userInfo = {
            userId: result.map.userInfo.userId,
            token: result.map.userInfo.token,
            userName: result.userName
          }
          this.setStore(global.userInfo, JSON.stringify(userInfo))
          this.toastShow('success', '登陆成功')
          this.loginToUrl()
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    }
  }
}
</script>
