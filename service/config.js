const baseURL = 'http://121.31.112.186:8497/';

// 全局返回的状态码
const responseCode = {
  ok: 200, // 成功
  serverError: 500, // 服务端内部错误
  authFail: 1001, // 接口认证失败
  wxReqFail: 1002, // wx.request()请求fail
  accountNotBind: 1005, // 没有绑定账号信息
  serverReqFail: 1006 // 服务端请求出错
}

export {
  baseURL,
  responseCode
}
