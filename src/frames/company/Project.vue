<template>
    <section class="child_page">
        <headerTop :title="projectName"></headerTop>
        <!--tabchange-->
        <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
            <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"
                      @click="demo2 = item"
                      :key="index">{{item}}
            </tab-item>
        </tab>
        <!--<swiper v-model="index" height="100px" :show-dots="false">-->
        <!--<swiper-item v-for="(item, index) in list2" :key="index">-->
        <!--<div class="tab-swiper vux-center">{{item}} Container</div>-->
        <!--</swiper-item>-->
        <!--</swiper>-->
        <!--tablue-->
        <!--tablue-->
        <table class="an-table" v-show="index==0">
            <thead>
            <th>序号</th>
            <th>班组名称</th>
            <td>出勤人数</td>
            <th>正常</th>
            <th>异常</th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in teamData" @click="showWorkers(item.projectId,item.teamId,item.teamName)">
                <td><i>{{index+1}}</i></td>
                <td>{{item.teamName}}</td>
                <td>30</td>
                <td>{{item.workst}}</td>
                <td>{{item.worket}}</td>
            </tr>
            </tbody>
        </table>
        <!--tablue end-->
        <table class="an-table" v-show="index==1">
            <thead>
            <th>序号</th>
            <th>设备名称</th>
            <td>SN号</td>
            <th>设备状态</th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in ledgerData">
                <td><i>{{index + 1}}</i></td>
                <td>{{item.dev_name | subStr(6)}}</td>
                <td>{{item.dev_sn}}</td>
                <td>
                    <em class="normal" v-if="item.dev_status==1">在线</em>
                    <em class="belate" v-else>离线</em>
                </td>
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
  import {Tab, TabItem, Swiper, SwiperItem} from 'vux'
  export default {
    components: {
      headerTop,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        teamData: [],
        ledgerData: [],
        list2: ['班组', '考勤机台帐'],
        demo2: '班组',
        index: 0,
        projectName: this.$route.params.name
      }
    },
    created: function () {
      this.showTeam()
      this.showLedger()
    },
    filters: {
      subStr: function (value, num) {
        return value.substr(0, num)
      }
    },
    computed: {},
    methods: {
      showTeam () {
        let param = {
          project_id: this.$route.params.id
        }
        if (param.project_id === '') {
          this.toastShow('text', '请选择一个项目')
          return
        }
        this.post('/LaborManage/appcommon/appTeamList.htm', param, function (result) {
          if (result != null && result.length > 0) {
            result.forEach(function (item) {
              let teamId = item.team_id == null ? '' : item.team_id
              if (teamId.length > 0) {
                let team = {
                  teamId: teamId,
                  projectId: item.project_id,
                  teamName: item.team_name,
                  workst: item.work_st,
                  worket: item.work_et
                }
                this.teamData.push(team)
              }
            }.bind(this))
          } else {
            this.toastShow('text', '没有找到班组记录')
          }
        }.bind(this))
      },
      showLedger: function () {
        this.post('/LaborManage/device/findAllDevice.htm', {}, function (result) {
          if (result != null && result.length > 0) {
            this.ledgerData = result
          } else {
            this.toastShow('text', '考勤机台账记录为空')
          }
        }.bind(this))
      },
      showWorkers: function (projectId, teamId, teamName) {
        this.$router.push('/company/team/' + projectId + '/' + teamId + '/' + encodeURI(teamName))
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../../less/itemlist.css";

    .router-show-enter-active, .router-show-leave-active {
        transition: all .4s;
    }

    .router-show-enter, .router-show-leave-active {
        transform: translateX(100%)
    }
</style>
