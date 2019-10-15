// components/teacher/me/me.js
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
    userMessage: '',
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
    //跳转到课表
    classList: function () {
      wx.navigateTo({
        url: '/pages/teacher/classList/classList',

      })
    },
    //跳转到已发布的考试
    examPubliced: function(){
      wx.navigateTo({
        url: '/pages/teacher/examPubliced/examPubliced',
      })
    },
    //跳转到修改个人信息
    inforChange: function(){
      wx.navigateTo({
        url: '/pages/teacher/infoChange/infoChange',
      })
    },
    // 跳转到消息列表
    toMessageList: function(){
      wx.navigateTo({
        url: '/pages/teacher/message/message',
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
