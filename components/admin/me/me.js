var app = getApp();
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
   * 组件的初始数据
   */
  data: {
    oldIsPullDownRefresh: false,
    userInfo: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
      // 获取用户信息
      this.setData({
        userInfo: app.globalData.userMessage
      })
    }
  }
})