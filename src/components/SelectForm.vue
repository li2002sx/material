<template>
    <group title="">
        <popup-picker :title="companyName" :data="companyNameData"
                      @on-show="showCompany" v-model="companyNameValue" show-name
                      @on-change="changeCompany"></popup-picker>
        <popup-picker :title="projectName" :data="projectNameData"
                      @on-show="showProject" v-model="projectNameValue" show-name
                      @on-change="changeProject"></popup-picker>
        <popup-picker :title="teamName" :data="teamNameData"
                      @on-show="showTeam" v-model="teamNameValue" show-name
                      @on-change="changeTeam"></popup-picker>
        <popup-picker :title="personName" :data="personNameData"
                      @on-show="showPerson" v-model="personNameValue" show-name
                      @on-change="changePerson"></popup-picker>
    </group>
</template>

<script>
  import {TransferDom, Popup, Group, PopupPicker} from 'vux'
  export default {
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
        companyName: '公司',
        companyNameData: [],
        companyNameValue: [],
        projectName: '项目',
        projectNameData: [],
        projectNameValue: [],
        teamName: '班组',
        teamNameData: [],
        teamNameValue: [],
        personName: '工人',
        personNameData: [],
        personNameValue: [],
        formData: {}
//        back: this.$route.path.indexOf('index') === -1
      }
    },
    methods: {
//      goback: function () {
//        window.history.go(-1)
//      },
//      filter: function () {
//        this.showFilter = !this.showFilter
//      },
      showCompany () {
        this.companyNameData = []
        this.post('/LaborManage/appcommon/appOrgList.htm', {}, function (result) {
          if (result != null && result.length > 0) {
            let companys = []
            result.forEach(function (item) {
              let company = {
                name: item.orgname,
                value: item.orgid == null ? '' : item.orgid
              }
              companys.push(company)
            })
            this.companyNameData.push(companys)
          } else {
            this.toastShow('text', '没有找到公司记录')
          }
        }.bind(this))
      },
      showProject () {
        this.projectNameData = []
        let param = {
          org_id: this.companyNameValue[0] || ''
        }
        if (param.org_id === '') {
          this.toastShow('text', '请选择一个公司')
          return
        }
        this.post('/LaborManage/appcommon/appProjectList.htm', param, function (result) {
          if (result != null && result.length > 0) {
            let projects = []
            result.forEach(function (item) {
              let project = {
                name: item.project_name,
                value: item.id == null ? '' : item.id
              }
              projects.push(project)
            })
            this.projectNameData.push(projects)
          } else {
            this.toastShow('text', '没有找到项目记录')
          }
        }.bind(this))
      },
      showTeam () {
        this.teamNameData = []
        let param = {
          project_id: this.projectNameValue[0] || ''
        }
        if (param.project_id === '') {
          this.toastShow('text', '请选择一个项目')
          return
        }
        this.post('/LaborManage/appcommon/appTeamList.htm', param, function (result) {
          if (result != null && result.length > 0) {
            let teams = []
            result.forEach(function (item) {
              let team = {
                name: item.team_name,
                value: item.id == null ? '0' : item.id
              }
              teams.push(team)
            })
            this.teamNameData.push(teams)
          } else {
            this.toastShow('text', '没有找到班组记录')
          }
        }.bind(this))
      },
      showPerson () {
        let param = {
          project_id: this.projectNameValue[0] || ''
//          labor_team: this.teamNameValue[0] || ''
        }
        this.post('/LaborManage/person/findPersonList.htm', param, function (result) {
          if (result != null && result.length > 0) {
            let persons = []
            result.forEach(function (item) {
              let person = {
                name: item.name,
                value: item.id == null ? '0' : item.id
              }
              persons.push(person)
            })
            this.personNameData.push(persons)
          } else {
            this.toastShow('text', '没有找到工人记录')
          }
        }.bind(this))
      },
      changeCompany (val) {
        this.formData.companyId = val[0]
        this.$emit('selectFormData', this.formData)
        if (val !== this.companyNameValue) {
          console.log('val change', val)
          this.projectNameData = []
          this.teamNameData = []
          this.personNameData = []
        }
      },
      changeProject (val) {
        this.formData.projectId = val[0]
        this.$emit('selectFormData', this.formData)
        if (val !== this.projectNameValue) {
          console.log('val change', val)
          this.teamNameData = []
          this.personNameData = []
        }
      },
      changeTeam (val) {
        this.formData.teamId = val[0]
        this.$emit('selectFormData', this.formData)
        if (val !== this.teamNameValue) {
          console.log('val change', val)
          this.personNameData = []
        }
      },
      changePerson (val) {
        this.formData.personId = val[0]
        this.$emit('selectFormData', this.formData)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
