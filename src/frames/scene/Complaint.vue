<template>
    <section class="child_page">
        <headerTop title="投诉管理"></headerTop>
        <!--info-->
        <div class="listmod">
            <dl>
                <selectForm @selectFormData="getSelectFormData"></selectForm>
                <selectSingleDate title="日期" @selectSingleDate="getSelectSingleDate"></selectSingleDate>
                <dd>
                    <p class="td">投诉内容<i class="c-chartred"></i></p>
                    <div class="td tr">
                        <p style="padding-bottom:15px;"><textarea id="content"></textarea></p>
                    </div>
                </dd>
                <selectPic @selectPicData="getSelectPic"></selectPic>
                <dt><i class="button" @click="saveData">提交</i></dt>
            </dl>
        </div>
        <!--info end-->
    </section>
</template>

<script>
  import headerTop from '../../components/Header.vue'
  import selectForm from '../../components/SelectForm.vue'
  import selectSingleDate from '../../components/SelectSingleDate.vue'
  import selectPic from '../../components/SelectPic.vue'
  export default {
    components: {
      headerTop,
      selectForm,
      selectSingleDate,
      selectPic
    },
    data () {
      return {
        companyId: '',
        projectId: '',
        teamId: '',
        personId: '',
        date: new Date(),
        files: [],
        images: []
      }
    },
    computed: {},
    methods: {
      getSelectFormData: function (data) {
        if (data !== null) {
          this.companyId = data.companyId || ''
          this.projectId = data.projectId || ''
          this.teamId = data.teamId || ''
          this.personId = data.personId || ''
        }
      },
      getSelectPic: function (data) {
        if (data !== null) {
          this.files = data.files || []
          this.images = data.images || []
        }
      },
      getSelectSingleDate: function (value) {
        this.date = value
      },
      saveData: function () {
        if (this.companyId === '') {
          this.toastShow('text', '请选择一个公司')
          return
        }
        if (this.projectId === '') {
          this.toastShow('text', '请选择一个项目')
          return
        }
        if (this.teamId === '') {
          this.toastShow('text', '请选择一个班组')
          return
        }
        if (this.personId === '') {
          this.toastShow('text', '请选择一个工人')
          return
        }
        if (this.photoType === '') {
          this.toastShow('text', '请选择一个照片类型')
          return
        }
//        let param = {
//          person_id: this.personId,
//          p_type: this.photoType,
//          imgs: this.images
//        }
        let formdata = new FormData()
        formdata.append('project_id', '')
        formdata.append('team_id', '')
        formdata.append('person_name', '')
        formdata.append('complain_time', '')
        formdata.append('complain_content', '')
        formdata.append('testdoc', this.files[0], this.files[0].name)

        this.postForm('/LaborManage/complain/add.htm', formdata, function (result) {
          if (result != null) {
            console.log(JSON.stringify(result))
          } else {
            this.toastShow('text', '操作错误')
          }
        }.bind(this))
      }
    }
  }
</script>

<style>
    @import "../../less/site.css";
</style>
