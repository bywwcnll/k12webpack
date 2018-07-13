import * as api from '../../api'
import { request } from '../../utils/util'

const state = {

}

const getters = {

}

const actions = {
  async getCurrentUser ({commit, state}, data) {
    return request({
      url: api.getCurrentUser
    })
  }
}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
