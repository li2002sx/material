<template>
  <section>
    <div v-transfer-dom>
      <previewer :list="showList" ref="previewer" :options="options"></previewer>
    </div>
    <div v-title data-title="车型库"></div>
    <div class="featuremod">
      <div :style="{backgroundImage:'url('+template.bgPicUrl+')'}"></div>
      <div style="background-image:url(http://img5.mtime.cn/mg/2017/08/03/133509.47434915.jpg)"></div>
      <div style="background-image:url(http://img5.mtime.cn/mg/2017/08/03/135659.23967868.jpg)"></div>
    </div>
    <!--颜色  -->
    <div class="colormod" v-if="modules.length>0">
      <div class="colorlist">
        <dl class="layout">
          <dd class="td" v-for="(item, index) in modules[0].carModuleInfos">
            <img :src="item.picUrl" />
            <p style="font-size: 26px;">
              <i :style="{backgroundColor:item.color}"></i>{{item.title}}</p>
          </dd>
        </dl>
      </div>
      <div class="btnbox">
        <button class="btnred" v-if="userCarInfoId==undefined" @click="useTemplate()">使用此模板</button>
        <button class="btnred" v-else @click="toUrl('/my/carinfo/'+carModelId+'/'+userCarInfoId)">联系我</button>
      </div>
    </div>
    <!--颜色  -->
    <!--图片  -->
    <div class="imgmod">
      <div v-if="modules.length>1">
        <h4 :style="{color:modules[1].color,fontSize:modules[1].fontSize+'px'}">{{modules[1].title}}</h4>
        <div class="imgslider">
          <!-- 图片轮播占位 -->
          <swiper loop auto height="375px" dots-position="center" dots-class="imgdot" :show-dots="false">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in modules[1].carModuleInfos" :key="index">
              <img class="previewer-demo-img" :src="item.picUrl" @click="show(index)">
            </swiper-item>
          </swiper>
          <!-- <p class="imgdot">
                                                      <i class="on"></i>
                                                    </p> -->
        </div>
      </div>
      <div v-if="modules.length>2">
        <h4 :style="{color:modules[2].color,fontSize:modules[2].fontSize+'px'}">{{modules[2].title}}</h4>
        <div class="imglist">
          <dl>
            <dt>
              <img class="previewer-demo-img" :src="modules[2].carModuleInfos[0].picUrl" @click="show(modules[1].carModuleInfos.length + 0)" />
            </dt>
            <dd>
              <span>
                <img class="previewer-demo-img" :src="modules[2].carModuleInfos[1].picUrl" @click="show(modules[1].carModuleInfos.length + 1)" />
              </span>
              <span>
                <img class="previewer-demo-img" :src="modules[2].carModuleInfos[2].picUrl" @click="show(modules[1].carModuleInfos.length + 2)" />
              </span>
            </dd>
            <dt>
              <img class="previewer-demo-img" :src="modules[2].carModuleInfos[3].picUrl" @click="show(modules[1].carModuleInfos.length + 3)" />
            </dt>
            <dd>
              <span>
                <img class="previewer-demo-img" :src="modules[2].carModuleInfos[4].picUrl" @click="show(modules[1].carModuleInfos.length + 4)" />
              </span>
              <span>
                <img class="previewer-demo-img" :src="modules[2].carModuleInfos[5].picUrl" @click="show(modules[1].carModuleInfos.length + 5)" />
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <!--图片  end  -->
    <!-- link -->
    <div class="linkmod">
      <div v-if="modules.length>3">
        <h4 :style="{color:modules[3].color,fontSize:modules[3].fontSize+'px'}">{{modules[3].title}}</h4>
        <div class="linkbox">
          <p v-for="(item, index) in modules[3].carModuleInfos">
            <img :src="item.picUrl" @click="link(item.url)">
          </p>
        </div>
      </div>
      <div v-if="modules.length>4">
        <h4 :style="{color:modules[4].color,fontSize:modules[4].fontSize+'px'}">{{modules[4].title}}</h4>
        <div class="linkbox">
          <p v-for="(item, index) in modules[4].carModuleInfos">
            <img :src="item.picUrl" @click="link(item.url)">
          </p>
        </div>
      </div>
    </div>
    <!--link end  -->
  </section>
</template>

<script>
import { cookie, Swiper, SwiperItem, Previewer, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    cookie,
    Swiper,
    SwiperItem,
    Previewer
  },
  data () {
    return {
      carModelId: this.$route.params.carModelId,
      userCarInfoId: this.$route.params.infoId,
      carModel: {},
      template: {},
      modules: [],
      showList: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
        }
      }
    }
  },
  created () {
    this.getTemplateInfo()
  },
  computed: {},
  mounted () {

  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    },
    shareInfo () {
      let title = this.carModel.modelsName
      let desc = title
      let imgUrl = this.carModel.picUrl
      document.title = title
      this.wxShare(title, desc, imgUrl, location.href)
    },
    useTemplate () {
      let that = this
      if (this.isLogin() === true) {
        this.get('/rest/user/vip', {}, function (result) {
          if (result.status === 1) {
            this.$router.push('/my/editcar/' + this.carModelId + '/0')
          } else {
            this.$vux.confirm.show({
              title: '提示',
              content: result.message,
              confirmText: '去开通',
              onConfirm () {
                that.toUrl('/my/vip')
              }
            })
          }
        }.bind(this))
      } else {
        this.$vux.confirm.show({
          title: '提示',
          content: '请您先登录',
          confirmText: '去登陆',
          onConfirm () {
            that.toUrl('/login')
          }
        })
      }
    },
    getTemplateInfo () {
      let param = {
        carModelId: 1
      }
      this.get('/rest/carmodel/info', param, function (result) {
        if (result.status === 1) {
          this.carModel = result.carModel
          this.template = result.carModelTemplate
          this.modules = result.carModelModules
          let param
          for (var i = 1; i < 3; i++) {
            for (let info of this.modules[i].carModuleInfos) {
              param = {
                src: info.picUrl,
                w: 750,
                h: 375
              }
              this.showList.push(param)
            }
          }
          this.shareInfo()
        } else {
          this.toastShow('text', result.message)
        }
      }.bind(this))
    },
    link (url) {
      if (url.indexOf('http://') > -1) {
        location.href = url
      } else if (url.length > 0) {
        this.$router.push(url)
      }
    }
  }
}
</script>

<style scoped>
@import "../../style-router/feature.css";
body {
  background-color: #000;
}
</style>
