<template>
  <section>
    <div v-title data-title="我的待办"></div>
    <!-- <head-top title="工作台"></head-top> -->
    <footer-buttom tab="1"></footer-buttom>
    <!-- search -->
    <!-- <div class="indexsearch">
        <div class="searchmod">
            <input type="text" />
            <span>
                <i class="ico-search"></i>
                <em>搜索</em>
            </span>
        </div>
    </div> -->
    <!-- search end -->
    <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
      </tab-item>
    </tab>
    <!-- list -->
    <div class="bg">
      <dl v-show="index==0" class="todolist">
          <dd v-for="(item, index) in todoData.list" @click="toWorkDetail('approve',item.procInsId,item.procDefKey,item.taskId,item.businessId)">
              <div class="title">
                  <i>{{index + 1}}</i>
                  <h3>{{item.vars.map.applyName}}的申请单</h3>
                  <p class="time">单据编号：{{item.vars.map.billMarkNo}}</p>
                  <p class="time">单据类型：{{item.procDefName}}</p>
                  <p class="time">申请人：{{item.vars.map.applyName}}</p>
                  <p class="time">申请时间：{{item.vars.map.startTimeStr}}</p>
                  <p class="time" v-show="item.taskEndDate != undefined">完成时间：{{item.taskEndDate}}</p>
                  <p class="time">当前环节：{{item.taskName}}</p>
                  <p class="status">状态：
                    <template v-if="item.taskEndDate != undefined">
                      已完成
                    </template>
                    <template v-else>
                      进行中
                    </template>
                  </p>
                  <p class="lastdate">{{item.vars.map.startTimeStr | format}}</p>
              </div>
              <div class="other">
                  <span>项目名称：{{item.vars.map.projectName}}</span>
              </div>
          </dd>
      </dl>
      <dl v-show="index==1" class="todolist">
          <dd v-for="(item, index) in finishData.list" @click="toWorkDetail('detail',item.procInsId,item.procDefKey,0,item.businessId)">
              <div class="title">
                  <i>{{index + 1}}</i>
                  <h3>{{item.vars.map.applyName}}的申请单</h3>
                  <p class="time">单据编号：{{item.vars.map.billMarkNo}}</p>
                  <p class="time">单据类型：{{item.procDefName}}</p>
                  <p class="time">申请人：{{item.vars.map.applyName}}</p>
                  <p class="time">申请时间：{{item.vars.map.startTimeStr}}</p>
                  <p class="time" v-show="item.taskEndDate != undefined">完成时间：{{item.taskEndDate}}</p>
                  <!-- <p class="time">当前环节：{{item.taskName}}</p> -->
                  <p class="status">状态：
                    <template v-if="item.taskEndDate != undefined">
                      已完成
                    </template>
                    <template v-else>
                      进行中
                    </template>
                  </p>
                  <p class="lastdate">{{item.vars.map.startTimeStr | format}}</p>
              </div>
              <div class="other">
                  <span>项目名称：{{item.vars.map.projectName}}</span>
              </div>
          </dd>
      </dl>
    </div>
    <!-- list end -->
  </section>
</template>

<script>
import { TransferDomDirective as TransferDom, Tab, TabItem, Datetime, dateFormat } from 'vux'
import headTop from '../../components/Header.vue'
import footerButtom from '../../components/Footer.vue'
export default {
  directives: {
    TransferDom
  },
  components: {
    headTop,
    footerButtom,
    Tab,
    TabItem,
    Datetime
  },
  data () {
    return {
      list2: ['代办任务', '已办任务'],
      demo2: '代办任务',
      index: 0,
      todoData: {},
      finishData: {}
    }
  },
  created () {
    this.getTodos()
    this.getTodoFinishes()
  },
  filters: {
    format: function (value) {
      return dateFormat(value, 'YYYY-MM-DD')
    }
  },
  computed: {},
  mounted () {

  },
  methods: {
    getTodos () {
      var param = {
        pageNo: 1,
        pageSize: 100
      }
      let requestUrl = 'appData/app/todoData'
      let that = this
      this.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.todoData = result.map
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    getTodoFinishes () {
      var param = {
        pageNo: 1,
        pageSize: 100
      }
      let requestUrl = 'appData/app/historicData'
      let that = this
      this.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.finishData = result.map
        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>

