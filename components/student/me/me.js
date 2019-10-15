var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPullDownRefresh: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userMessage: null,
    oldIsPullDownRefresh: false
  },
  /**
   * 数据监听器
   */
  observers: {
    'isPullDownRefresh': function (newValue) {
      if (this.data.oldIsPullDownRefresh !== this.data.isPullDownRefresh) {
        console.log("下拉刷新了")
        this.setData({
          oldIsPullDownRefresh: newValue
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //跳转到修改个人信息
    toUpdateInfo: function () {
      wx.navigateTo({
        url: '/pages/student/updateInfo/updateInfo',

      })
    }
  },
  lifetimes: {
    attached: function () {
      var user = app.globalData.userMessage
      this.setData({
        userMessage: user
      })
    }
  }
})