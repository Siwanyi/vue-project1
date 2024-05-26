// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'
// 1.获取图形验证码
// 定义并导出图形验证码请求函数
export const getPic = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}
// 手机验证码登录
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: [],
      mobile,
      smsCode
    }
  })
}
