import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward'
}
export default new Vuex.Store({
  state,
  mutations: {
    updateLoadingStatus (state, status) {
      state.isLoading = status
    },
    updateDirection (state, direction) {
      state.direction = direction
    }
  }
})
