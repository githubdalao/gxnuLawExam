// pages/teacher/queBank/queBank.js
import {
  postTitleList,
  postDelectTitle
} from '../../../service/teacher.js';
var app = getApp()
//课程id
var courseId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '',
    value: '',
    getListParam: { // 获取列表的参数
      courseId: null,
      teaUid: null,
      pageSize: 5000,
      pageIndex: 1,
      search: ''
    }
  },
  onCollapse(event) {
    this.setData({
      activeName: event.detail
    });
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
      this.setData({
        judge: res.data.judge,
        multiple: res.data.multiple,
        single: res.data.single,
      })
      if (res.data.single.length > 0) {
        this.setData({
          activeName: "1"
        })
      } else if (res.data.multiple.length > 0) {
        this.setData({
          activeName: "2"
        })
      } else if (res.data.judge.length > 0) {
        this.setData({
          activeName: "3"
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
  //添加题目
  add: function() {
    wx.navigateTo({
      url: '../editAddQues/editAddQues?courseId=' + this.data.options.courseId + "&teaUid=" + app.globalData.userMessage.uid,
    })
  },
  //删除题目
  delect: function (res) {
    var that = this
    var delectId = res.currentTarget.dataset.id
    //删除题目接口
    let delect = {
      id: delectId
    }
    postDelectTitle(delect).then(res => {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        that.onLoad(that.data.options)
      }, 1500)
    }).catch(err => {
      console.log(err)
      if (err.code == 500) {
        wx.showToast({
          title: '题目已关联试卷',
          image: "/assets/images/teacher/error.png",
          duration: 2000
        })
      }
    })
  },
  //修改题目
  edit: function(res) {
    var that = this
    var editId = res.currentTarget.dataset.id
    //修改题目
    wx.navigateTo({
      url: `../editAddQues/editAddQues?editId=${editId}&courseId=${that.data.options.courseId}`,
    })

  },
  /**
   * 搜索框输入
   */
  inputBind: function (e) {
    this.setData({
      ["getListParam.search"]: e.detail.value
    })
  },
  /**
   * 取消搜索
   */
  cancelSearch: function () {
    this.setData({
      ["getListParam.search"]: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options,
      ["getListParam.courseId"]: options.courseId,
      ["getListParam.teaUid"]: app.globalData.userMessage.uid
    })
    // 获取题目列表
    this.getList();
  },
  /**
   * 获取题目列表
   */
  getList: function(){
    //获取题目列表
    postTitleList(this.data.getListParam).then(res => {
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
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    // 重新获取题目列表
    this.getList();
  }
})