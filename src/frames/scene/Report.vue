<template>
    <section class="child_page">
        <headerTop title="违章举报"></headerTop>
        <!--info-->
        <div class="listmod">
            <dl>
                <selectForm @selectFormData="getSelectFormData"></selectForm>
                <selectType title="违章类型" code="wztl" @selectType="getSelectType"></selectType>
                <selectSingleDate title="违章日期" @selectSingleDate="getSelectSingleDate"></selectSingleDate>
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
  import selectType from '../../components/SelectType.vue'
  import selectSingleDate from '../../components/SelectSingleDate.vue'
  import selectPic from '../../components/SelectPic.vue'
  export default {
    components: {
      headerTop,
      selectForm,
      selectType,
      selectSingleDate,
      selectPic
    },
    data () {
      return {
        companyId: '',
        projectId: '',
        teamId: '',
        personId: '',
        photoType: '',
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
      getSelectType: function (value) {
        this.photoType = value || ''
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
        formdata.append('project_id', '8a17d73b46ea464bb6eb8986e9da2d47')
        formdata.append('team_id', '29cc1c6408824f538a874d9b739b8fe4')
        formdata.append('wztl_id', '9a693ff44243491892c6ffba412bbdbe')
        formdata.append('wzrq', '2017-07-10')
        formdata.append('imgs', this.files[0], this.files[0].name)

        this.postForm('/LaborManage/appwztl/add.htm', formdata, function (result) {
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
