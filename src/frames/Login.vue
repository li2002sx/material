<template>
    <section>
        <div class="loginbg"></div>
        <div class="loginbox">
            <dl>
                <dd class="account">
                    <input type="text" placeholder="请输入帐号" v-model="account"/>
                </dd>
                <dd class="password">
                    <input type="password" placeholder="请输入密码" v-model="password"/>
                </dd>
                <dt class="layout">
                <p class="td autologin">
                    <!--<i></i>--><i :class="{on:isRemember}" @click="remember"></i>自动登录</p>
                <a class="td tr">忘记密码？</a>
                </dt>
            </dl>
            <p class="btnbox">
                <button class="btnblue" @click="login">登 录</button>
            </p>
        </div>
        <p class="copyright">东方劳务装饰管理公司 @2016</p>
    </section>
</template>

<script>
  //  import {Toast} from 'mint-ui'
  import {cookie} from 'vux'
  export default {
    components: {
//      Toast
      cookie
    },
    data () {
      return {
        isRemember: true,
        userInfoStorage: 'user-info-storage', // 缓存名称
        account: '',
        password: ''
      }
    },
    created () {
//      cookie.set('JSESSIONID', '477037B5C9FE4BBABFE169A56CB0787F', {
//        path: '/',
//        expires: 1
//      })
//      cookie.set('DWRSESSIONID', 'QzOnBNuWOT85VMAkbKXxV3qz9Pl', {
//        path: '/',
//        expires: 1
//      })
    },
    computed: {},
    mounted: function () {
      if (this.isRemember) {
        this.autoLogin()
      }
    },
    methods: {
      autoLogin: function () {
        let loginStorage = this.getStore(this.userInfoStorage)
        if (loginStorage !== null) {
          let param = JSON.parse(loginStorage)
          this.account = param.userno
          this.password = param.password
          this.login()
        }
      },
      remember: function () {
        this.isRemember = !this.isRemember
      },
      login: function () {
        let param = {
          userno: this.account.trim(),
          password: this.password.trim()
        }
//        Toast({
//          message: '账号不能为空账号',
//          position: 'middle',
//          duration: 500000
//        })
        if (param.userno.length === 0) {
          this.toastShow('text', '账号不能为空')
          return
        }
        if (param.password.length === 0) {
          this.toastShow('text', '密码不能为空')
          return
        }
        this.post('/LaborManage/login/login.htm', param, function (result) {
          if (result.flag === 'success') {
//            this.toastShow('success', '登陆成功')
            // 记录用户名和密码的缓存
            this.setStore(this.userInfoStorage, JSON.stringify(param))
            this.toUrl('/index')
          } else {
            this.toastShow('text', result.msg)
          }
        }.bind(this))
      }
    }
  }
</script>

<style>
    @import "../less/login.css";
</style>
