import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  book: null,
  bookFilter: null,
  gender: null,
  genderFilter: null,
  editor: null,
  editorFilter: null,
  author: null,
  authorFilter: null,
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
