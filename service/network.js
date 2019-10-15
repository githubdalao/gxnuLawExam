import { baseURL, responseCode } from './config.js'
import { doLogin } from '../utils/util.js'
var app = getApp()
export default function(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      header: {
        'content-type': options.contentType || 'application/x-www-form-urlencoded',
        "token": app.globalData.token || ''
      },
      data: options.data || {},
      success: res => {
        if (res.statusCode != responseCode.ok){
          reject({ code: res.statusCode, msg: res.errMsg, data: null})
        }
        if (res.data.code != responseCode.ok){
          // 如果是1001错误，要重新执行登录操作
          if (res.data.code === responseCode.authFail){
            doLogin();
          }
          reject(res.data)
        }
        resolve(res.data)
      },
      fail: err => {
        reject({ code: responseCode.wxReqFail, msg: err.errMsg, data: null})
      }
    })
  })
}