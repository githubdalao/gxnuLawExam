// pages/teacher/me/me.js
import { tabBar } from "../../../utils/config";

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    role: 'teacher',
    tabBar: [],
    contentHeight: 100,
    isPullDownRefresh: false
  },
  //底部tapBar跳转
  onChange(event) {
    this.setData({
      active: event.detail
    })
    // 设置顶部标题
    wx.setNavigationBarTitle({
      title: this.data.tabBar[event.detail].navigationBarTitleText
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setHeight();
    this.filterTabBar();
  },
  /**
   * 根据角色生成tabBar
   */
  filterTabBar: function () {
    // 获取用户角色(默认是老师)
    const role = app.globalData.userMessage.role || "teacher";
      this.setData({
        role: role,
        tabBar: tabBar[role]
      })
   
    wx.setNavigationBarTitle({
      title: tabBar[role][0].navigationBarTitleText
    })
  },
  /**
   * 根据屏幕高度设置内容区高度
   */
  setHeight: function () {
    let height = 0;
    try {
      const res = wx.getSystemInfoSync()
      // 减去底部tabbar高度
      height = res.windowHeight - 50;
    } catch (e) {
    }
    this.setData({
      contentHeight: height
    })
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    const index = this.data.active;
    const isPullDownRefresh = this.data.tabBar[index].isPullDownRefresh;
    this.setData({
      ["tabBar[" + index + "].isPullDownRefresh"]: !isPullDownRefresh
    })
  }
})