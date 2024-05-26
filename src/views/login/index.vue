<template>
  <div class="login">
    <!-- 头部 NavBar-->
    <van-nav-bar
     title="会员登录"
     left-arrow
     @click-left="$router.back()"
    />
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" name="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" name="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <!-- 条件渲染图片验证码，点击验证码重新发请求 -->
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" name="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{ seconds === totalSeconds ? '获取验证码' : seconds + '秒后重新发送' }}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
// 导入请求模块
// import request from '@/utils/request'
import { codeLogin, getMsgCode, getPic } from '@/api/login'

export default {
  name: 'my-login',
  data () {
    return {
      mobile: '', // 手机号码
      picUrl: '', // 储存图形验证码地址
      picKey: '', // 储存图形验证码唯一标识
      picCode: '', // 用户输入的验证码
      msgCode: '', // 手机验证码
      totalSeconds: 60, // 倒计时总秒数
      seconds: 60, // 当前秒数
      timer: null // 定时器ID
    }
  },
  // 页面关闭时清除定时器
  async created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPic()
      this.picUrl = base64
      this.picKey = key
    },
    async getCode () {
      // 判断手机号和图形验证码有没有输入正确
      if (!this.validFn()) {
        return
      }
      // 在没有定时器开着且当前秒数和总秒数相等时，开启定时器
      if (!this.timer && this.seconds === this.totalSeconds) {
        // 发送请求
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('发送成功，请注意查收')
        console.log(res)
        // 开启定时器
        this.timer = setInterval(() => {
          this.seconds--
          // 当前秒数减到0时复位
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            this.seconds = 60
            this.timer = null
          }
        }, 1000)
      }
    },
    // 校验函数
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入图形验证码')
        return false
      }
      return true
    },
    // 登录函数
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      // 请求成功后将token和user信息存入user模块
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      // 判断是从哪里跳转到登录页的，登陆成功后又跳转到哪里
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}

</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
