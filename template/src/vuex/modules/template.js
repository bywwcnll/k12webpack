// import * as api from '../../api'
// import { request } from '../../utils/util'

const state = {
  tmp: {}
}

const getters = {

}

const actions = {
  async setTmp ({commit, state}, data) {
    commit('COMMON_SET_TMP', data)
  }
}

const mutations = {
  COMMON_SET_TMP (state, data) {
    state.tmp = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
