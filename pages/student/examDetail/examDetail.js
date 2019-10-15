import { getScore } from '../../../service/student'
var app = getApp();
import Toast from '../../../vant-weapp/toast/toast';
import Dialog from '../../../vant-weapp/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examId: null,
    stuUid: null,
    topicArr: [],
    answerDetail: {
      fraction: 0,
      wrongNum: 0,
      spendTime: 0,
      examStatus: 1,
      title: '',
      teaUid: null,
      duration: 0,
      pubTime: null
    },
    dialogShow: false,
    swiperCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      examId: options.examId,
      stuUid: app.globalData.userMessage.uid
    })
    // 获取考试题目详情
    this.getExamTopics();
  },
  /**
   * 获取考试题目详情
   */
  getExamTopics: function () {
    getScore({ examId: this.data.examId, uid: this.data.stuUid }).then(res => {
      let topicArr = res.data.allAnswer.single.concat(res.data.allAnswer.multiple).concat(res.data.allAnswer.judge);
      topicArr = topicArr.map(item => {
        if (item.type === "single") {
          item.typeName = "单选";
        } else if (item.type === "multiple") {
          item.typeName = "多选";
        } else if (item.type === "judge") {
          item.typeName = "判断";
        }
        return item;
      })
      const answerDetail = {
        fraction: res.data.fraction,
        wrongNum: res.data.wrongNum,
        spendTime: res.data.spendTime,
        examStatus: res.data.examStatus,
        title: res.data.title,
        teaUid: res.data.teaUid,
        duration: res.data.duration,
        pubTime: res.data.pubTime
      }
      this.setData({
        topicArr: topicArr,
        answerDetail: answerDetail
      })
      console.log(this.data.topicArr);
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: res.data.title
      })
    }).catch(err => {
      Toast.fail(err.msg);
    })
  },
  /**
   * 试卷导航
   */
  examNavigate: function () {
    this.setData({
      dialogShow: true
    })
  },
  /**
   * 试卷导航
   */
  naviToTopic: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      swiperCurrent: index,
      dialogShow: false
    })
  },
  /**
   * 关闭导航
   */
  onDialogClose: function () {
    this.setData({
      dialogShow: false
    })
  },
})