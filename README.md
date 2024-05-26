# smrat-shop

## Project introduction
该项目包含完整的电商购物流程，即用户在商城首页搜索商品，进入商品列表页，挑选商品加入购物车，加购前要求用户注册或登录账号，登录后可在购物车页面选择商品购买，进入订单结算，最后提交支付，支付完成后可进行订单查询。在模拟平台发货后，可进行订单收货与评价。

技术栈：Vue2 + VueCli（webpack） + Vant-ui + axios

功能实现：
（1）Vue2框架下，借助Vant-ui组件完成各个页面的搭建。利用vue-router相关技术实现页面路由的配置，并设置路由懒加载进行优化。
（2）axios二次封装，利用封装的方法完成api请求模块的封装，实现了各页面的请求。
（3）使用vuex做数据状态管理，完成store模块的设计，并封装一个存储模块实现持久化。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
