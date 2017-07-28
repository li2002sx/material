<template>
    <section class="child_page">
        <headerTop title="项目分析"></headerTop>
        <!--tabchange-->
        <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
            <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"
                      @click="demo2 = item"
                      :key="index">{{item}}
            </tab-item>
        </tab>
        <div v-show="index==0">
            <!--chart-->
            <div class="chartmod" id="container" style="height:610px">

            </div>
            <!--chart end-->
            <!--tablue-->
            <table class="an-table">
                <thead>
                <th>序号</th>
                <th>公司名称</th>
                <td>项目</td>
                <th>班组</th>
                <th>工人</th>
                <th>考勤机</th>
                </thead>
                <tbody>
                <tr v-for="(item, index) in companyData">
                    <td><i>{{index + 1}}</i></td>
                    <td>{{item[0]}}</td>
                    <td>{{item[1].projectNum}}</td>
                    <td>0</td>
                    <td>{{item[1].registNum}}</td>
                    <td>{{item[1].machineNum}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-show="index==1">
            <!--chart-->
            <div class="chartmod" id="container2" style="height:610px">
                <!--<div class="layout" style="padding-top:80px;">-->
                <!--<div class="td chartbox"></div>-->
                <!--<dl class="td chartlist">-->
                <!--<dd>-->
                <!--<p>华北地区</p>-->
                <!--<p class="c-chartred">47.96%</p>-->
                <!--</dd>-->
                <!--<dd>-->
                <!--<p>华南地区</p>-->
                <!--<p class="c-chartred">47.96%</p>-->
                <!--</dd>-->
                <!--<dd>-->
                <!--<p>华东地区</p>-->
                <!--<p class="c-chartred">47.96%</p>-->
                <!--</dd>-->
                <!--<dd>-->
                <!--<p>西南地区</p>-->
                <!--<p class="c-chartblue">47.96%</p>-->
                <!--</dd>-->
                <!--</dl>-->
                <!--</div>-->
            </div>
            <!--chart end-->
            <!--tablue-->
            <table class="an-table">
                <thead>
                <th>序号</th>
                <th>公司名称</th>
                <td>项目</td>
                <th>班组</th>
                <th>工人</th>
                <th>考勤机</th>
                </thead>
                <tbody>
                <tr v-for="(item, index) in companyData">
                    <td><i>{{index + 1}}</i></td>
                    <td>{{item[0]}}</td>
                    <td>{{item[1].projectNum}}</td>
                    <td>0</td>
                    <td>{{item[1].registNum}}</td>
                    <td>{{item[1].machineNum}}</td>
                </tr>
                </tbody>
            </table>
            <!--tablue end-->
        </div>
    </section>
</template>

<script>
  import headerTop from '../../components/Header.vue'
  import {Tab, TabItem} from 'vux'
  var Highcharts = require('highcharts')
  export default {
    components: {
      headerTop,
      Tab,
      TabItem
    },
    data () {
      return {
        companyData: [],
        companyNameArr: [],
        projectNumArr: [],
        highchartsFontSize: '22px',
        areaNumArr: [],
        list2: ['分公司', '地域'],
        demo2: '分公司',
        index: 0
      }
    },
    created: function () {
      this.getData()
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
      getData () {
        this.post('/LaborManage/welcome/findProjectInfoList.htm', {}, function (result) {
          if (result != null && result.length > 0) {
            let companys = new Map()
            result.forEach(function (item) {
              let companyName = item.org_name  // 公司名称
              let companyInfo = {
                projectNum: 1,                // 项目数量
                registNum: parseInt(item.zc_count) || 0,    // 在册人数
                onNum: parseInt(item.cq_count) || 0,        // 考勤人数
                onNormalNum: parseInt(item.llcq_count) || 0,   // 考勤正常人数
//              let offNum =item.zc_count+item.cd_count
                machineNum: parseInt(item.dev_count) || 0,   // 考勤机数量
                onMachineNum: parseInt(item.zx_count) || 0  // 在线考勤机数量
              }
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
                companys.set(companyName, value)
              }
            })
            this.companyData = [...companys]
            this.companyData.forEach(function (item) {
              let name = item[0].substr(0, 2)
              let value = parseInt(item[1].projectNum) || 0
              this.companyNameArr.push(name)
              this.projectNumArr.push(value)
              if (name.indexOf('上海') > -1) {
                this.areaNumArr.push({
                  name: name,
                  y: value,
                  sliced: true,
                  selected: true
                })
              } else {
                this.areaNumArr.push([name, value])
              }
            }.bind(this))
            this.drawCompanyChart()
            this.drawAreaChart()
          } else {
            this.toastShow('text', '获取统计记录为空')
          }
        }.bind(this))
      },
      drawCompanyChart () {
        Highcharts.chart('container', {
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
              text: '项目数量 (个)'
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
              pointWidth: 50
            }
          },
          series: [{
            name: '项目数量',
            colorByPoint: true,
            data: this.projectNumArr
          }]
        })
      },
      drawAreaChart () {
        Highcharts.chart('container2', {
          chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
          },
          credits: {enabled: false},
          title: {
            text: null
          },
          tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '{point.name}<br /> {point.percentage:.1f} %',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#666',
                  fontSize: this.highchartsFontSize,  // 字体
                  fontWeight: 'normal',
                  textShadow: '0px,0px,0px,0px'
                }
              }
            }
          },
          series: [{
            type: 'pie',
            name: '项目数量',
            data: this.areaNumArr
          }]
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../../less/analysis.css";
</style>
