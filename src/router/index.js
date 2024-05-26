import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import ClassList from '@/views/layout/classlist'
import Shoppingcart from '@/views/layout/shoppingcart'
import User from '@/views/layout/user'
import store from '@/store'
// 异步组件改造
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProductDetail = () => import('@/views/product-detail')
const Pay = () => import('@/views/pay')
const Myorder = () => import('@/views/myorder')

Vue.use(VueRouter)

const routes = [
  // 一级路由配置
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    // 二级路由配置
    children: [
      { path: '/home', component: Home },
      { path: '/classlist', component: ClassList },
      { path: '/shoppingcart', component: Shoppingcart },
      { path: '/user', component: User }
    ]
  },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList },
  // 配置动态路由传参
  { path: '/productDetail/:id', component: ProductDetail },
  { path: '/pay', component: Pay },
  { path: '/myorder', component: Myorder }
]

const router = new VueRouter({
  routes
})
// 设置路由导航前置守卫
// 定义权限页面
const authUrls = ['/pay', '/myorder'] // 后面需要可继续添加
router.beforeEach((to, from, next) => {
  // 判断是否是权限页面
  if (!authUrls.includes(to.path)) { // 不是权限页面
    next()
    return
  }
  // 是权限页则需要判断token
  // 获取token
  const token = store.state.user.userInfo.token
  if (!token) {
    next('/login')
  } else {
    next()
  }
})

export default router
