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
        <!-- <tab :line-width=2 defaultColor="#333" active-color='#61a0f2' v-model="index">
          <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}
          </tab-item>
        </tab> -->
        <!-- list -->
        <dl class="classlist">
          <dd v-for="(item, index) in data.list" @click="toWork(item)">
              <div class="format">
                  <h3>{{item.title}}</h3>
                  <p>{{item.content}}</p>
                  <div class="editbox">
                      <b>{{item.currentStatus}}</b> <b>{{item.createDate}}</b>
                  </div>
              </div>
          </dd>
        </dl>
        <!-- list end -->
        <!-- <div class="bottom-tip" v-show="hasdata">
          <span class="loading-hook">加载中...</span>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import { cookie, Tab, TabItem, querystring } from 'vux'
// import BScroll from 'better-scroll'
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
      data: {}
    }
  },
  created () {
    this.getList()
  },
  filters: {
  },
  computed: {},
  mounted: function () { },
  methods: {
    getList () {
      let requestUrl = 'appData/app/getMessageList'
      let that = this
      this.get(requestUrl, null, function (result) {
        if (result.status === '1') {
          that.data = result.map
        } else {
          that.toastShow('text', result.message)
        }
      })
    },
    toWork (item) {
      let id = item.id
      let url = item.url
      let param = {
        id: id
      }
      let requestUrl = 'appData/app/messageDeal'
      let that = this
      that.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          let param = querystring.parse(url)
          let currentStatus = item.currentStatus.replace('审批', '')
          let user = that.getFieldByUseInfo().user
          let userRoleArr = user.roleNames.split(',')
          let urlKey = 'detail'
          if (userRoleArr.includes(currentStatus)) {
            urlKey = 'approve'
          }
          that.toWorkDetail(urlKey, param.procInsId, item.procType, param.taskId, item.billId)
        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>
