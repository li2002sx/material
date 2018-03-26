<template>
  <section>
    <div v-title data-title="首页"></div>
    <!-- <head-top title="首页"></head-top> -->
    <footer-buttom tab="0"></footer-buttom>
    <div class="bgwhite">
        <!-- search -->
        <div class="indexsearch">
            <div class="searchmod cur">
                <input type="text" />
                <span>
                    <i class="ico-search"></i>
                    <em>搜索</em>
                </span>
            </div>
        </div>
        <!-- search end -->
        <!-- list -->
        <dl class="indexnotice">
            <dd @click="toUrl('/work/todo')">
                <i class="ico-file">
                  <em v-show="todoCount > 0"></em>
                </i>
                <b class="time"></b>
                <h3>待办文件</h3>
                <p v-if="todoCount > 0">您有新的待办</p>
                <p v-else>您的待办文件</p>
            </dd>
            <dd @click="toUrl('/work/apply')">
                <i class="ico-task">
                </i>
                <b class="time"></b>
                <h3>我的申请</h3>
                <p>我申请过文件</p>
            </dd>
            <dd @click="toUrl('/in')">
                <i class="ico-file">
                </i>
                <b class="time"></b>
                <h3>我要验收</h3>
                <p>材料验收入库</p>
            </dd>
            <dd @click="toUrl('/out')">
                <i class="ico-file">
                </i>
                <b class="time"></b>
                <h3>材料出库</h3>
                <p>按需分配使用</p>
            </dd>
            <dd @click="tip()">
                <i class="ico-task">
                </i>
                <b class="time"></b>
                <h3>统计分析</h3>
                <p>成本统计，付款统计</p>
            </dd>
        </dl>
        <!-- list end -->
    </div>
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux'
import headTop from '../components/Header.vue'
import footerButtom from '../components/Footer.vue'
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
      todoCount: 0
    }
  },
  created () {
    this.getTodos()
  },
  filters: {
  },
  computed: {},
  mounted () {

  },
  methods: {
    getTodos () {
      let requestUrl = 'appData/app/todoData'
      let that = this
      this.get(requestUrl, null, function (result) {
        if (result.status === '1') {
          that.todoCount = result.map.todoDataCount
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    tip () {
      this.toastShow('text', '功能开发中，敬请期待')
    }
  }
}
</script>

