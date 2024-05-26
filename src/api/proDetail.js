import request from '@/utils/request'
// 获取商品信息
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
// 获取商品评价
export const getProComments = (obj) => {
  const { goodsId, limit } = obj
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
