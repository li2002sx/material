<template>
    <section class="child_page">
        <headerTop title="工人照片录入"></headerTop>
        <!--info-->
        <div class="listmod">
            <dl>
                <selectForm @selectFormData="getSelectFormData"></selectForm>
                <selectType title="照片类型" code="Ptype" @selectType="getSelectType"></selectType>
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
  import selectPic from '../../components/SelectPic.vue'
  export default {
    components: {
      headerTop,
      selectForm,
      selectType,
      selectPic
    },
    data () {
      return {
        companyId: '',
        projectId: '',
        teamId: '',
        personId: '',
        photoType: '',
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
        formdata.append('person_id', 'ad65186df2ae40079beccc97d757ec6b')
        formdata.append('p_type', '01')
        formdata.append('testdoc', this.files[0], this.files[0].name)

        this.postForm('/LaborManage/apppersonPhoto/add', formdata, function (result) {
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

    .fileInput {
        position: absolute;
        left: 330px;
    }
</style>
