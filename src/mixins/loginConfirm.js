export default {
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        // 弹框提醒
        this.$dialog.confirm({
          title: '温馨提示',
          message: '您需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 确认 跳转登录 路由传参
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // 取消
          })
        return true
      }
      return false
    }
  }
}
