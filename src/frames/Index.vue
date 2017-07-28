<template>
    <section>
        <headerTop title='首页'></headerTop>
        <!--user-->
        <div class='indexuser'>
            <div class='datebox'>{{currentTime}}</div>
            <div class='totalbox'>
                <div class='userimg'>
                <span>
                    <i></i>
                    <em>在线工人</em>
                </span>
                    <h3>{{totalStat.onNumStr}}</h3>
                </div>
                <dl class='layout totallist'>
                    <dd class='td'>
                        <span>公司</span>
                        <b>{{totalStat.companyCount}}</b>
                    </dd>
                    <dd class='td'>
                        <span>项目</span>
                        <b>{{totalStat.projectNum}}</b>
                    </dd>
                    <dd class='td'>
                        <span>考勤机</span>
                        <b>{{totalStat.machineNum}}</b>
                    </dd>
                    <dd class='td'>
                        <span>在线</span>
                        <b>{{totalStat.onMachineNum}}</b>
                    </dd>
                    <dd class='td'>
                        <span>在册</span>
                        <b>{{totalStat.registNum}}</b>
                    </dd>
                    <dd class='td'>
                        <span>出勤</span>
                        <b>{{totalStat.onNum}}</b>
                    </dd>
                </dl>
            </div>
        </div>
        <!--user end-->
        <!--chart-->
        <div class='indexchart'>
            <!--datetab-->
            <selectDate @statFun="getDataWorker"></selectDate>
            <!--<div class='datechange'>-->
            <!--<ul class='layout'>-->
            <!--<li class='td' @click="showDay(-1)">前一天</li>-->
            <!--<li class='td'>出勤 | <em @click="showPlugin()">{{endDate | format}}</em></li>-->
            <!--<li class='td' @click="showDay(1)">后一天</li>-->
            <!--</ul>-->
            <!--</div>-->
            <!--datetab end-->
            <div style='height:320px;margin-top:30px' id="container2"></div>
        </div>
        <!--chart end-->
        <!--citylist-->
        <div class='indexcitylist'>
            <dl class='layout'>
                <dd class='td' @click="showCompany(1)">
                    <i style='background-image:url(/static/images/icon/ico-index-ssh.png); background-color:#60a0f2;'></i>
                    <p>上海分公司</p>
                </dd>
                <dd class='td' @click="showCompany(2)">
                    <i style='background-image:url(/static/images/icon/ico-index-bj.png); background-color:#55d5c4;'></i>
                    <p>北京分公司</p>
                </dd>
                <dd class='td' @click="showCompany(3)">
                    <i style='background-image:url(/static/images/icon/ico-index-nj.png); background-color:#e3c065;'></i>
                    <p>南京分公司</p>
                </dd>
                <dd @click="showCompany(4)">
                    <i style='background-image:url(/static/images/icon/ico-index-gz.png); background-color:#9b95e8;'></i>
                    <p>广州分公司</p>
                </dd>
            </dl>
            <dl class='layout'>
                <dd class='td' @click="showCompany(5)">
                    <i style='background-image:url(/static/images/icon/ico-index-cd.png); background-color:#e3a665;'></i>
                    <p>成都分公司</p>
                </dd>
                <dd class='td' @click="showCompany(6)">
                    <i style='background-image:url(/static/images/icon/ico-index-wh.png); background-color:#91d080;'></i>
                    <p>武汉分公司</p>
                </dd>
                <dd class='td' @click="showCompany(7)">
                    <i style='background-image:url(/static/images/icon/ico-index-qd.png); background-color:#60c4f2;'></i>
                    <p>青岛分公司</p>
                </dd>
                <dd @click="showCompany(8)">
                    <i style='background-image:url(/static/images/icon/ico-index-mq.png); background-color:#95bee8;'></i>
                    <p>幕墙分公司</p>
                </dd>
            </dl>
        </div>
        <!--citylist end-->
        <footerButtom tab="0"></footerButtom>
        <transition name="router-show">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
  import headerTop from '../components/Header.vue'
  import footerButtom from '../components/Footer.vue'
  import selectDate from '../components/SelectDate.vue'
  import {numberPad, Datetime, dateFormat} from 'vux'
  var Highcharts = require('highcharts')
  export default {
    components: {
      headerTop,
      footerButtom,
      numberPad,
      Datetime,
      selectDate
    },
    data () {
      return {
        currentTime: '',
        totalStat: {},
        highchartsFontSize: '22px',
        onDateArr: [],
        onNumArr: []
//        endDate: new Date()
      }
    },
    created () {
      this.todayStr()
      this.getData()
      this.getDataWorker(new Date())
    },
    filters: {
      format: function (value) {
        return dateFormat(value, 'YYYY-MM-DD')
      }
    },
    methods: {
      getData () {
        this.post('/LaborManage/welcome/findProjectInfoList.htm', {}, function (result) {
          if (result != null && result.length > 0) {
            let onNum = 0
            let registNum = 0
            let machineNum = 0
            let onMachineNum = 0
            let companySet = new Set()
            result.forEach(function (item) {
              onNum += parseInt(item.cq_count) || 0        // 考勤人数
              registNum += parseInt(item.zc_count) || 0    // 在册人数
              machineNum += parseInt(item.dev_count) || 0   // 考勤机数量
              onMachineNum += parseInt(item.zx_count) || 0  // 在线考勤机数量
              companySet.add(item.org_name)  // 公司名称
            })
            this.totalStat = {
              onNum: onNum,
              onNumStr: numberPad(onNum, 5),
              companyCount: companySet.size,
              projectNum: result.length,
              registNum: registNum,
              machineNum: machineNum,
              onMachineNum: onMachineNum
            }
          } else {
            this.toastShow('text', '获取统计记录为空')
          }
        }.bind(this))
      },
      getDataWorker (endDate) {
        let param = {
          q_st: dateFormat(this.addDate(endDate, -7), 'YYYY-MM-DD'),
          q_et: dateFormat(endDate, 'YYYY-MM-DD')
        }
        this.post('/LaborManage/welcome/analyzePerson.htm', param, function (result) {
          this.onDateArr = []
          this.onNumArr = []
          if (result != null && result.length > 0) {
            result.forEach(function (item) {
              this.onDateArr.push(item.tjzdName)
              this.onNumArr.push(item.count)
            }.bind(this))
            this.drawDataChart()
          } else {
            this.toastShow('text', '获取统计记录为空')
          }
        }.bind(this))
      },
      drawDataChart () {
        Highcharts.chart('container2', {
          chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            type: 'areaspline',
            style: {
              fontSize: this.highchartsFontSize
            }
          },
          title: {
            text: null
          },
          legend: {
//            layout: 'vertical',
//            align: 'left',
//            verticalAlign: 'top',
//            x: 150,
//            y: 100,
//            floating: true,
//            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(0,0,0,0)',
            itemStyle: {
              'fontSize': this.highchartsFontSize
            }
          },
          xAxis: {
            categories: this.onDateArr,
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
            data: this.onNumArr
          }]
        })
      },
//      showPlugin () {
//        let that = this
//        this.$vux.datetime.show({
//          cancelText: '取消',
//          confirmText: '确定',
//          format: 'YYYY-MM-DD',
//          value: dateFormat(this.endDate, 'YYYY-MM-DD'),
//          onConfirm (val) {
//            console.log('plugin confirm', val)
//            that.endDate = val
//            that.getDataWorker()
//          },
//          onShow () {
//            console.log('plugin show')
//          },
//          onHide () {
//            console.log('plugin hide')
//          }
//        })
//      },
//      showDay: function (value) {
//        value = parseInt(value) || 0
//        this.endDate = this.addDate(this.endDate, value)
//        this.getDataWorker()
//      },
      showCompany: function (value) {
        this.$router.push('/company/' + value)
      },
      todayStr: function () {
        window.setInterval(() => {
          let date = new Date()
          this.year = date.getFullYear()
          this.month = date.getMonth() + 1
          this.date = date.getDate()
          this.day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]
          this.hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
          this.minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
          this.second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
          this.currentTime = this.year + '年' + this.month + '月' + this.date + '日 ' + ' ' + this.day + ' ' + this.hour + '时' + this.minute + '分' + this.second + '秒'
        }, 1000)
      }
    }
  }
</script>

<style>
    @import '../less/index.css';

    .router-show-enter-active, .router-show-leave-active {
        transition: all .4s;
    }

    .router-show-enter, .router-show-leave-active {
        transform: translateX(100%)
    }
</style>
