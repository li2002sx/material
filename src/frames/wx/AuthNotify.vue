<template>
  <section>

  </section>
</template>

<script>
import { cookie, querystring } from 'vux'
export default {
  components: {
    cookie,
    querystring
  },
  data () {
    return {
    }
  },
  created () {
    this.getWxAuth()
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    getWxAuth () {
      let returnArgs = location.href.split('?')[1].split('#')[0]
      let param = querystring.parse(returnArgs)
      this.get('/rest/user/wxauth', { code: param.code }, function (result) {
        if (result.status === 1) {
          let wxAuthInfo = JSON.parse(result.wxAuthInfo)
          let openId = wxAuthInfo.openid || ''
          if (openId.length > 0) {
            this.setStore('openId', openId)
            location.href = '#/index'
          }
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    }
  }
}
</script>

<style>

</style>
