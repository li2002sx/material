<template>
  <section>
    <div v-title data-title="添加修改共享车源"></div>
    <!--mybox  -->
    <div class="mysharebox">
      <!-- <div class="addshare">
                          选择模板
                        </div> -->
      <div class="addshared">
        <div class="sharelist">
          <dl>
            <dd>
              <img :src="carModel.picUrl" />
            </dd>
            <dt class="layout">
              <h3 class="td">{{carModel.modelsName}}</h3>
              <span class="td tr">{{carModel.specName}}</span>
            </dt>
          </dl>
        </div>
      </div>
      <!--addinfo  -->
      <div class="addshareinfo">
        <dl>
          <dd>
            <label>价格 （万元）</label>
            <input type="text" class="inputxt" placeholder="请输入价格" v-model="userCarInfo.price" />
          </dd>
          <dd>
            <label>配置</label>
            <textarea placeholder="请输入配置信息" v-model="userCarInfo.configure"></textarea>
          </dd>
          <dd>
            <label>车架号</label>
            <input type="text" class="inputxt" placeholder="请输入车架号" v-model="userCarInfo.frame" />
          </dd>
          <dd>
            <label>备注</label>
            <input type="text" class="inputxt" placeholder="请输入备注" v-model="userCarInfo.remark" />
          </dd>
          <dt>
            <button class="btnred" @click="save">保存</button>
          </dt>
        </dl>
      </div>
      <!--addinfo end  -->
    </div>
    <!--mybox end  -->
  </section>
</template>

<script>
import { cookie } from 'vux'

export default {
  components: {
    cookie
  },
  data () {
    return {
      carModelId: this.$route.params.carModelId,
      userCarInfoId: this.$route.params.infoId,
      carModel: {},
      userCarInfo: {},
      user: {}
    }
  },
  created () {
    this.getUserCarInfo()
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    getUserCarInfo () {
      let param = {
        carModelId: this.carModelId,
        userCarInfoId: this.userCarInfoId
      }
      this.get('/rest/usercar/info', param, function (result) {
        if (result.status === 1) {
          this.carModel = result.carModel
          this.userCarInfo = result.userCarInfo
          this.user = result.user
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    save () {
      let price = this.userCarInfo.price
      if (price === null) {
        this.toastShow('text', '价格不能为空')
        return
      }

      let configure = this.userCarInfo.configure
      if (configure === null || configure.length < 5) {
        this.toastShow('text', '配置信息不能为空')
        return
      }
      this.userCarInfo.userCarInfoId = this.userCarInfoId
      this.userCarInfo.carModelId = this.carModel.carModelId
      this.userCarInfo.createTime = null
      this.userCarInfo.carModel = {}

      this.post('/rest/usercar/save', this.userCarInfo, function (result) {
        if (result.status === 1) {
          this.toastShow('success', '操作成功')
          this.toUrl('/my/car')
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    }
  }
}
</script>

<style>
@import "../../style-router/my.css";
</style>
