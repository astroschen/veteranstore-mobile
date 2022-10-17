import { setItem, getItem, removeItem } from '@/plugins/util/store'
import { requestUserInfo } from '@/api/common/user'
const state = {
  // 保存token信息 先从本地获取
  access_token: getItem('access_token') || '',
  // 保存token过期时间
  token_expiry_at: getItem('token_expiry_at') || '',
  // 保存用户信息
  user: getItem('user') || {},
}

const mutations = {
  CHANGE: (state, { key, value }) => {
    /* if (key === 'user') {
      setItem('user', value)
    } */
    setItem(key, value)
    state[key] = value
  },
  DEL: (state, { key }) => {
    if (key === 'user' && Object.prototype.hasOwnProperty.call(state, key)) {
      delete state[key]
    }
  },
  REMOVE: (state, { key }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      delete state[key]
    }
    removeItem(key)
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE', data)
  },
  // 请求用户信息
  async RequestUserInfo ({ commit, dispatch }, param) {
    return new Promise((resolve, reject) => {
      requestUserInfo(param).then(resp => {
        const data = resp?.data || []
        if (data.length) {
          commit('CHANGE', { key: 'user', value: data[0] })
          if (data[0].S_TOKEN) {
            commit('CHANGE', { key: 'access_token', value: data[0].S_TOKEN })
          }
        }
        resolve(resp)
      }).catch(error => reject(error))
    })
  },
  Logout({commit, dispatch}, param){
    commit('REMOVE', { key: 'access_token' })
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}