import request from './network.js'

// get请求示例
export function getExample() {
  return request({
    url: 'api/test.ashx?action=getExample'
  })
}

// post请求示例
export function postExample(data) {
  return request({
    url: 'api/test.ashx?action=postExample',
    method: 'post',
    data: data
  })
}