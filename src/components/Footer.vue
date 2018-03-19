<template>
  <section>
    <!--menu  -->
    <dl class="menu">
        <dd :class="{on:tab==0}" @click="toUrl('/index')">
            <p>
                <i class="ico-menu01"></i>
            </p>
            <p>首页</p>
        </dd>
        <dd :class="{on:tab==1}" @click="toUrl('/work')">
            <p>
                <i class="ico-menu02"></i>
            </p>
            <p>工作台</p>
        </dd>
        <!-- <dd>
            <p>
                <i class="ico-menu03"></i>
            </p>
            <p>通讯录</p>
        </dd> -->
        <dd :class="{on:tab==2}" @click="toUrl('/user')">
            <p>
                <i class="ico-menu04"></i>
            </p>
            <p>我的</p>
        </dd>
    </dl>
    <!-- <dl class="menu">
      <dd :class="{on:tab==0}" @click="toUrl('/index')">
        <i class="ico-home"></i>
      </dd>
      <dd :class="{on:tab==1}" @click="toMy">
        <i class="ico-my"></i>
      </dd>
    </dl> -->
    <!--menu end  -->
  </section>
</template>

<script>
export default {
  props: ['tab'],
  components: {
  },
  methods: {
    toMy () {
      let userInfo = this.getStore(global.userInfo)
      if (userInfo == null || userInfo === '') {
        this.toUrl('/my/nologin')
      } else {
        this.toUrl('/my')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
