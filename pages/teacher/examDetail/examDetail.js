// pages/teacher/examDetail/examDetail.js
import {
  getExamDetail,
  getQuesDetail,
  postChangeExam
} from '../../../service/teacher.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
    typeFleg: null,
  },
  //保存试卷
  saveExam: function () {
    let changeExamData = {

    }
    postChangeExam(changeExamData).then(res => {

    }).catch(err => {

    })
  },
  //添加单选题
  singleAdd: function () {
    this.setData({
      typeFleg: 1
    })
    wx.navigateTo({
      url: `../addtiku/addtiku?courseId=${this.data.detail.courseId}&paperId=${this.data.paperId}&typeId=1`
    })
  },
  //添加多选题
  multiplyAdd: function () {
    this.setData({
      typeFleg: 2
    })
    wx.navigateTo({
      url: `../addtiku/addtiku?courseId=${this.data.detail.courseId}&paperId=${this.data.paperId}&typeId=2`
    })
  },
  //添加判断题
  judgeAdd: function () {
    this.setData({
      typeFleg: 3
    })
    wx.navigateTo({
      url: `../addtiku/addtiku?courseId=${this.data.detail.courseId}&paperId=${this.data.paperId}&typeId=3`
    })
  },
  //移除题目
  remove: function (e) {
    console.log('remove', e)
    wx.setStorageSync('removeQuesId', e.currentTarget.dataset.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      paperId: options.paperId
    })
    //获取试卷详情
    let examDetailData = {
      id: options.paperId
    }
    getExamDetail(examDetailData).then(res => {
      that.setData({
        detail: res.data,
        single:res.data.allTopics.single
      })
    }).catch(err => {
      console.log('获取试卷信息失败', err)
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
    var storeDate = wx.getStorageSync('setQuesId')
    console.log('storeDate', storeDate)
    
    var set = this.data.single
    console.log('set', set)
    
    //['array[' + i + '].text']: 'changed data'
    // for()
    //  this.setData({
    //    ['single['+i+']']: set[i]
    //   })
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