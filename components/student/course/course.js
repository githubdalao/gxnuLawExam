import { getCourseClassList } from '../../../service/student'
var app = getApp();
Component({
  options: {
    styleIsolation: 'isolated'
  },
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
    userInfo: null,
    courselist: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取课程列表
    getCourseList: function () {
      getCourseClassList({ uid: this.data.userInfo.uid }).then(res => {
        this.setData({
          courselist: res.data
        })
      }).catch(err => {
        console.log(err);
      })
    },
    // 课程点击事件
    onCourseClick(e){
      const courseClassId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/student/examList/examList?courseClassId='+courseClassId
      })
    }
  },
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {
      // 获取用户信息
      this.setData({
        userInfo: app.globalData.userMessage
      })
      // 获取课程信息
      this.getCourseList()
    }
  }
})