<template>
  <section>
    <!--menu  -->
    <dl class="menu">
      <dd :class="{on:tab==0}" @click="toUrl('/index')">
        <i class="ico-home"></i>
      </dd>
      <dd :class="{on:tab==1}" @click="toMy">
        <i class="ico-my"></i>
      </dd>
    </dl>
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
      let token = this.getStore('token')
      if (token == null || token === '') {
        this.$router.push('/my/nologin')
      } else {
        this.$router.push('/my')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
