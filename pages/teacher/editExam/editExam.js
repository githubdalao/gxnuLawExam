// pages/teacher/editExam/editExam.js
import { getExamDetail, postChangeExam } from '../../../service/teacher.js';
import { formatTime } from '../../../utils/util'
import Toast from '../../../vant-weapp/toast/toast';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: null,
    examDetail: null,
    isFirstEnter: true, // 是否第一次进入本页面
    loading: false,
    currentTime: new Date().getTime(),
    minDate: new Date(2019, 9, 1).getTime(),
    maxDate: new Date(2023, 10, 1).getTime(),
    datePickerShow: false,
    endTiemPick: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
    this.getDetail();
  },
  /**
   * 获取考试详情
   */
  getDetail: function () {
    Toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '加载中'
    });
    getExamDetail({ id: this.data.options.id }).then(res => {
      this.setData({
        examDetail: res.data,
        currentTime: new Date(res.data.pubTime).getTime()
      })
      console.log(this.data.examDetail);
      Toast.clear();
    }).catch(err => {
      Toast.clear();
      Toast.fail(err.msg)
    })
  },
  /**
   * 表单提交
   */
  formSubmit: function (e) {
    // 校验
    if (isNaN(parseInt(e.detail.value.duration))) {
      Toast('时长格式错误');
      return;
    } else {
      e.detail.value.duration = parseInt(e.detail.value.duration);
    }
    // 获取题目集合
    const topics = [...this.data.examDetail.allTopics.single, ...this.data.examDetail.allTopics.multiple, ...this.data.examDetail.allTopics.judge];
    const ids = topics.map(item => {
      return item.id
    })
    // 上传参数
    const param = {
      id: this.data.examDetail.id,
      title: e.detail.value.title,
      courseId: this.data.examDetail.courseId,
      classId: this.data.examDetail.classId,
      teaUid: app.globalData.userMessage.uid,
      pubTime: this.data.examDetail.pubTime,
      endTime: this.data.examDetail.endTime,
      duration: e.detail.value.duration,
      status: parseInt(e.detail.target.dataset.status),
      topics: ids
    }
    postChangeExam({ json: JSON.stringify(param) }).then(res => {
      Toast.fail(res.msg)
    }).catch(err => {
      Toast.fail(err.msg)
    })
  },
  /**
   * 移除题目
   */
  deleteTopic: function (e) {
    const index = e.currentTarget.dataset.index;
    const type = e.currentTarget.dataset.type;
    if (type == "single") {
      const tempArr = this.data.examDetail.allTopics.single;
      tempArr.splice(index, 1);
      this.setData({
        ["examDetail.allTopics.single"]: tempArr
      })
    } else if (type == "multiple") {
      const tempArr = this.data.examDetail.allTopics.multiple;
      tempArr.splice(index, 1);
      this.setData({
        ["examDetail.allTopics.multiple"]: tempArr
      })
    } else if (type == "judge") {
      const tempArr = this.data.examDetail.allTopics.judge;
      tempArr.splice(index, 1);
      this.setData({
        ["examDetail.allTopics.judge"]: tempArr
      })
    }
  },
  /**
   * 添加题目
   */
  addTopic: function () {
    // 取出已选择的题目id集合
    const tempArr = this.data.examDetail.allTopics.single.concat(this.data.examDetail.allTopics.multiple).concat(this.data.examDetail.allTopics.judge);
    const idArr = tempArr.map(item => item.id)
    wx.navigateTo({
      url: '../selectTopic/selectTopic?idArr=' + idArr.toString() + "&courseId=" + this.data.examDetail.courseId
    })
  },
  /**
   * onShow
   */
  onShow: function () {
    if (!this.data.isFirstEnter) {
      // 获取选择的题目
      const single = wx.getStorageSync('single');
      const multiple = wx.getStorageSync('multiple');
      const judge = wx.getStorageSync('judge');
      const tempSingle = this.data.examDetail.allTopics.single.concat(single);
      const tempMultiple = this.data.examDetail.allTopics.multiple.concat(multiple);
      const tempJudge = this.data.examDetail.allTopics.judge.concat(judge);
      this.setData({
        ["examDetail.allTopics.single"]: tempSingle,
        ["examDetail.allTopics.multiple"]: tempMultiple,
        ["examDetail.allTopics.judge"]: tempJudge
      })
      try {
        wx.removeStorageSync('single')
        wx.removeStorageSync('multiple')
        wx.removeStorageSync('judge')
      } catch (e) {
      }
    } else {
      this.setData({
        isFirstEnter: false
      })
    }
  },
  //开考时间
  showPopup: function(){
    this.setData({
      datePickerShow: true
    })
  },
  closePopup: function(){
    this.setData({
      datePickerShow: false
    })
  },
  onDataCancel: function(){
    this.setData({
      datePickerShow: false
    })
  },
  onDataConfirm(event) {
    const { detail } = event;
    this.setData({
      datePickerShow: false,
      ["examDetail.pubTime"]: formatTime(new Date(detail))
    })

  },
  //结束时间
  showEndPopup: function(){
    this.setData({
      endTiemPick: true
    })
  },
  closeEndPopup: function(){
    this.setData({
      endTiemPick: false
    })
  },
  cencelEndPopup: function(){
    this.setData({
      endTiemPick: false
    })
  },
  onEndConfirm(event) {
    const { detail } = event;
    this.setData({
      endTiemPick: false,
      ["examDetail.endTime"]: formatTime(new Date(detail))
    })

  },
})