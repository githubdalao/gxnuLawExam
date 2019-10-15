// pages/teacher/addtiku/addtiku.js
import {
  postTitleList
} from '../../../service/teacher.js';
var app = getApp()
//课程id
var courseId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: ''
  },
  //搜索题目
  search: function (searchData) {
    var that = this
    let getTitle = {
      courseId: courseId,
      pageSize: 5000,
      pageIndex: 1,
      search: searchData
    }
    postTitleList(getTitle).then(res => {
      console.log('tag', res)
      this.setData({
        judge: res.data.judge,
        multiple: res.data.multiple,
        single: res.data.single,
      })
      if (res.data.single.length > 0) {
        this.setData({
        })
      } else {
        wx.showToast({
          title: "搜索结果为空",
          icon:'none',
          duration: 2000
        })
        that.onLoad(this.data.options)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //取消搜索
  concel: function () {
    this.onLoad(this.data.options)
    this.setData({
      inputValue: ''
    })
  },
  //勾选题目checkbox
  checkboxChange: function (e) {
    this.setData({
      chooseAdd: e.detail.value
    })
    console.log('chooing', e.detail.value)
  },
  
  //确定勾选
  confirmed: function(e){
    var ques=[];
    for(var i=0; i<this.data.chooseAdd.length; i++){
      ques[i] = this.data.judge[i]
    }
    wx.setStorageSync('setQuesId', ques)
    wx.navigateBack ({
      url: '../examDetail/examDetail?paperId='+this.data.options.paperId+'&type='+this.data.options.typeId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      options: options
    })
    courseId = options.courseId
    //获取题目列表
    let getTitle = {
      courseId: courseId,
      pageSize: 5000,
      pageIndex: 1,
      search: ""
    }
    postTitleList(getTitle).then(res => {
      this.setData({
        judge: res.data.judge,
        multiple: res.data.multiple,
        single: res.data.single
      })
    }).catch(err => {
      console.log(err)
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