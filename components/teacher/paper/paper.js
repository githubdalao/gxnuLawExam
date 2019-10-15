// components/teacher/paper/paper.js
import {
  postCourseList
} from '../../../service/teacher';
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
    coueseList: [],
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
    //进入试题管理
    enter: (res) => {
      wx.navigateTo({
        url: '/pages/teacher/queBank/queBank?courseId=' + res.currentTarget.dataset.id
      })
    }
  },
  lifetimes: {
    // 在组件实例刚刚被创建时执行
    created: function () {
      var that = this
      var userMessage = app.globalData.userMessage
      // 获取课程列表
      let uid = {
        uid: userMessage.uid,
        startYear: '',
        endYear: '',
        isLinear: '0'
      }
      postCourseList(uid).then(res => {
        console.log(res)
        that.setData({
          coueseList: res.data
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
