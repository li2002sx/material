<template>
    <section>
        <headerTop title="现场管理"></headerTop>
        <!--menu-->
        <div class="menu">
            <dl class="layout">
                <dd class="td"><i class="ico-home"></i>
                    <p>首页</p>
                </dd>
                <dd class="td on"><i class="ico-site"></i>
                    <p>现场管理</p>
                </dd>
                <dd class="td"><i class="ico-analy"></i>
                    <p>统计分析</p>
                </dd>
            </dl>
        </div>
        <!--menu end-->
        <!--images-->
        <div class="slider">
            <swiper height="370px" loop auto :list="demo06_list" :index="demo06_index"
                    @on-index-change="demo06_onIndexChange"></swiper>
            <!--<dl class="layout" style="width:400%;">-->
            <!--<dd class="td">-->
            <!--<img src="/static/images/093553.23427772.jpg" alt="名称"/>-->
            <!--<div class="textbox">现场管理相关的banner图片</div>-->
            <!--</dd>-->
            <!--<dd class="td">-->
            <!--<img src="/static/images/093553.23427772.jpg" alt="名称"/>-->
            <!--<div class="textbox">现场管理相关的banner图片</div>-->
            <!--</dd>-->
            <!--</dl>-->
            <!--<span class="totalbox"><i class="on">1</i><i>2</i><i>3</i><i>4</i></span>-->
        </div>
        <!--images end-->
        <!--list-->
        <div class="indexlist">
            <dl>
                <dd class="layout" @click="toUrl(1)">
                    <span class="td"><i class="ico-01"></i></span>
                    <span class="td tr">工作照片录入</span>
                </dd>
                <dd class="layout" @click="toUrl(2)">
                    <span class="td"><i class="ico-02"></i></span>
                    <span class="td tr">违章举报</span>
                </dd>
                <dd class="layout" @click="toUrl(3)">
                    <span class="td"><i class="ico-03"></i></span>
                    <span class="td tr">任务发布</span>
                </dd>
                <dd class="layout" @click="toUrl(4)">
                    <span class="td"><i class="ico-04"></i></span>
                    <span class="td tr">投诉管理</span>
                </dd>
            </dl>
        </div>
        <!--list end-->
        <footerButtom tab="1"></footerButtom>
        <transition name="router-show">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
  import headerTop from '../../components/Header.vue'
  import footerButtom from '../../components/Footer.vue'
  import {Swiper} from 'vux'

  const baseList = [{
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/3.jpg',
    title: '送你一次旅行'
  }]

  export default {
    components: {
      headerTop,
      footerButtom,
      Swiper
    },
    data () {
      return {
        demo06_list: baseList,
        demo06_index: 0
      }
    },
    computed: {},
    methods: {
      demo06_onIndexChange (index) {
        this.demo06_index = index
      },
      toUrl: function (value) {
        let url = ''
        value = parseInt(value) || 0
        switch (value) {
          case 1:
            url = '/scene/photo'
            break
          case 2:
            url = '/scene/report'
            break
          case 3:
            url = '/scene/task'
            break
          case 4:
            url = '/scene/complaint'
            break
        }
        this.$router.push(url)
      }
    }
  }
</script>

<style>
    @import "../../less/site.css";
    .router-show-enter-active, .router-show-leave-active {
        transition: all .4s;
    }
    .router-show-enter, .router-show-leave-active {
        transform: translateX(100%)
    }
    .indexlist dl a {
        color: #fff;
    }
</style>
