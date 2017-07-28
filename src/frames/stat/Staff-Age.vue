<template>
    <section>
        <!--chart-->
        <div class="chartmod">
            <h4>年龄 | 公司 ∨</h4>
            <div class="layout" id="containerAge">

            </div>
        </div>
        <!--chart end-->
        <!--line-->
        <!--<div class="curoff"></div>-->
        <!--line end-->
        <!--chart-->
        <!--<div class="chartmod">-->
            <!--<h4>年龄 | 地域 ∨</h4>-->
            <!--<div class="layout">-->

            <!--</div>-->
        <!--</div>-->
        <!--chart end-->
        <!--tablue-->
        <table class="an-table">
            <thead>
            <th>序号</th>
            <th>年龄</th>
            <td>总人数</td>
            </thead>
            <tbody>
            <tr v-for="(item, index) in statData">
                <td><i>{{index+1}}</i></td>
                <td>{{item[0]}}</td>
                <td>{{item[1]}}</td>
            </tr>
            </tbody>
        </table>
        <!--tablue end-->
    </section>
</template>

<script>
  var Highcharts = require('highcharts')
  export default {
    components: {},
    data () {
      return {
        statData: [],
        highchartsFontSize: '22px'
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
        this.post('/LaborManage/welcome/analyzeAge.htm', {}, function (result) {
          if (result != null && result.length > 0) {
            result.forEach(function (item) {
              this.statData.push([item.tjzdName, item.count])
            }.bind(this))
            this.drawDataChart()
          } else {
            this.toastShow('text', '获取统计记录为空')
          }
        }.bind(this))
      },
      drawDataChart () {
        Highcharts.chart('containerAge', {
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
            name: '年龄',
            data: this.statData
          }]
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../../less/analysis.css";
</style>
