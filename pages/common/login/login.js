// pages/login/login.js
import {
    postBind
} from '../../../service/common.js';
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        numFalse: false,
        numEmpty: false,
        isSubmit: false,
        openId: '',
        role: '',
        show: false,
        columns: ['学生', '教师', '管理员']
    },
    showPopup() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false
        });
    },
    onConfirm(event) {
        this.setData({
            show: false,
            role: event.detail.value
        })
    },

    onCancel() {
        this.setData({
            show: false
        })
    },
    //下拉获取值
    getDate: function (e) {
        if (e.detail.text == '学生') {
            this.setData({
                role: 'student'
            })
        } else if (e.detail.text == '教师') {
            this.setData({
                role: 'teacher'
            })
        }
        if (e.detail.text == '管理员') {
            this.setData({
                role: 'admin'
            })
        }
    },

    //账号绑定
    formSubmit: function (e) {
        var that = this
        var role
        if (this.data.role == "学生") {
            role = "student"
        } else if (this.data.role == "教师") {
            role = "teacher"
        } else {
            role = "admin"
        }
        that.setData({
            numEmpty: false,
            numFalse: false,
        })
        if (e.detail.value.num == '' || e.detail.value.pwd == '' || role == '') {
            that.setData({
                numEmpty: true,
            })
            return;
        } else {
            let bindData = {
                openId: that.data.openId,
                account: e.detail.value.num,
                pwd: e.detail.value.pwd,
                role: role
            }
            console.log(bindData)
            wx.showLoading({
                title: '登陆中',
                duration: 200
            })
            postBind(bindData).then(res => {
                console.log(res)

                wx.setStorageSync('token', res.data.token)
                app.globalData.userMessage = res.data.userInfo;
                app.globalData.token = res.data.token;
                // 跳转到首页
                wx.reLaunch({
                    url: '/pages/common/index/index'
                })

            }).catch(err => {
                console.log(err)
                that.setData({
                    numFalse: true
                })
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            openId: options.oId
        })
        // session_key 已经失效，需要重新执行登录流程
        //重新登录

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})