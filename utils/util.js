import {
    postLogin,
    getUerMesage
} from '../service/common.js'

import { responseCode } from '../service/config'

const app = getApp()

// 时间比较
export function compareTime(time) {
    const curTime = new Date();
    time = new Date(time);
    return curTime > time;
}

// 随机打乱一个数组
export function randomArray(arr){
    arr.sort(function(a,b){
        return Math.random() > .5 ? -1 : 1;
    });
    return arr;
}

// 日期格式化函数
export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
//用户登陆函数
export function userLogin() {
    // 判断缓存中是否有token
    const token = wx.getStorageSync('token')
    if (token == null) {
        doLogin();
    } else {
        // 校验session
        wx.checkSession({
            success() {
                console.log('session_key 未过期,token=' + token)
                // 获取用户信息
                app.globalData.token = token;
                // 获取服务端用户信息
                getUerMesage().then(res => {
                    app.globalData.userMessage = res.data;
                    // 跳转到首页
                    wx.reLaunch({
                        url: '/pages/common/index/index'
                    })
                }).catch(err => {
                    console.log('userMe', err)
                })
            },
            fail() {
                // session_key 已经失效，需要重新执行登录流程
                console.log('session_key已过期')
                doLogin();
            }
        })
    }
}

// 登录操作
export function doLogin() {
    // 微信端登录
    wx.login({
        success: function (res) {
            console.log('微信端登录成功', res.code)
            let loginCode = {
                code: res.code
            }
            // 服务端登录
            postLogin(loginCode).then(res => {
                console.log(res, '服务端登录登录成功，token=' + res.data.token)
                wx.setStorageSync('token', res.data.token)
                app.globalData.userMessage = res.data.userInfo;
                app.globalData.token = res.data.token;
                // 跳转到首页
                wx.reLaunch({
                    url: '/pages/common/index/index'
                })
            }).catch(err => { //登录失败
                console.log(err, "服务端登录登录失败")
                // 如果错误码为1005，没有绑定账号，跳转到账号登录界面
                if (err.code === responseCode.accountNotBind) {
                    wx.reLaunch({
                        url: "/pages/common/login/login?oId=" + err.data.openId
                    })
                }
            })
        },
        fail: function () {
            console.log('微信端登录失败')
        }
    })
}
