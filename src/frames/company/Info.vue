<template>
    <section class="child_page">
        <headerTop title="基本信息"></headerTop>
        <!--info-->
        <div class="infolist">
            <dl>
                <dt>基本信息</dt>
                <dd>
                    <b>姓名</b>
                    <p>{{name}}</p>
                </dd>
                <dd>
                    <b>身份证号</b>
                    <p>{{cardNo}}</p>
                </dd>
                <dd>
                    <b>出生日期</b>
                    <p>{{birthday}}</p>
                </dd>
                <dd>
                    <b>年龄</b>
                    <p>{{age}}</p>
                </dd>
                <dd>
                    <b>地址</b>
                    <p>{{address}}</p>
                </dd>
            </dl>
        </div>

        <div class="infolist">
            <dl>
                <dt>劳务信息</dt>
                <dd>
                    <b>项目名称</b>
                    <p>{{projectName}}</p>
                </dd>
                <dd>
                    <b>进场日期</b>
                    <p>{{enterTime}}</p>
                </dd>
                <dd>
                    <b>劳务班组</b>
                    <p>{{teamName}}</p>
                </dd>
                <dd>
                    <b>工种</b>
                    <p>{{jobName}}</p>
                </dd>
                <dd>
                    <b>规定上班时间</b>
                    <p>{{onWorkTime}}</p>
                </dd>
                <dd>
                    <b>规定下班时间</b>
                    <p>{{offWorkTime}}</p>
                </dd>
            </dl>
        </div>
        <!--info end-->
    </section>
</template>

<script>
  import headerTop from '../../components/Header.vue'
  import {dateFormat} from 'vux'
  export default {
    components: {
      headerTop
    },
    data () {
      return {
        name: '',
        cardNo: this.$route.params.cardno,
        birthday: '',
        age: '',
        address: '',
        projectName: '',
        enterTime: '',
        teamName: '',
        jobName: '',
        onWorkTime: '',
        offWorkTime: ''
      }
    },
    created: function () {
      this.getInfo()
    },
    computed: {},
    methods: {
      getInfo: function () {
        let param = {
          identity_cark: this.cardNo
        }
        this.post('/LaborManage/person/findPersonList.htm', param, function (result) {
          if (result != null && result.length > 0) {
            result = result[0]
            this.name = result.name
            this.birthday = dateFormat(result.birthday, 'YYYY-MM-DD')
            this.age = result.age
            this.address = result.address
            this.projectName = result.project_name
            this.enterTime = dateFormat(result.enter_date, 'YYYY-MM-DD')
            this.teamName = result.team_name
            this.jobName = result.jobsname
            this.onWorkTime = result.work_st === null ? '-' : dateFormat(result.work_st, 'HH:mm')
            this.offWorkTime = result.work_et === null ? '-' : dateFormat(result.work_et, 'HH:mm')
          } else {
            this.toastShow('text', '花名册记录为空')
          }
        }.bind(this))
      }
    }
  }
</script>

<style>
    @import "../../less/labor.css";
</style>
