<template>
    <section>
        <headerTop title="统计分析"></headerTop>
        <!--indexmenu-->
        <div class="indexmenu">
            <dl class="layout">
                <dd class="td" @click="toUrl(1)">
                    <i class="ico-per"></i>
                    <p>人员分析</p>
                </dd>
                <dd class="td" @click="toUrl(2)">
                    <i class="ico-item"></i>
                    <p>项目分析</p>
                </dd>
                <dd class="td" @click="toUrl(3)">
                    <i class="ico-user"></i>
                    <p>用工分析</p>
                </dd>
            </dl>
        </div>
        <!--indexmenu end-->
        <!--chart-->
        <!--<div class="chartmod2">-->
        <!--<h4>出勤人数 | 公司 ∨</h4>-->
        <!--</div>-->
        <selectCompany title="出勤人数" @selectCompany="getSelectCompany"></selectCompany>
        <!--datetab-->
        <selectDate @statFun="getCompanyData"></selectDate>
        <!--datetab end-->
        <div class="chartmod2">
            <div class="layout" id="containerIndex">
            </div>
        </div>
        <!--chart end-->
        <!--tablue-->
        <table class="an-table">
            <thead>
            <th>序号</th>
            <th>公司名称</th>
            <td>出勤人数</td>
            <th>正常</th>
            <th>异常</th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in companyData">
                <td><i>{{index+1}}</i></td>
                <td>{{item[0]}}</td>
                <td>{{item[1].onNum}}</td>
                <td>{{item[1].onNormalNum}}</td>
                <td>{{item[1].onNum - item[1].onNormalNum}}</td>
            </tr>
            </tbody>
        </table>
        <!--tablue end-->
        <footerButtom tab="2"></footerButtom>
        <transition name="router-show">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
  import headerTop from '../../components/Header.vue'
  import footerButtom from '../../components/Footer.vue'
  import selectDate from '../../components/SelectDate.vue'
  import selectCompany from '../../components/SelectConpany.vue'
  var Highcharts = require('highcharts')
  export default {
    components: {
      headerTop,
      footerButtom,
      selectDate,
      selectCompany
    },
    data () {
      return {
        companyData: [],
        companyOnNumData: [],
        highchartsFontSize: '22px',
        companyId: ''
      }
    },
    created: function () {
      this.getCompanyData()
    },
    computed: {},
    methods: {
      getSelectCompany (value) {
        this.companyId = value || ''
      },
      getCompanyData () {
        this.post('/LaborManage/welcome/findProjectInfoList.htm', {}, function (result) {
          if (result != null && result.length > 0) {
            this.companyData = []
            this.companyOnNumData = []
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
              let value = parseInt(item[1].onNum) || 0
              if (name.indexOf('上海') > -1) {
                this.companyOnNumData.push({
                  name: name,
                  y: value,
                  sliced: true,
                  selected: true
                })
              } else {
                this.companyOnNumData.push([name, value])
              }
            }.bind(this))
            this.drawCompanyDataChart()
          } else {
            this.toastShow('text', '获取统计记录为空')
          }
        }.bind(this))
      },
      drawCompanyDataChart () {
        Highcharts.chart('containerIndex', {
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
            name: '出勤',
            data: this.companyOnNumData
          }]
        })
      },
      toUrl: function (value) {
        let url = ''
        value = parseInt(value) || 0
        switch (value) {
          case 1:
            url = '/stat/staff'
            break
          case 2:
            url = '/stat/project'
            break
          case 3:
            url = '/stat/worker'
            break
        }
        this.$router.push(url)
      }
    }
  }
</script>

<style>
    @import "../../less/analysis.css";

    .router-show-enter-active, .router-show-leave-active {
        transition: all .4s;
    }

    .router-show-enter, .router-show-leave-active {
        transform: translateX(100%)
    }
</style>
