import { getExamDetail, submitExam, recordExam } from '../../../service/student';
import { randomArray, formatNumber } from '../../../utils/util';
var app = getApp();
import Toast from '../../../vant-weapp/toast/toast';
import Dialog from '../../../vant-weapp/dialog/dialog';
var interval = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examId: null,
    stuUid: null,
    startTime: null,
    endTime: null,
    topicArr: [],
    restTime: "00:00",
    dialogShow: false,
    swiperCurrent: 0,
    recordCount: 0
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
    // 记录开考操作
    this.handleRecord(1);
  },
  /**
   * 获取考试题目详情
   */
  getExamTopics: function () {
    getExamDetail({ id: this.data.examId }).then(res => {
      // 题目需要打乱
      const single = randomArray(res.data.allTopics.single);
      const multiple = randomArray(res.data.allTopics.multiple);
      const judge = randomArray(res.data.allTopics.judge);

      let topicArr = single.concat(multiple).concat(judge);
      topicArr = topicArr.map(item => {
        if (item.type === "single") {
          item.typeName = "单选";
        } else if (item.type === "multiple") {
          item.typeName = "多选";
        } else if (item.type === "judge") {
          item.typeName = "判断";
        }
        item.myAnswer = [];
        item.isAnswer = false;
        return item;
      })

      this.setData({
        topicArr: topicArr
      })
      // 设置开考时间和结束时间
      this.setDuration(res.data.duration);
      // 设置倒计时
      this.setRestTime();
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: res.data.title
      })
    }).catch(err => {
      Toast.fail(err.msg);
    })
  },
  /**
   * 设置开考时间和结束时间
   */
  setDuration: function (duration) {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 1000 * 60 * duration);
    this.setData({
      startTime: startTime,
      endTime: endTime
    })
  },
  /**
   * 设置倒计时
   */
  setRestTime: function () {
    interval = setInterval(() => {
      const restDuration = this.data.endTime.getTime() - new Date().getTime();
      if (restDuration > 0) {
        const m = Math.floor(restDuration / 60 / 1000);
        const s = Math.floor((restDuration - m * 60 * 1000) / 1000);
        this.setData({
          restTime: formatNumber(m) + ":" + formatNumber(s)
        })
      } else {
        // 自动交卷
        this.submitAnswer();
      }
    }, 1000);
  },
  /**
   * 点击提交试卷
   */
  onSubmitAnswer: function () {
    // 取出未作答题数
    const unAnswerCount = this.data.topicArr.filter(item => item.isAnswer == false).length;
    Dialog.confirm({
      title: '是否要提交试卷',
      message: '您还有' + unAnswerCount + '题未作答'
    }).then(() => {
      this.submitAnswer();
    }).catch(() => {
      // on cancel
    });
  },
  /**
   * 提交试卷
   */
  submitAnswer: function () {
    Toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      mask: true,
      message: '提交中...'
    });
    // 记录结束考试操作
    this.handleRecord(2);

    // 清除定时器
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }

    // 答题耗时
    const spendTime = Math.floor((new Date().getTime() - this.data.startTime.getTime()) / 1000);

    // 取出未作答题数
    const unAnswerCount = this.data.topicArr.filter(item => item.isAnswer == false).length;

    // 提交状态(0-未作答1-正常提交2-违规导致提交3-未作答完自动提交)
    let examStatus = 1;
    // 未作答完自动提交
    if (new Date().getTime() >= this.data.endTime.getTime() && unAnswerCount > 0) {
      examStatus = 3;
    }
    // 违规导致提交
    if(this.data.recordCount > 3){
      examStatus = 2;
    }

    // 取出答案集合
    const answers = this.data.topicArr.map(item => {
      return {
        topicId: item.id,
        stuLabel: item.myAnswer.toString()
      }
    })

    // 上传参数
    const paramData = {
      examId: this.data.examId,
      stuUid: this.data.stuUid,
      spendTime: spendTime,
      examStatus: examStatus,
      answers: answers
    }
    console.log("交卷了");
    // 请求接口
    submitExam({ json: JSON.stringify(paramData) }).then(res => {
      Toast.clear();
      Dialog.alert({
        message: '提交成功'
      }).then(() => {
        // 返回首页
        wx.reLaunch({
          url: '../../common/index/index'
        })
      });
    }).catch(err => {
      Toast.clear();
      Toast.fail(err.msg);
      // 返回首页
      wx.reLaunch({
        url: '../../common/index/index'
      })
    })
  },
  /**
   * 复选框点击事件
   */
  onCheckboxChange(event) {
    const topicIndex = event.currentTarget.dataset.topicindex;
    const isAnswer = event.detail.length != 0;
    this.setData({
      ["topicArr[" + topicIndex + "].myAnswer"]: event.detail,
      ["topicArr[" + topicIndex + "].isAnswer"]: isAnswer
    });
  },
  /**
   * 单选框点击事件
   */
  onRadioChange: function (event) {
    const topicIndex = event.currentTarget.dataset.topicindex;
    const isAnswer = true;
    this.setData({
      ["topicArr[" + topicIndex + "].myAnswer[0]"]: event.detail,
      ["topicArr[" + topicIndex + "].isAnswer"]: isAnswer
    });
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
  onShow: function () {
    if (this.data.recordCount > 0 && this.data.recordCount < 4) {
      Dialog.alert({
        message: `你的异常操作已被记录，超过三次将自动交卷(还剩${4 - this.data.recordCount}次)`
      }).then(() => {
      })
    }
  },
  /**
   * 页面被隐藏
   */
  onHide: function () {
    console.log("切屏了");
    this.setData({
      recordCount: this.data.recordCount + 1
    })
    // 后台进行记录
    this.handleRecord(0);
    // 超过三次，强制提交试卷
    if (this.data.recordCount > 3) {
      this.submitAnswer();
    }
  },
  /**
   * 考试操作记录
   */
  handleRecord: function (type) {
    const param = {
      uid: this.data.stuUid,
      examId: this.data.examId,
      type: type
    }
    recordExam(param).then(res => {
    }).catch(err => {
    })
  }
})