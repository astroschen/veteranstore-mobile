import { setItem, getItem } from '@/plugins/util/store'
const state = {
  tabbar: getItem('tabbar') || 'home'
}

const mutations = {
  CHANGE: (state, { key, value }) => {
    if (key === 'tabbar') {
      setItem('tabbar', value)
    }
    state[key] = value
  },
  DEL: (state, { key }) => {
    if (key === 'tabbar' && Object.prototype.hasOwnProperty.call(state, key)) {
      delete state[key]
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}