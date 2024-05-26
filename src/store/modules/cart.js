import { getCartList, updateCart, deletePro } from '@/api/cart'
import { Toast } from 'vant'

// 购物车模块
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 所有商品的累加数量
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return (getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0)).toFixed(2)
    },
    // 全选中
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      // 找到ID对应的商品
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked // 取反
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    // 本地更新数量
    updateCount (state, obj) {
      const { goodsId, goodsNum } = obj
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    // 异步获取请求
    async getCartAction (context) {
      const { data } = await getCartList()
      // 为每个商品添加一个选中状态信息
      data.list.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartList', data.list)
    },
    async changeProCount (context, obj) {
      const { goodsId, goodsSkuId, goodsNum } = obj
      // 本地修改
      context.commit('updateCount', { goodsId, goodsNum })
      await updateCart(goodsId, goodsSkuId, goodsNum)
    },
    async deleteCart (context) {
      const cartIds = context.getters.selCartList.map(item => item.id)
      await deletePro(cartIds)
      Toast('删除成功')

      // 本地更新， 重新拉取购物车信息
      context.dispatch('getCartAction')
    }
  }
}
