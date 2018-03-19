<template>
  <section>
    <div v-title data-title="信息反馈"></div>
    <!-- form -->
    <div class="feedbackbox">
      <dl>
        <dd><input type="text" class="input" placeholder="输入标题" v-model="title" /></dd>
        <dd>
          <textarea placeholder="输入内容" v-model="content"></textarea>
        </dd>
        <dt>注：最多可以输入5000字</dt>
      </dl>

    </div>
    <div class="mybtnbox">
      <button class="btnblue" @click="save">提交</button>
    </div>
    <!-- form end -->
  </section>
</template>

<script>
import footerButtom from '../../components/Footer.vue'
export default {
  components: {
    footerButtom
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  created () {

  },
  computed: {},
  mounted: function () {
  },
  methods: {
    save () {
      var param = {
        title: this.title,
        content: this.content
      }
      if (this.title.length === 0) {
        this.toastShow('text', '请输入标题')
        return
      }
      if (this.content.length === 0) {
        this.toastShow('text', '请输入内容')
        return
      }
      this.post('/rest/feedback/save', param, function (result) {
        if (result.status === 1) {
          this.toastShow('success', '提交成功')
          this.toUrl('/user')
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
