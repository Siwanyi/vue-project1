<template>
  <div :include="['my-home', 'my-shoppingcart']">
    <!-- 二级路由展示区域 -->
    <keep-alive><router-view/></keep-alive>
    <!-- 路由出口设置 -->
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="shop-o">首页</van-tabbar-item>
      <van-tabbar-item to="/classlist" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/shoppingcart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'my-index',
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
