<template>
  <section>
    <!-- list -->
    <div class="expresslist">
        <dl>
            <dd :class="[index==0?'cur':'']" v-for="(item, index) in data.list">
                <h4>{{item.histActiActivityName}} {{item.assigneeName}}
                  <template v-if="index == data.list.length -1">提交申请</template>
                  <template v-else>审核</template>
                </h4>
                <div>{{item.comment}}</div>
                <p class="time">开始：{{item.histActiStartTime}}</p>
                <p class="time">结束：{{item.histActiEndTime}}</p>
                <p class="time" v-show="item.durationTime.length > 0">用时：{{item.durationTime}}</p>
            </dd>
        </dl>
    </div>
    <!-- list end -->
  </section>
</template>

<script>
import { Timeline, TimelineItem } from 'vux'

export default {
  directives: {

  },
  components: {
    Timeline,
    TimelineItem
  },
  data () {
    return {
      procId: this.$route.params.procId || '',
      data: {}
    }
  },
  created () {
    this.getHistories()
  },
  filters: {
  },
  computed: {},
  mounted () {

  },
  methods: {
    getHistories () {
      var param = {
        procInsId: this.procId
      }
      let requestUrl = 'appData/app/histoicFlowPage'
      let that = this
      this.get(requestUrl, param, function (result) {
        if (result.status === '1') {
          that.data = result.map
        } else {
          that.toastShow('text', result.message)
        }
      })
    }
  }
}
</script>

<style lang="less">

</style>

