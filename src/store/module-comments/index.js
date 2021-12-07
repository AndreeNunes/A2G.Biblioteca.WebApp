import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  comments: null,
  commentsFilter: null,
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
