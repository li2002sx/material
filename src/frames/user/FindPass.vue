<template>
  <section>
    <div v-title data-title="找回密码"></div>
    <!-- form -->
    <div class="findpwbox">
      <dl>
        <dd><label>旧密码</label><input type="password" class="input" placeholder="输入原密码" v-model="oldPassword" /></dd>
        <dd><label>新密码</label><input type="password" class="input" placeholder="输入新密码" v-model="password" /></dd>
        <dd><label>确认密码</label><input type="password" class="input" placeholder="再次输入新密码" v-model="password2" /></dd>
      </dl>
      <p class="tiper">注：密码必须为6~12位，包括数字、字母</p>
    </div>
    <div class="mybtnbox">
      <button class="btnblue" @click="saveData">保存</button>
    </div>
    <!-- form end -->
  </section>
</template>

<script>
import { cookie } from 'vux'
import headerTop from '../../components/Header.vue'
export default {
  components: {
    cookie,
    headerTop
  },
  data () {
    return {
      oldPassword: '',
      password: '',
      password2: ''
    }
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    saveData: function () {
      if (this.oldPassword.length === 0) {
        this.toastShow('text', '请输入原始密码')
        return
      }
      if (this.password.length === 0) {
        this.toastShow('text', '请输入新密码')
        return
      }
      if (this.password2.length === 0) {
        this.toastShow('text', '请确认新密码')
        return
      }
      if (this.password !== this.password2) {
        this.toastShow('text', '2次输入的密码不一致')
        return
      }
      let param = {
        oldPassword: this.oldPassword,
        newPassword: this.password
      }
      this.post('appData/app/changePwd', param, function (result) {
        if (result.status === '1') {
          this.toastShow('success', '修改成功')
          this.toUrl('/work')
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    }
  }
}
</script>
