import {
  getExamList,
  checkExamPwd
} from '../../../service/student'
import {
  compareTime
} from '../../../utils/util';
import Toast from '../../../vant-weapp/toast/toast';
import Dialog from '../../../vant-weapp/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseClassId: null,
    uid: null,
    examList: [],
    examPwd: '',
    dialogShow: false,
    examId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseClassId: options.courseClassId,
      uid: app.globalData.userMessage.uid
    })
    this.onGetExamList();
    this.updateListStatus();
  },
  // 获取考试列表
  onGetExamList: function () {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      mask: true,
      message: '加载中...'
    });
    getExamList({
      uid: this.data.uid,
      courseClassId: this.data.courseClassId
    }).then(res => {
      // 格式化考试列表数据
      const data = this.formatData(res.data)
      this.setData({
        examList: data
      })
      wx.stopPullDownRefresh();
      Toast.clear();
    }).catch(err => {
      wx.stopPullDownRefresh();
      Toast.clear();
      Toast.fail(err.msg);
    })
  },
  /** 
   * 更新考试状态
   */
  updateListStatus: function () {
    setInterval(() => {
      const data = this.formatData(this.data.examList);
      this.setData({
        examList: data
      })
    }, 1000);
  },
  /**
   * 格式化考试数据
   */
  formatData: function (data) {
    return data.map(item => {
      if (compareTime(item.pubTime) && item.examStatus == 0) { // 可以考试
        if (item.endTime != null && compareTime(item.endTime)) {
          item.btnDisabled = false;
          item.btnType = "primary";
          item.btnText = "查看详情";
        }else{
          item.btnDisabled = false;
          item.btnType = "info";
          item.btnText = "开始考试";
        }
      } 
      if (!compareTime(item.pubTime)){ // 未到考试时间
        item.btnDisabled = true;
        item.btnType = "info";
        item.btnText = "未开考";
      }
      if (item.examStatus != 0){
        item.btnDisabled = false;
        item.btnType = "primary";
        item.btnText = "查看详情";
      }
      return item;
    })
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    // 重新获取考试列表
    this.onGetExamList();
  },
  // 开始考试
  startExam: function (e) {
    const examId = e.currentTarget.dataset.examid;
    // 提示输入考试密码
    this.setData({
      examId: examId,
      dialogShow: true,
      examPwd: ''
    })
  },
  // 查看答题详情
  toDetail: function (e) {
    const examId = e.currentTarget.dataset.examid;
    wx.navigateTo({
      url: '../examDetail/examDetail?examId=' + examId
    });
  },
  // 校验密码
  onDialogSure: function () {
    const paramData = {
      examId: this.data.examId,
      enterCode: this.data.examPwd
    }
    checkExamPwd(paramData).then(res => {
      // 校验通过
      if (res.data.result) {
        this.setData({
          dialogShow: false
        })
        wx.reLaunch({
          url: "../startExam/startExam?examId=" + this.data.examId
        })
      } else { // 密码错误
        this.setData({
          dialogShow: false
        })
        Toast.fail(res.data.message);
      }
    }).catch(err => {
      Toast.fail(err.msg);
      this.setData({
        dialogShow: false
      })
    })
  },
  onInputChange: function (e) {
    this.setData({
      examPwd: e.detail.value
    })
  }
})