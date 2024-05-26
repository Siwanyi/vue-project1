<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active">
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="待支付" name="payment"></van-tab>
      <van-tab title="待发货" name="delivery"></van-tab>
      <van-tab title="待收货" name="received"></van-tab>
      <van-tab title="待评价" name="comment"></van-tab>
    </van-tabs>

    <OrderListItem v-for="item in orderList" :key="item.order_id" :item="item"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrder } from '@/api/order'
export default {
  name: 'my-order',
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      orderList: []
    }
  },
  components: {
    OrderListItem
  },
  methods: {
    async getOrderList () {
      const { data: { list } } = await getMyOrder(this.active, this.page)
      list.data.forEach((item) => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.orderList = list.data
    }
  },
  // 监视tab栏的变化，tab栏滑动了就重新发请求获取相关数据
  watch: {
    active: {
      immediate: true,
      handler () {
        this.getOrderList()
      }
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
