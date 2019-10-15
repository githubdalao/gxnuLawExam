// components/teacher/exam/exam.js
import {
  postExamList,
  postDelectExam
} from '../../../service/teacher';
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
   * 组件的初始数据
   */
  data: {
    value: '',
    showDialog: true,
    activeName: '',
    oldIsPullDownRefresh: false
  },

  /**
   * 数据监听器
   */
  observers: {
    'isPullDownRefresh': function (newValue) {
      if(this.data.oldIsPullDownRefresh !== this.data.isPullDownRefresh){
        console.log("下拉刷新了")
        this.setData({
          oldIsPullDownRefresh: newValue
        })
        // 重新获取考试列表
        this.getList();
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //折叠
    onCollapse(event) {
      this.setData({
        activeName: event.detail
      });
    },
    //跳转到添加考试页面
    addExam() {
      wx.navigateTo({
        url: '/pages/teacher/addExam/addExam',
      })
    },
    //删除未发布的试卷
    delectExam(res) {
      let delectData = {
        id: res.currentTarget.dataset.id
      }
      postDelectExam(delectData).then(res => {
        wx.showToast({
          text: '删除成功',
          icon: 'Sucess',
          duration: 200
        })
      }).catch(err => {
        console.log('failDelect', res)
      })
    },
    //进入试卷详情
    enter: function(res) {
      wx.navigateTo({
        url: '/pages/teacher/editExam/editExam?id='+res.currentTarget.dataset.id,
      })
    },
    // 获取考试列表
    getList: function(){
      var that = this
      var uid = app.globalData.userMessage.uid;
      //获取试卷列表
      let titleParm = {
        uid: uid,
        courseId: "",
        examStatus: "",
      }
      postExamList(titleParm).then(res => {
        console.log(res)
        that.setData({
          exmas: res.data
        })

      }).catch(err => {
        console.log(err)
      })
    }
  },
  lifetimes: {
    // 在组件实例刚刚被创建时执行
    created: function () {
      this.getList();
    }
  }
})
