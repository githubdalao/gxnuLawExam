// pages/teacher/infoChange/infoChange.js
import {
  postinfoChange
} from '../../../service/teacher.js';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //提交修改信息
  formSubmit: function (e) {
    let infoChangeData = {
      jobTitle: e.detail.value.jobTitle,
      sex: e.detail.value.sex,
      tel: e.detail.value.tel,
      college: e.detail.value.college,
      uid: app.globalData.userMessage.uid
    }
    postinfoChange({
      json: JSON.stringify(infoChangeData)
    }).then(res => {

      wx.showToast({
        title: '修改成功',
        icon: '成功',
        duration: 2000
      })
      this.setData({
        jobTitle: e.detail.value.jobTitle,
        sex: e.detail.value.sex,
        tel: e.detail.value.tel,
        college: e.detail.value.college
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '修改失败',
        image: "/assets/images/teacher/error.png",
        duration: 2000
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = app.globalData.userMessage
    this.setData({
      jobTitle: user.jobTitle,
      sex: user.sex,
      tel: user.tel,
      college: user.college
    })
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