<template>
    <section class="child_page">
        <headerTop :title="temaName"></headerTop>
        <!--header end-->
        <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
            <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"
                      @click="demo2 = item"
                      :key="index">{{item}}
            </tab-item>
        </tab>
        <!--tablue-->
        <table class="an-table" v-show="index==0">
            <thead>
            <th>序号</th>
            <th>姓名</th>
            <td>上班</td>
            <th>下班</th>
            <th>状态</th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in normalData" @click="workerInfo(item.identity_cark)">
                <td><i>{{index + 1}}</i></td>
                <td>{{item.rec_name}}</td>
                <td>{{item.st | dateFormat}}</td>
                <td>{{item.et | dateFormat}}</td>
                <td>
                    <em class="normal">正常</em>
                </td>
            </tr>
            </tbody>
        </table>
        <!--tablue end-->
        <!--tablue-->
        <table class="an-table" v-show="index==1">
            <thead>
            <th>序号</th>
            <th>姓名</th>
            <td>上班</td>
            <th>下班</th>
            <th>状态</th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in abnormalData" @click="workerInfo(item.identity_cark)">
                <td><i>{{index + 1}}</i></td>
                <td>{{item.rec_name}}</td>
                <td>{{item.st | dateFormat}}</td>
                <td>{{item.et | dateFormat}}</td>
                <td>
                    <em class="beleave">早退</em>
                </td>
            </tr>
            </tbody>
        </table>
        <!--tablue end-->
        <!--tablue-->
        <table class="an-table" v-show="index==2">
            <thead>
            <th>序号</th>
            <th>姓名</th>
            <td>年龄</td>
            <th>工种</th>
            <th>联系方式</th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in rosterData" @click="workerInfo(item.identity_cark)" v-if="index<20">
                <td><i>{{index + 1}}</i></td>
                <td>{{item.name}}</td>
                <td>{{item.age}}</td>
                <td>{{item.jobsname}}</td>
                <td>{{item.phone}}</td>
            </tr>
            </tbody>
        </table>
        <transition name="router-show">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
  import headerTop from '../../components/Header.vue'
  import {Tab, TabItem, dateFormat} from 'vux'
  export default {
    components: {
      headerTop,
      Tab,
      TabItem
    },
    data () {
      return {
        normalData: [],
        abnormalData: [],
        rosterData: [],
        list2: ['正常出勤', '异常出勤', '花名册'],
        demo2: '正常出勤',
        index: 0,
        projectId: this.$route.params.projectId,
        teamId: this.$route.params.teamId,
        temaName: this.$route.params.teamName,
        endDate: dateFormat(new Date(), 'YYYY-MM-DD')
      }
    },
    created: function () {
      this.getData()
    },
    filters: {
      subStr: function (value, num) {
        return value.substr(0, num)
      },
      dateFormat: function (value) {
        return dateFormat(value, 'HH:mm')
      }
    },
    computed: {},
    methods: {
      getData: function () {
        let param = {
          b_time: this.endDate,
          e_time: this.endDate,
          project_id: this.projectId,
//          labor_team: this.teamId,
          status: '正常'
        }
        this.post('/LaborManage/kq/findKqList.htm', param, function (result) {
          if (result != null && result.length > 0) {
            this.normalData = result
          } else {
            this.toastShow('text', '正常考勤记录为空')
          }
        }.bind(this))

        param = {
          b_time: this.endDate,
          e_time: this.endDate,
          project_id: this.projectId,
//          labor_team: this.teamId,
          status: '迟到'
        }
        this.post('/LaborManage/kq/findKqList.htm', param, function (result) {
          if (result != null && result.length > 0) {
            this.abnormalData = result
          } else {
            this.toastShow('text', '异常考勤记录为空')
          }
        }.bind(this))

        param = {
          project_id: this.projectId,
          labor_team: this.teamId
        }
        this.post('/LaborManage/person/findPersonList.htm', param, function (result) {
          if (result != null && result.length > 0) {
            this.rosterData = result
          } else {
            this.toastShow('text', '花名册记录为空')
          }
        }.bind(this))
      },
      workerInfo: function (cardNo) {
        if (cardNo !== null) {
          this.$router.push('/company/info/' + cardNo)
        } else {
          this.toastShow('text', '用户标示为空')
        }
      }
    }
  }
</script>

<style>
    @import "../../less/team.css";

    .router-show-enter-active, .router-show-leave-active {
        transition: all .4s;
    }

    .router-show-enter, .router-show-leave-active {
        transform: translateX(100%)
    }
</style>
