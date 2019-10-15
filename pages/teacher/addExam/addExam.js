// pages/teacher/addExam/addExam.js
import {
  postCourseList,
  getClassList,
  postAddExam
} from '../../../service/teacher.js';
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    time: '',
    showCourse: false,
    showClass: false,
    courseId: [],
    CourseColumns: [],
    classId: [],
    Classcolumns: []
  },
  //  点击开始时间组件确定事件
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  //  点击开始日期组件确定事件
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //  点击结束时间组件确定事件
  bindEndDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  //  点击结束日期组件确定事件
  bindEndTimeChange: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  //课程选择器
  bindCourseSelect: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  showCoursePopup() {
    this.setData({
      showCourse: true
    });
  },

  onCourseClose() {
    this.setData({
      showCourse: false
    });
  },
  onCourseConfirm(event) {
    this.setData({
      showCourse: false,
      course: event.detail.value,
      courseClumnID: this.data.courseId[event.detail.index]
    })

  },
  onCourseCancel() {
    this.setData({
      showCourse: false,
    })
  },
  //班级选择器
  bindClassSelect: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  showClassPopup() {
    this.setData({
      showClass: true
    });
  },

  onClassClose() {
    this.setData({
      showClass: false
    });
  },
  onClassConfirm(event) {
    this.setData({
      showClass: false,
      class: event.detail.value,
      classClumnID: this.data.classId[event.detail.index]
    })

  },
  onClassCancel() {
    this.setData({
      showClass: false,
    })
  },
  //添加试卷
  formSubmit: function (e) {
    
    var endTime
    if( (e.detail.value.endfirsttime || e.detail.value.endsettime) == null)
    {
      endTime = null
    }else{
      endTime = e.detail.value.endfirsttime + " " + e.detail.value.endsettime + ":00"
    }
    let AddExamData = {
      courseId: this.data.courseClumnID,
      title: e.detail.value.title,
      classId: this.data.classClumnID,
      teaUid: app.globalData.userMessage.uid,
      pubTime: e.detail.value.firtime + " " + e.detail.value.setime + ":00",
      endTime: endTime,
      duration: e.detail.value.duration,
    }
    console.log(AddExamData)
    postAddExam(AddExamData).then(res => {
      wx.showToast({
        title: '成功',
        icon: '添加考试成功',
        duration: 2000
      })
      wx.navigateBack({
        url: '/components/teacher/exam/exam',
      })
    }).catch(err => {
      console.log('添加考试失败', err)
      wx.showToast({
        title: '添加失败',
        image: "/assets/images/teacher/error.png",
        duration: 2000
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var uid = app.globalData.userMessage.uid;
    //获取课程列表
    let getCourseId = {
      uid: uid,
      startYear: '',
      endYear: '',
      isLinear: '0'
    }
    postCourseList(getCourseId).then(res => {
      console.log('course', res)
      var courseName = this.data.CourseColumns
      var courseId = this.data.courseId
      var len = this.data.CourseColumns.length
      for(var i=0; i < res.data.length; i++){
        courseName[len+i]=res.data[i].courseCName,
        courseId[len+i] = res.data[i].courseId
      }
      that.setData({
        CourseColumns:courseName,
        courseId:courseId
      })
    }).catch(err => {
      console.log(res)
    })
    //获取课程班级列表
    let getClassData = {
      uid: uid,
      isLinear: '0'
    }
    getClassList(getClassData).then(res => {
      console.log('class', res)
      var className = this.data.Classcolumns
      var classNameId = this.data.classId
      var len = this.data.Classcolumns.length
      for(var i=0; i < res.data.length; i++){
        className[len+i]=res.data[i].courseClassName,
        classNameId[len+i] = res.data[i].courseClassId
      }
      that.setData({
        Classcolumns:className,
        className:classNameId
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