import request from '@/utils/request'

// 订单结算确认

// 购物车结算：obj={cartIds}，
// 立即购买： obj={goodsId， goodsNum, goodsSkuId}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // 购物车结算  立即购买
      delivery: 10, // 快递配送， 20 门店自提
      couponId: 0, // 优惠券ID
      isUsePoints: 0, // 是否使用积分
      ...obj // 将传递过来的对象自定义展开
    }
  })
}

// 订单提交
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    ...obj
  })
}

// 获取订单列表
export const getMyOrder = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
