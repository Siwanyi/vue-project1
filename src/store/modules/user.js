import { setInfo } from '@/utils/storage'
export default {
  // 开启命名空间
  namespaced: true,
  state: {
    userInfo: {
      token: '',
      userID: ''
    }
  },
  getters: {
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      // 清空用户信息
      context.commit('setUserInfo', {})
      // 清空购物车信息
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  modules: {
  }
}
