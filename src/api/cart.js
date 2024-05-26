import request from '@/utils/request'
// 加入购物车发请求
export const addCart = (obj) => {
  const { goodsId, goodsNum, goodsSkuId } = obj
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品的数量
export const updateCart = (goodsId, goodsSkuId, goodsNum) => {
  return request.post('/cart/update', {
    goodsId,
    goodsSkuId,
    goodsNum
  })
}

// 删除购物车商品
export const deletePro = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
