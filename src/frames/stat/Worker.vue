<template>
    <section class="child_page">
        <headerTop title="用工分析"></headerTop>
        <!--datetab-->
        <selectDate @statFun="getWorkerData"></selectDate>
        <!--datetab end-->
        <!--chart-->
        <div class="chartmod" style="height:610px;" id="containerWorker">

        </div>
        <!--chart end-->
        <!--line-->
        <div class="curoff"></div>
        <!--line end-->
        <!--chart-->
        <div class="chartmod" style="height:410px;">
            <h4>{{companyName}}</h4>
            <div id="containerProject"></div>
        </div>
        <!--chart end-->
    </section>
</template>

<script>
  import headerTop from '../../components/Header.vue'
  import {Group, Datetime} from 'vux'
  import selectDate from '../../components/SelectDate.vue'
  var Highcharts = require('highcharts')
  export default {
    components: {
      headerTop,
      Datetime,
      Group,
      selectDate
    },
    data () {
      return {
        companyData: [],
        companyNameArr: [],
        companyOnNumArr: [],
        highchartsFontSize: '22px',
//        companyProjects: null,
        projectData: [],
        projectNameArr: [],
        projectOnNumArr: [],
        companyName: '上海分公司'
      }
    },
    created: function () {
      this.getWorkerData()
    },
    filters: {
      subStr: function (value, num) {
        return value.substr(0, num)
      }
    },
    computed: {},
    mounted: function () {
//      this.drawCompanyChart()
//      this.drawAreaChart()
    },
    methods: {
      getWorkerData () {
        this.post('/LaborManage/welcome/findProjectInfoList.htm', {}, function (result) {
          if (result != null && result.length > 0) {
            this.companyData = []
            this.companyNameArr = []
            this.companyOnNumArr = []
            this.projectData = []
            this.projectNameArr = []
            this.projectOnNumArr = []
            let companys = new Map()
            let companyProjects = new Map()
            result.forEach(function (item) {
              let companyName = item.org_name  // 公司名称
              let companyInfo = {
                projectNum: 1,                // 项目数量
                projectName: item.project_name,
                registNum: parseInt(item.zc_count) || 0,    // 在册人数
                onNum: parseInt(item.cq_count) || 0,        // 考勤人数
                onNormalNum: parseInt(item.llcq_count) || 0,   // 考勤正常人数
//              let offNum =item.zc_count+item.cd_count
                machineNum: parseInt(item.dev_count) || 0,   // 考勤机数量
                onMachineNum: parseInt(item.zx_count) || 0  // 在线考勤机数量
              }

              // 按照公司分组统计所有
              let value = companys.get(companyName)
              if (value === undefined) {
                companys.set(companyName, companyInfo)
              } else {
                value.projectNum += companyInfo.projectNum
                value.registNum += companyInfo.registNum
                value.onNum += companyInfo.onNum
                value.onNormalNum += companyInfo.onNormalNum
                value.machineNum += companyInfo.machineNum
                value.onMachineNum += companyInfo.onMachineNum
//                companys.set(companyName, value)
              }

              // 按照公司分组，统计项目出勤
              value = companyProjects.get(companyName)
              if (value === undefined) {
                companyProjects.set(companyName, [companyInfo])
              } else {
                value.push(companyInfo)
//                companyProjects.set(companyName, value)
              }
            })
            // 公司总的出勤人数
            this.companyData = [...companys]
            this.companyData.forEach(function (item) {
              let name = item[0].substr(0, 2)
              let value = parseInt(item[1].onNum) || 0
              this.companyNameArr.push(name)
              this.companyOnNumArr.push(value)
            }.bind(this))
            // 某一个公司项目出勤人数
            this.projectData = [...companyProjects]
            this.projectData[0][1].forEach(function (item) {
              let name = item.projectName.substr(0, 5)
              let value = parseInt(item.onNum) || 0
              this.projectNameArr.push(name)
              this.projectOnNumArr.push(value)
            }.bind(this))
            this.drawCompanyChart()
            this.drawAreaChart()
          } else {
            this.toastShow('text', '获取统计记录为空')
          }
        }.bind(this))
      },
      drawCompanyChart () {
        Highcharts.chart('containerWorker', {
          chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column',
            style: {
//              color: '#ff0000',
              fontSize: this.highchartsFontSize
//              fontWeight: 'blod',
//              fontFamily: 'Courier new'
            }
          },
          credits: {enabled: false},
          title: {
            text: null
          },
          subtitle: {
            text: null
          },
          xAxis: {
            categories: this.companyNameArr,
            crosshair: true,
            labels: {
//              rotation: -45,
              style: {
                fontSize: this.highchartsFontSize  // 字体
              }
            }
          },
          yAxis: {
            min: 0,
            gridLineWidth: '0px',
            title: {
              text: '出勤人数 (人)'
            },
            labels: {
              style: {
                fontSize: this.highchartsFontSize  // 字体
              }
            }
          },
          legend: {
            itemStyle: {
              'fontSize': this.highchartsFontSize
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
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
              pointWidth: 50,
              events: {
                click: function (e) {
                  let companyName = e.point.category
                  this.projectNameArr = []
                  this.projectOnNumArr = []
                  this.projectData.forEach(function (com) {
                    if (com[0].indexOf(companyName) > -1) {
                      this.companyName = com[0]
                      com[1].forEach(function (item) {
                        let name = item.projectName.substr(0, 5)
                        let value = parseInt(item.onNum) || 0
                        this.projectNameArr.push(name)
                        this.projectOnNumArr.push(value)
                      }.bind(this))
                      this.drawAreaChart()
                      return
                    }
                  }.bind(this))
                }.bind(this)
              }
            }
          },
          series: [{
            name: '出勤人数',
            colorByPoint: true,
            data: this.companyOnNumArr
          }]
        })
      },
      drawAreaChart () {
        Highcharts.chart('containerProject', {
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
            categories: this.projectNameArr,
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
            data: this.projectOnNumArr
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
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../../less/analysis.css";
</style>
