import request from './network.js'

// 登录
export function postLogin(code) {
  return request({
    url: 'api/Public/User.ashx?action=login',
    method: 'post',
    data: code
  })
}

// 账号绑定
export function postBind(data) {
  return request({
    url: 'api/Public/User.ashx?action=bind',
    method: 'post',
    data: data
  })
}

//获取用户信息
export function getUerMesage(){
  return request({
    url: 'api/Public/User.ashx?action=getUserInfo'
  })
}
// 获取消息列表
export function getMessageList({ uid }) {
  return request({
    url: `api/Public/Message.ashx?action=getList&uid=${uid}`
  })
}
// 修改消息
export function updateMessage(data) {
  return request({
    url: `api/Public/Message.ashx?action=update`,
    method: "post",
    data: data
  })
}