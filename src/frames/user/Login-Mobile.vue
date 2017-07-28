<template>
    <div class="mobilelogin">
        <div class="mobile">
            <x-input type="text" :is-type="beMobile" placeholder="请输入您的ID / 手机号" id="mobile" v-model="mobile"/>
        </div>
        <div class="password">
            <input type="password" placeholder="请输入6-12位密码" id="password" v-model="password"/>
            <input type="text" id="password2" style="display: none"/>
            <span class="passiconhide" id="showHidePass"></span>
        </div>
        <div class="mobiletip">
            <a href="/mobile/reg" class="regtext">注册</a>
            <a href="/mobile/forgetpass" class="forgetpass">忘记密码</a>
        </div>
        <div class="regbutton"><input type="button" value="登陆" @click="login"/></div>
        <div class="loginxieyi">登陆即表示同意<a href="/help/agreetment" class="xieyiword">《全聚星用户协议》</a></div>
        <schart :canvasId="canvasId"
                :type="type"
                :width="width"
                :height="height"
                :data="data"
                :options="options"
        ></schart>
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
        <div id="container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
    </div>
</template>

<script>
  import {XInput} from 'vux'
  //  import global from '../../config/globalUtil'
  import Schart from 'vue-schart'
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/pie')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')

  //  import HighCharts from 'highcharts'
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  //  require('highcharts/modules/exporting')(Highcharts)

  export default {
    components: {
      XInput,
      Schart
    },
    data () {
      return {
        mobile: '13810583852',
        password: '123456',
//        show6: true,
//        msg: '大家好才是真的好',
        beMobile: function (value) {
          return {
            valid: value === '2333',
            msg: 'Must be 2333'
          }
        },
        canvasId: 'myCanvas',
        type: 'ring', // bar, line, pie, ring
        width: 500,
        height: 400,
        data: [
          {name: '2014', value: 1342},
          {name: '2015', value: 2123},
          {name: '2016', value: 1654},
          {name: '2017', value: 1795}
        ],
        options: {
          title: 'Total sales of stores in recent years'
        }
      }
    },
    mounted () {
      this.drawLine()
      this.drawPie()
    },
    methods: {
      login: function () {
        var param = {
//          mobile: this.mobile,
          userno: 'admin',
          password: 'dfzskjb1'
//          deviceId: '1234567890 /rest/user/certificate'
        }
        this.postAxios('/LaborManage/login/login.htm', param, result => {
          if (result.flag === 'success') {
            this.toastShow('success', '登陆成功')
//            this.toast('success', '登陆成功')
//            this.$vux.toast.show({
//              type: 'success',
//              text: '登陆成功',
//              position: 'middle'
//            })
          } else {
//            this.$vux.toast.text(result.message, 'middle')
          }
        })
//        param = {
//          orderNumber: '170624155952703025713'
//        }
//        this.getAxios('/mall/ordernew/getamountbyordernumber', param, result => {
//          if (result.status === -1) {
//            this.$vux.toast.show({
//              type: 'success',
//              text: '获取订单成功',
//              position: 'middle'
//            })
//          } else {
//            this.$vux.toast.text(result.message, 'middle')
//          }
//        })
//        this.$vux.toast.show({
//          type: 'success',
//          text: '操作成功',
//          position: 'middle',
//          isShowMask: true
//        })
//        // 显示
//        this.$vux.loading.show({
//          text: '加载中'
//        })
        // 显示文字
//        this.$vux.toast.text('大家好才是真的好', 'middle')
//        alert(this.isNumber(this.mobile))
//        alert(this.isMobile(this.mobile))
      },
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
//        let myChart = this.$echarts.init(document.getElementById('myChart'))
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '某站点用户访问来源',
//            subtext: '纯属虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
//          legend: {
//            orient: 'vertical',
//            left: 'left',
//            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
//          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      drawPie () {
        Highcharts.chart('container', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          credits: {enabled: false},
          title: {
            text: 'Browser market shares January, 2015 to May, 2015'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              }
            }
          },
          series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
              name: 'Microsoft Internet Explorer',
              y: 56.33
            }, {
              name: 'Chrome',
              y: 24.03,
              sliced: true,
              selected: true
            }, {
              name: 'Firefox',
              y: 10.38
            }, {
              name: 'Safari',
              y: 4.77
            }, {
              name: 'Opera',
              y: 0.91
            }, {
              name: 'Proprietary or Undetectable',
              y: 0.2
            }]
          }]
        })
      }
    }
  }
</script>

<style>
    .mobilelogin {
        font-size: 24px;
        background-color: #fff;
        padding-bottom: 50px;
        z-index: 1;
        position: absolute;
        height: 100%;
    }

    .mobilelogin .mobile, .mobilelogin .code, .mobilelogin .password, .mobilelogin .validate-code {
        border-bottom: 2px solid #F5F5F5;
    }

    .mobilelogin input {
        padding: 0 32px;
        height: 90px;
        font-size: 24px;
        width: 686px;
        border: 0;
    }

    .mobilelogin .password input {
        padding-right: 10px;
        width: 628px;
    }

    .mobilelogin .password span {
        background-image: url("../../images/zhuce-yincangmima-yincang@3x.png");
        background-size: contain;
        margin-top: 31px;
        margin-right: 40px;
        width: 38px;
        height: 28px;
        float: right;
    }

    .mobilelogin .password .passiconhide {
        background-image: url("../../images/zhuce-yincangmima-xianshi@3x.png");
    }

    .mobilelogin .mobiletip {
        margin: 40px 32px;
    }

    .mobilelogin .regtext {
        color: #4990E2;
    }

    .mobilelogin .mobiletip .forgetpass {
        float: right;
        color: #999999;
    }

    .mobilelogin .regbutton {
        text-align: center;
        margin-top: 35px;
    }

    .mobilelogin .regbutton input {
        text-align: center;
        width: 598px;
        height: 80px;
        background-color: rgba(255, 85, 76, 0.80);
        border-radius: 40px;
        font-size: 30px;
        color: #FFFFFF;
    }

    .mobilelogin .loginxieyi {
        margin-top: 40px;
    }

    .mobilelogin .loginxieyi .xieyiword {
        color: #4990E2;
    }

    .mobilelogin .code .codeinput {
        width: 465px;
    }

    .mobilelogin .code span {
        margin-top: 25px;
        margin-right: 40px;
        float: right;
    }

    .mobilelogin .code span input {
        width: 160px;
        height: 40px;
        background-color: rgba(255, 85, 76, 0.80);
        border-radius: 20px;
        color: #FFFFFF;
        padding: 0 8px;
    }

    .mobilelogin .validate-code .validate-code-input {
        width: 480px;
    }
</style>
