<template>
    <!--header-->
    <header>
        <a href="javascript:void(0)" class="goback" @click="goback" v-show="back"></a>
        <h3>{{title}}</h3>
        <!--<span class="tool">-->
            <!--<i class="filter" title="筛选" @click="filter"></i>-->
        <!--</span>-->
        <!--<div v-transfer-dom>-->
            <!--<popup v-model="showFilter" position="right" width="65%">-->
                <!--<div class="listmod">-->
                    <!--<dl>-->
                        <!--<group title="">-->
                            <!--<popup-picker :title="companyName" :data="companyNameData"-->
                                          <!--@on-show="showCompany" v-model="companyNameValue" show-name-->
                                          <!--@on-change="changeCompany"></popup-picker>-->
                            <!--<popup-picker :title="projectName" :data="projectNameData"-->
                                          <!--@on-show="showProject" v-model="projectNameValue" show-name-->
                                          <!--@on-change="changeProject"></popup-picker>-->
                            <!--<popup-picker :title="teamName" :data="teamNameData"-->
                                          <!--@on-show="showTeam" v-model="teamNameValue" show-name></popup-picker>-->
                        <!--</group>-->
                        <!--&lt;!&ndash;<dd>&ndash;&gt;-->
                        <!--&lt;!&ndash;<p class="td">公司</p>&ndash;&gt;-->
                        <!--&lt;!&ndash;<p class="td tr"><span class="after">上海分公司</span></p>&ndash;&gt;-->
                        <!--&lt;!&ndash;</dd>&ndash;&gt;-->
                        <!--&lt;!&ndash;<dd>&ndash;&gt;-->
                        <!--&lt;!&ndash;<p class="td">项目</p>&ndash;&gt;-->
                        <!--&lt;!&ndash;<p class="td tr"><span class="after">回龙观大街</span></p>&ndash;&gt;-->
                        <!--&lt;!&ndash;</dd>&ndash;&gt;-->
                        <!--&lt;!&ndash;<dd>&ndash;&gt;-->
                        <!--&lt;!&ndash;<p class="td">班组</p>&ndash;&gt;-->
                        <!--&lt;!&ndash;<p class="td tr"><span class="after">攻壳小组</span></p>&ndash;&gt;-->
                        <!--&lt;!&ndash;</dd>&ndash;&gt;-->
                        <!--<dt><i class="button" @click="selectData">确定</i></dt>-->
                    <!--</dl>-->
                <!--</div>-->
            <!--</popup>-->
        <!--</div>-->
    </header>
    <!--header end-->
</template>

<script>
  import {TransferDom, Popup, Group, PopupPicker} from 'vux'
  export default {
    props: ['title'],
    directives: {
      TransferDom
    },
    components: {
      Popup,
      Group,
      PopupPicker
    },
    data () {
      return {
//        showFilter: false,
//        companyName: '公司',
//        companyNameData: [],
//        companyNameValue: [],
//        projectName: '项目',
//        projectNameData: [],
//        projectNameValue: [],
//        teamName: '班组',
//        teamNameData: [],
//        teamNameValue: [],
        back: this.$route.path.indexOf('index') === -1
      }
    },
    methods: {
      goback: function () {
        window.history.go(-1)
      }
//      filter: function () {
//        this.showFilter = !this.showFilter
//      },
//      showCompany () {
//        this.companyNameData = []
//        this.post('/LaborManage/appcommon/appOrgList.htm', {}, function (result) {
//          if (result != null && result.length > 0) {
//            let companys = []
//            result.forEach(function (item) {
//              let company = {
//                name: item.orgname,
//                value: item.orgid == null ? '' : item.orgid
//              }
//              companys.push(company)
//            })
//            this.companyNameData.push(companys)
//          } else {
//            this.toastShow('text', '没有找到公司记录')
//          }
//        }.bind(this))
//      },
//      showProject () {
//        this.projectNameData = []
//        let param = {
//          org_id: this.companyNameValue[0] || ''
//        }
//        if (param.org_id === '') {
//          this.toastShow('text', '请选择一个公司')
//          return
//        }
//        this.post('/LaborManage/appcommon/appProjectList.htm', param, function (result) {
//          if (result != null && result.length > 0) {
//            let projects = []
//            result.forEach(function (item) {
//              let project = {
//                name: item.project_name,
//                value: item.id == null ? '' : item.id
//              }
//              projects.push(project)
//            })
//            this.projectNameData.push(projects)
//          } else {
//            this.toastShow('text', '没有找到项目记录')
//          }
//        }.bind(this))
//      },
//      showTeam () {
//        this.teamNameData = []
//        let param = {
//          project_id: this.projectNameValue[0] || ''
//        }
//        if (param.project_id === '') {
//          this.toastShow('text', '请选择一个项目')
//          return
//        }
//        this.post('/LaborManage/appcommon/appTeamList.htm', param, function (result) {
//          if (result != null && result.length > 0) {
//            let teams = []
//            result.forEach(function (item) {
//              let team = {
//                name: item.team_name,
//                value: item.id == null ? '0' : item.id
//              }
//              teams.push(team)
//            })
//            this.teamNameData.push(teams)
//          } else {
//            this.toastShow('text', '没有找到班组记录')
//          }
//        }.bind(this))
//      },
//      selectData: function () {
//        let param = {
//          org_id: this.companyNameValue[0] || '',
//          project_id: this.projectNameValue[0] || '',
//          labor_team: this.teamNameValue[0] || ''
//        }
//        if (param.org_id === '') {
//          this.toastShow('text', '请选择一个公司')
//          return
//        }
//        if (param.project_id === '') {
//          this.toastShow('text', '请选择一个项目')
//          return
//        }
//        if (param.labor_team === '') {
//          this.toastShow('text', '请选择一个班组')
//          return
//        }
//        this.filter()
//      },
//      changeCompany (val) {
//        if (val !== this.companyNameValue) {
//          console.log('val change', val)
//          this.projectNameData = []
//          this.teamNameData = []
//        }
//      },
//      changeProject (val) {
//        if (val !== this.projectNameValue) {
//          console.log('val change', val)
//          this.teamNameData = []
//        }
//      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../less/site.css";
</style>
