<template>
  <section>
    <div v-title data-title="出库单"></div>
    <dl class="stocktool">
        <dd @click="toUrl('/out/add')">新增出库单</dd>
    </dl>
    <!--list-->
    <div class="stockin">
      <dl class="todolist" @click="toUrl('/work/detail')">
          <dd>
              <div class="title">
                  <i>1</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">出库单编号：010101-CLYS-201802--0005</p>
                  <p class="time">出库日期：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>领料单位：甲级供应商</span>
                  <span>领料人：小张</span>
              </div>
          </dd>
          <dd>
              <div class="title">
                  <i>2</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">出库单编号：010101-CLYS-201802--0005</p>
                  <p class="time">出库日期：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>领料单位：甲级供应商</span>
                  <span>领料人：小张</span>
              </div>
          </dd>
          <dd>
              <div class="title">
                  <i>3</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">出库单编号：010101-CLYS-201802--0005</p>
                  <p class="time">出库日期：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>领料单位：甲级供应商</span>
                  <span>领料人：小张</span>
              </div>
          </dd>
          <dd>
              <div class="title">
                  <i>4</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">出库单编号：010101-CLYS-201802--0005</p>
                  <p class="time">出库日期：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>领料单位：甲级供应商</span>
                  <span>领料人：小张</span>
              </div>
          </dd>
          <dd>
              <div class="title">
                  <i>5</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">出库单编号：010101-CLYS-201802--0005</p>
                  <p class="time">出库日期：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>领料单位：甲级供应商</span>
                  <span>领料人：小张</span>
              </div>
          </dd>
          <dd>
              <div class="title">
                  <i>6</i>
                  <h3>中国正大生态养生健康产业园</h3>
                  <p class="time">出库单编号：010101-CLYS-201802--0005</p>
                  <p class="time">出库日期：2017-09-13 19:18:20</p>
              </div>
              <div class="other">
                  <span>领料单位：甲级供应商</span>
                  <span>领料人：小张</span>
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

        },
        onCancel (msg) {

        }
      })
    }
  }
}
</script>

