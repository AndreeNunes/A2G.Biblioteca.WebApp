import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  users: null,
  usersFilter: null,
  book: null,
  bookFilter: null,
  
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
