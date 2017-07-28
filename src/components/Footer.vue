<template>
    <section>
        <!--<tabbar>-->
        <!--<tabbar-item link="/company/list">-->
        <!--<span slot="label">首页</span>-->
        <!--</tabbar-item>-->
        <!--<tabbar-item show-dot link="/stat/staff">-->
        <!--<span slot="label">现场管理</span>-->
        <!--</tabbar-item>-->
        <!--<tabbar-item link="/attend/ledger">-->
        <!--<span slot="label">统计分析</span>-->
        <!--</tabbar-item>-->
        <!--</tabbar>-->
        <!--menu-->
        <div class="menu">
            <dl class="layout">
                <dd class="td" :class="{on:tab==0}" @click="mainMenu(0)"><i class="ico-home"></i>
                    <p>首页</p>
                </dd>
                <dd class="td" :class="{on:tab==1}" @click="mainMenu(1)"><i class="ico-site"></i>
                    <span class="redpoint">9</span>
                    <p>现场管理</p>
                </dd>
                <dd class="td" :class="{on:tab==2}" @click="mainMenu(2)"><i class="ico-analy"></i>
                    <p>统计分析</p>
                </dd>
            </dl>
        </div>
        <!--menu end-->
    </section>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  export default {
    props: ['tab'],
    components: {
      Tabbar,
      TabbarItem
    },
    methods: {
      mainMenu: function (value) {
        let url = '/index'
        value = parseInt(value) || 0
        switch (value) {
          case 1:
            url = '/scene/index'
            break
          case 2:
            url = '/stat/index'
            break
        }
        this.$router.push(url)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
