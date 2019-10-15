// pages/teacher/selectTopic/selectTopic.js
import {
  postTitleList,
  postDelectTitle
} from '../../../service/teacher.js';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selIds: [], // 已经选择过的题目id集合,
    getListParam: { // 获取列表的参数
      courseId: null,
      teaUid: null,
      pageSize: 5000,
      pageIndex: 1,
      search: ''
    },
    judge: [],
    multiple: [],
    single: [],
    activeName: '',
    selJudge: [],
    selMultiple: [],
    selSingle: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const selIds = options.idArr.split(',').map(item => item = parseInt(item))
    this.setData({
      selIds: selIds,
      ["getListParam.courseId"]: options.courseId,
      ["getListParam.teaUid"]: app.globalData.userMessage.uid
    })
    // 获取题目列表
    this.getList();
  },
  onShow: function(){
    wx.setStorageSync("single", this.data.selSingle);
    wx.setStorageSync("multiple", this.data.selMultiple);
    wx.setStorageSync("judge", this.data.selJudge);
  },
  /**
   * 获取题目列表
   */
  getList: function () {
    //获取题目列表
    postTitleList(this.data.getListParam).then(res => {
      this.setData({
        judge: this.filterTopic(res.data.judge),
        multiple: this.filterTopic(res.data.multiple),
        single: this.filterTopic(res.data.single)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /** 
   * 过滤已经选择过的题目
  */
 filterTopic: function(topicArr){
   return topicArr.filter(item => this.data.selIds.indexOf(item.id) < 0)
 },
  /**
   * 展开或折叠
   */
  onCollapse(event) {
    this.setData({
      activeName: event.detail
    });
  },
  /**
   * 取消搜索
   */
  cancelSearch: function(){
    this.setData({
      ["getListParam.search"]: ''
    })
  },
  /**
   * 搜索框输入
   */
  inputBind: function(e){
    this.setData({
      ["getListParam.search"]: e.detail.value
    })
  },
  /** 
   * 选择题目
  */
  onSelectTopic: function(e){
    const index = e.currentTarget.dataset.index;
    const type = e.currentTarget.dataset.type;
    const tosel = e.currentTarget.dataset.tosel;
    if(type == "single"){
      let tempArr = this.data.selSingle;
      if (tosel){ // 选择题目
        tempArr.push(this.data.single[index]);
      }else{ // 取消选择题目
        const noSelIndex = tempArr.findIndex(item => item.id == this.data.single[index].id);
        tempArr.splice(noSelIndex, 1);
      }
      this.setData({
        selSingle: tempArr
      })
    } else if (type == "multiple"){
      let tempArr = this.data.selMultiple;
      if (tosel) { // 选择题目
        tempArr.push(this.data.multiple[index]);
      } else { // 取消选择题目
        const noSelIndex = tempArr.findIndex(item => item.id == this.data.multiple[index].id);
        tempArr.splice(noSelIndex, 1);
      }
      this.setData({
        selMultiple: tempArr
      })
    } else if (type == "judge") {
      let tempArr = this.data.selJudge;
      if (tosel) { // 选择题目
        tempArr.push(this.data.judge[index]);
      } else { // 取消选择题目
        const noSelIndex = tempArr.findIndex(item => item.id == this.data.judge[index].id);
        tempArr.splice(noSelIndex, 1);
      }
      this.setData({
        selJudge: tempArr
      })
    }
  },
  /**
   * 保存返回
   */
  onBack: function(){
    wx.setStorageSync("single", this.data.selSingle);
    wx.setStorageSync("multiple", this.data.selMultiple);
    wx.setStorageSync("judge", this.data.selJudge);
    wx.navigateBack()
  }
})