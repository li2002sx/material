<template>
    <section class="child_page">
        <headerTop :title="comName"></headerTop>
        <!--datetab-->
        <selectDate @statFun="getCompanyData"></selectDate>
        <!--datetab END-->
        <!--chart-->
        <div class="chartmod">
            <h4>出勤人数<b>{{totalOnNum}}</b>人</h4>
            <div style="height:260px;margin-top: 30px" id="container-on"></div>
        </div>
        <!--chart end-->
        <!--tablue-->
        <table class="an-table">
            <thead>
            <th>项目</th>
            <th>实际人数</th>
            <td>出勤人数</td>
            <th>迟到人数</th>
            <th>早退人数</th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in projectData" @click="showProject(item.projectId,item.projectName)">
                <td>{{item.projectName | subStr(6)}}</td>
                <td><em class="c-blue">{{item.onNum}}</em></td>
                <td>{{item.onNormalNum}}</td>
                <td>{{item.lateNum}}</td>
                <td><em>{{item.leaveEarlyNum}}</em></td>
            </tr>
            </tbody>
        </table>
        <!--tablue end-->
        <transition name="router-show">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
  import headerTop from '../../components/Header.vue'
  import footerButtom from '../../components/Footer.vue'
  import selectDate from '../../components/SelectDate.vue'
  import {Datetime} from 'vux'
//  import BScroll from 'better-scroll'
  var Highcharts = require('highcharts')
  export default {
    components: {
      headerTop,
      footerButtom,
      Datetime,
      selectDate
    },
    data () {
      return {
        projectData: [],
        totalOnNum: 0,
        highchartsFontSize: '22px'
      }
    },
    created () {
      this.getCompanyData()
    },
    filters: {
      subStr: function (value, num) {
        return value.substr(0, num)
      }
    },
    computed: {
      comName: function () {
        return this.getCompanyName() + '分公司'
      }
    },
    mounted () {
    },
    methods: {
      getCompanyData () {
        this.post('/LaborManage/welcome/findProjectInfoList.htm', {}, function (result) {
          if (result != null && result.length > 0) {
            let companyProjects = new Map()
            result.forEach(function (item) {
              let companyName = item.org_name  // 公司名称
              let companyInfo = {
                projectId: item.project_id,
                projectNum: 1,                // 项目数量
                projectName: item.project_name,
                registNum: parseInt(item.zc_count) || 0,    // 在册人数
                onNum: parseInt(item.cq_count) || 0,        // 考勤人数
                onNormalNum: parseInt(item.llcq_count) || 0,   // 考勤正常人数
//              let offNum =item.zc_count+item.cd_count
                lateNum: item.cd_count,                // 迟到人数
                leaveEarlyNum: item.cd_count,          // 早退人数
                machineNum: parseInt(item.dev_count) || 0,   // 考勤机数量
                onMachineNum: parseInt(item.zx_count) || 0  // 在线考勤机数量
              }

              this.totalOnNum += companyInfo.onNum

              // 按照公司分组，统计项目出勤
              let value = companyProjects.get(companyName)
              if (value === undefined) {
                companyProjects.set(companyName, [companyInfo])
              } else {
                value.push(companyInfo)
//                companyProjects.set(companyName, value)
              }
            }.bind(this))
            let cName = this.getCompanyName()
            for (let [key, value] of companyProjects) {
              if (key.indexOf(cName) > -1) {
                this.projectData = value
                break
              }
            }
            this.drawAreaChart()
//            this.$nextTick(() => {
//              console.log('height', this.$refs.wrapper.offsetHeight)
//              let scroll = new BScroll(this.$refs.wrapper, {})
//              scroll.on('scroll', (pos) => {
//                console.log(pos.x + '~' + pos.y)
//              })
//            })
//            new BScroll(document.getElementById('wrapper'), {})
          } else {
            this.toastShow('text', '获取统计记录为空')
          }
        }.bind(this))
      },
      drawAreaChart () {
        Highcharts.chart('container-on', {
          chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: 'areaspline',
            style: {
              fontSize: this.highchartsFontSize
            }
          },
          title: {
            text: '--近7日出勤情况',
            style: {
              fontSize: this.highchartsFontSize  // 字体
            }
          },
          legend: {
            enabled: false,
//            layout: 'vertical',
//            align: 'left',
//            verticalAlign: 'top',
//            x: 200,
//            y: 100,
//            floating: true,
//            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(0,0,0,0)',
            itemStyle: {
              'fontSize': this.highchartsFontSize
            }
          },
          xAxis: {
            categories: ['07-01', '07-02', '07-03', '07-04', '07-05'],
//            plotBands: [{ // visualize the weekend
//              from: 4.5,
//              to: 6.5,
//              color: 'rgba(68, 170, 213, .2)'
//            }],
            labels: {
              rotation: -45,
              style: {
                fontSize: this.highchartsFontSize  // 字体
              }
            }
          },
          yAxis: {
            gridLineWidth: '0px',
            title: {
              text: '出勤数量 人'
            },
            labels: {
              style: {
                fontSize: this.highchartsFontSize  // 字体
              }
            }
          },
          tooltip: {
            headerFormat: '<div style="font-size:22px"><span>{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} 个</b></td></tr></div>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            areaspline: {
              fillOpacity: 0.5
            }
          },
          series: [{
            name: '项目出勤',
            data: [68, 78, 88, 58, 28]
          }]
        })
      },
      showPlugin () {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: '2017-07-02',
          onConfirm (val) {
            console.log('plugin confirm', val)
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
      showProject (id, name) {
        this.$router.push('/company/project/' + id + '/' + encodeURI(name))
      },
      getCompanyName () {
        let id = parseInt(this.$route.params.id) || 0
        let value = ''
        switch (id) {
          case 1:
            value = '上海'
            break
          case 2:
            value = '北京'
            break
          case 3:
            value = '南京'
            break
          case 4:
            value = '广州'
            break
          case 5:
            value = '成都'
            break
          case 6:
            value = '武汉'
            break
          case 7:
            value = '青岛'
            break
          case 8:
            value = '幕墙'
            break
          default:
            break
        }
        return value
      }
    }
  }
</script>

<style>
    @import "../../less/branch.css";

    .router-show-enter-active, .router-show-leave-active {
        transition: all .4s;
    }

    .router-show-enter, .router-show-leave-active {
        transform: translateX(100%)
    }
</style>
