<template>
  <section>
    <div v-title data-title="选择模板"></div>

    <!--botbar  -->
    <dl class="mybotbar" v-show="userCarInfos.length > 0">
      <dd @click="editInfo">
        <i class="">编辑</i>
      </dd>
      <dd v-show="edit.length>0" class="tr" @click="deleteInfo">
        <i class="">删除</i>
      </dd>
    </dl>
    <!--botbar end  -->

    <!--mybox  -->
    <div class="mysharebox">
      <div class="addbox">
        <button class="btnred" @click="toUrl('/car/searchlist/0')">添加共享车源</button>
      </div>
      <!--null  -->
      <div class="nullbox" v-if="userCarInfos.length == 0">还没有车源信息~</div>
      <div v-else>
        <scroller ref="scroller" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="1100px" @on-pullup-loading="getUserCars">
          <div class="sharelist" :class="{edit:edit.length>0}">
            <dl v-for="(item, index) in userCarInfos" @click="select(item)">
              <dd>
                <img :src="item.carModel.picUrl" />
              </dd>
              <dt class="layout">
                <h3 class="td">{{item.carModel.modelsName}}</h3>
                <span class="td tr">{{item.carModel.specName}}加版</span>
              </dt>
            </dl>
          </div>
        </scroller>
      </div>
      <!--null end -->
    </div>
    <!--mybox end  -->
  </section>
</template>

<script>
import { cookie, Scroller, Spinner } from 'vux'
export default {
  components: {
    cookie,
    Scroller,
    Spinner
  },
  data () {
    return {
      edit: this.$route.params.edit || '',
      userCarInfos: [],
      infoIdMap: new Map(),
      pageIndex: 1,
      pullupStatus: 'default',
      pullupConfig: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '努力加载中...'
      }
    }
  },
  created () {
    this.getUserCars()
  },
  computed: {},
  mounted: function () {
  },
  methods: {
    select (item) {
      if (this.edit.length === 0) {
        this.$router.push('/car/template/' + item.carModelId + '/' + item.userCarInfoId)
      } else {
        let userCarInfoId = item.userCarInfoId
        let carModelId = item.carModelId
        if (this.infoIdMap.has(userCarInfoId)) {
          this.infoIdMap.delete(userCarInfoId)
          event.target.className = ''
        } else {
          this.infoIdMap.set(userCarInfoId, carModelId)
          event.target.className = 'on'
        }
      }
    },
    editInfo () {
      if (this.edit.length === 0) {
        this.$router.push('/my/car/eidt')
      } else {
        if (this.infoIdMap.size !== 1) {
          this.toastShow('text', '只能选择一个编辑')
        } else {
          let infoId = [...this.infoIdMap.keys()][0]
          this.$router.push('/my/editcar/' + this.infoIdMap.get(infoId) + '/' + infoId)
        }
      }
    },
    deleteInfo () {
      if (this.infoIdMap.size > 0) {
        let that = this
        this.$vux.confirm.show({
          title: '提示',
          content: '确定要删除吗？',
          confirmText: '删除',
          onConfirm () {
            let param = {
              userCarInfoIds: [...that.infoIdMap.keys()].join(',')
            }
            that.post('/rest/usercar/delete', param, function (result) {
              if (result.status === 1) {
                that.toastShow('success', '删除成功')
                document.querySelectorAll('.on').forEach(function (item) {
                  item.remove()
                })
              } else {
                that.toastShow('text', result.message)
              }
            })
          }
        })
      } else {
        this.toastShow('text', '至少选择一个删除')
      }
    },
    getUserCars (uuid) {
      let param = {
        pageIndex: this.pageIndex
      }
      this.get('/rest/usercar/list', param, function (result) {
        if (result.status === 1) {
          if (result.userCarInfos.length === 0) {
            if (this.pageIndex > 1) {
              this.$nextTick(() => {
                this.$refs.scroller.disablePullup()
              })
            }
          } else {
            this.pageIndex++
            for (let item of result.userCarInfos) {
              this.userCarInfos.push(item)
            }
            this.$nextTick(() => {
              this.$refs.scroller.reset()
              this.$refs.scroller.donePullup()
            })
          }
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
