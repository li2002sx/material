<template>
  <section>
    <div v-title data-title="验收单"></div>
    <dl class="stocktool">
        <dd v-if="index==0" @click="toUrl('/in/add')">新增主材料验收单</dd>
        <dd v-else-if="index==1" @click="toUrl('/in/addhalf')">新增半成品中间验收单</dd>
        <dd v-else-if="index==2" @click="toUrl('/in/addhalf')">新增半成品最终验收单</dd>
        <dd v-else-if="index==3" @click="toUrl('/in/addlittle')">新增零星材料验收单</dd>
    </dl>
    <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
      </tab-item>
    </tab>
    <!--list-->
    <div class="stockin">
      <dl class="todolist" @click="toUrl('/work/detail')">
          <dd>
              <div class="title">
                  <i>1</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">验收单编号：010101-CLYS-201802--0005</p>
                  <p class="time">申请时间：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>供应商：甲级供应商</span>
              </div>
          </dd>
      </dl>
      <dl class="todolist" @click="toUrl('/work/detail')">
          <dd>
              <div class="title">
                  <i>2</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">验收单编号：010101-CLYS-201802--0005</p>
                  <p class="time">申请时间：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>供应商：甲级供应商</span>
              </div>
          </dd>
      </dl>
      <dl class="todolist" @click="toUrl('/work/detail')">
          <dd>
              <div class="title">
                  <i>3</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">验收单编号：010101-CLYS-201802--0005</p>
                  <p class="time">申请时间：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>供应商：甲级供应商</span>
              </div>
          </dd>
      </dl>
      <dl class="todolist" @click="toUrl('/work/detail')">
          <dd>
              <div class="title">
                  <i>4</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">验收单编号：010101-CLYS-201802--0005</p>
                  <p class="time">申请时间：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>供应商：甲级供应商</span>
              </div>
          </dd>
      </dl>
      <dl class="todolist" @click="toUrl('/work/detail')">
          <dd>
              <div class="title">
                  <i>5</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">验收单编号：010101-CLYS-201802--0005</p>
                  <p class="time">申请时间：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>供应商：甲级供应商</span>
              </div>
          </dd>
      </dl>
      <dl class="todolist" @click="toUrl('/work/detail')">
          <dd>
              <div class="title">
                  <i>6</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">验收单编号：010101-CLYS-201802--0005</p>
                  <p class="time">申请时间：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>供应商：甲级供应商</span>
              </div>
          </dd>
      </dl>
    </div>
    <!--list-->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom, Tab, TabItem } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      list2: ['主材料', '半成品(中)', '半成品(终)', '零星材料'],
      demo2: '主材料',
      index: 0
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
    audit () {
      this.$vux.confirm.prompt('', {
        title: '任务审批',
        hideOnBlur: true,
        confirmText: '同意',
        cancelText: '驳回',
        onConfirm (msg) {
          alert(1)
        },
        onCancel (msg) {
          alert(0)
        }
      })
    }
  }
}
</script>
