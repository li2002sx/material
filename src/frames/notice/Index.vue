<template>
  <section>
    <div v-title data-title="我的通知"></div>

    <div class="list-wrapper" ref="wrapper">
      <div>
        <!-- search -->
        <!-- <div class="indexsearch">
            <div class="searchmod cur">
                <input type="text" />
                <span>
                    <i class="ico-search"></i>
                    <em>搜索</em>
                </span>
            </div>
        </div> -->
        <!-- search end -->
        <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
          <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
          </tab-item>
        </tab>
        <!-- list -->
        <dl class="classlist" @click="toUrl('/notice/detail')">
          <dd>
              <div class="format">
                  <h3>关于启用办公自动化系统的通知</h3>
                  <p>建筑与土木工程是基本建设的重要工程领域，是研究和创造人类生活需求的形态环境和各类工程设施的……</p>
                  <div class="editbox">
                      <b>总经办</b> <b>2017-08-16</b>
                  </div>
              </div>
          </dd>
          <dd>
              <div class="format">
                  <h3>关于启用办公自动化系统的通知</h3>
                  <p>建筑与土木工程是基本建设的重要工程领域，是研究和创造人类生活需求的形态环境和各类工程设施的……</p>
                  <div class="editbox">
                      <b>总经办</b> <b>2017-08-16</b>
                  </div>
              </div>
          </dd>
          <dd>
              <div class="format">
                  <h3>关于启用办公自动化系统的通知</h3>
                  <p>建筑与土木工程是基本建设的重要工程领域，是研究和创造人类生活需求的形态环境和各类工程设施的……</p>
                  <div class="editbox">
                      <b>总经办</b> <b>2017-08-16</b>
                  </div>
              </div>
          </dd>
          <dd>
              <div class="format">
                  <h3>关于启用办公自动化系统的通知</h3>
                  <p>建筑与土木工程是基本建设的重要工程领域，是研究和创造人类生活需求的形态环境和各类工程设施的……</p>
                  <div class="editbox">
                      <b>总经办</b> <b>2017-08-16</b>
                  </div>
              </div>
          </dd>
          <dd>
              <div class="format">
                  <h3>关于启用办公自动化系统的通知</h3>
                  <p>建筑与土木工程是基本建设的重要工程领域，是研究和创造人类生活需求的形态环境和各类工程设施的……</p>
                  <div class="editbox">
                      <b>总经办</b> <b>2017-08-16</b>
                  </div>
              </div>
          </dd>
        </dl>
        <!-- list end -->
        <div class="bottom-tip" v-show="hasdata">
          <span class="loading-hook">加载中...</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { cookie, Tab, TabItem } from 'vux'
import BScroll from 'better-scroll'
export default {
  components: {
    cookie,
    Tab,
    TabItem
  },
  data () {
    return {
      list2: ['未读', '已读'],
      demo2: '未读',
      index: 0,
      cateId: parseInt(this.$route.params.cateId) || 0,
      searchKey: this.$route.params.searchKey,
      artis: [],
      pageIndex: 1,
      hasdata: false
    }
  },
  created () {
    // this.getArtis(this.cateId)
  },
  filters: {
    subStr: function (value, num) {
      return value.substr(0, num)
    },
    classStr: function (value) {
      return 'ico-' + value
    }
  },
  computed: {},
  mounted: function () { },
  methods: {
    initScroll () {
      let that = this
      this.$nextTick(() => {
        that.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
        // 滑动结束
        var bottomTip = document.querySelector('.loading-hook')
        that.scroll.on('touchend', function (position) {
          if (position.y < (this.maxScrollY - 0)) {
            bottomTip.innerText = '加载中...'

            // 恢复文本值
            // bottomTip.innerText = '查看更多'

            // 向列表添加数据
            if (that.hasdata) {
              that.getArtis(that.cateId)
            }
            // reloadData()
            // 加载更多后,重新计算滚动区域高度
            window.setTimeout(function () {
              that.scroll.refresh()
            }, 500)
          }
        })
      })
    },
    getArtis (treeId) {
      var param = {
        treeId: treeId,
        searchKey: this.searchKey,
        pageIndex: this.pageIndex
      }
      let that = this
      this.get('/rest/arti/list', param, function (result) {
        if (result.status === 1) {
          for (let item of result.artis) {
            that.artis.push(item)
          }
          if (that.pageIndex === 1 && result.artis.length > 0) {
            that.initScroll()
          }
          that.pageIndex++
          if (result.artis.length < 20) {
            that.hasdata = false
          } else {
            that.hasdata = true
          }
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    detailUrl (relatedType, artiId) {
      if (relatedType === 6) {
        this.toUrl('/arti/video/' + artiId)
      } else {
        this.toUrl('/arti/detail/' + artiId)
      }
    },
    loadImage () {
      let target = event.target
      this.drawImage(target, 226, 153)
    }
  }
}
</script>
