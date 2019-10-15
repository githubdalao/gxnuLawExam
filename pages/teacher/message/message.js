import {
  getMessageList,
  updateMessage
} from '../../../service/common';
import Toast from '../../../vant-weapp/toast/toast';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  /**
   * 获取消息列表
   */
  getList: function () {
    getMessageList({
      uid: app.globalData.userMessage.uid
    }).then(res => {
      this.setData({
        list: res.data
      })
    }).catch(err => {
      Toast.fail(err.msg);
    })
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    // 重新获取消息列表
    this.getList();
  },
  // 前往消息详情
  toDetail: function (e) {
    const msg = this.data.list[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: '../messageDetail/messageDetail?info=' + JSON.stringify(msg)
    })
  }
})