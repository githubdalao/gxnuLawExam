// pages/teacher/editQues/editQues.js
import { postChangeTitle, postAddTitle, getQuesDetail } from '../../../service/teacher.js';
import Toast from '../../../vant-weapp/toast/toast';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    quesDetail: {
      id: null,
      dry: '',
      courseId: null,
      teaUid: null,
      score: 0,
      tag: '',
      type: 'single',
      trueLabel: [],
      analyze: '',
      options: []
    },
    enNum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']
  },
  //添加选项
  addOption(event) {
    let tempArr = this.data.quesDetail.options;
    tempArr.push({
      id: null,
      optionLabel: '',
      opDescrebe: ''
    });
    this.setData({
      ["quesDetail.options"]: tempArr
    });
  },
  
  //双向绑定
  onOptionTextInput(event) {
    var index = event.currentTarget.dataset.index;
    var newText = event.detail.value;
    this.setData({
      ["quesDetail.options[" + index +"].opDescrebe"]: newText
    })
  },
  // 提交
  formSubmit: function (e) {
    // -----校验----
    if (e.detail.value.dry == '') {
      Toast('没有题干');
      return;
    }
    if (isNaN(parseFloat(e.detail.value.score))) {
      Toast('分值格式错误');
      return;
    }else{
      e.detail.value.score = parseFloat(e.detail.value.score);
    }
    // 判断题固定有两个选项，所以不需要校验
    if (this.data.quesDetail.options.length == 0 && this.data.quesDetail.type != "judge"){
      Toast('题目没有选项');
      return;
    }
    if (this.data.quesDetail.trueLabel.length== 0) {
      Toast('题目没有答案');
      return;
    }
    // ----end----

    // 获取options
    let options;
    if (this.data.quesDetail.type == "judge") {
      options = [{ id: null, optionLabel: 'A', opDescrebe: '对' }, { id: null, optionLabel: 'B', opDescrebe: '错' }];
    }else{
      options = this.data.quesDetail.options.map((item, index) => {
        item.optionLabel = this.data.enNum[index];
        return item;
      })
    }

    // 上传参数
    let param = {
      id: this.data.quesDetail.id,
      dry: e.detail.value.dry,
      courseId: this.data.quesDetail.courseId,
      teaUid: this.data.quesDetail.teaUid,
      score: e.detail.value.score,
      tag: e.detail.value.tag,
      type: this.data.quesDetail.type,
      trueLabel: this.data.quesDetail.trueLabel.toString(),
      analyze: e.detail.value.analyze,
      options: options
    }
    Toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '提交中'
    });
    // ------添加--------
    if (param.id == null){
      delete param.id;
      param.options = param.options.map(item => {
        return {
          optionLabel: item.optionLabel,
          opDescrebe: item.opDescrebe
        }
      })
      postAddTitle({ json: JSON.stringify(param) }).then(res => {
        // 添加成功，重置表单
        this.resetForm();
        Toast.clear();
        Toast.success(res.msg)
      }).catch(err => {
        Toast.clear();
        Toast.fail(err.msg)
      })
    } else {// ------编辑--------
      postChangeTitle({json: JSON.stringify(param)}).then(res => {
        Toast.clear();
        Toast.success(res.msg)
      }).catch(err => {
        Toast.clear();
        Toast.fail(err.msg)
      })
    }
  },
  /**
   * 重置表单
   */
  resetForm: function(){
    this.setData({
      ["quesDetail.dry"]: '',
      ["quesDetail.score"]: 0,
      ["quesDetail.tag"]: '',
      ["quesDetail.type"]: 'single',
      ["quesDetail.trueLabel"]: [],
      ["quesDetail.analyze"]: '',
      ["quesDetail.options"]: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
    // 如果options的editId == null | undefined，说明是添加
    if (options.editId != null && options.editId != undefined){ // 修改
      const toast = Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '提交中'
      });
      //获取题目信息
      getQuesDetail({ id: options.editId }).then(res => {
        res.data.trueLabel = res.data.trueLabel.split(',');
        this.setData({
          quesDetail: res.data
        })
        Toast.clear();
      }).catch(err => {
        Toast.clear();
        Toast.fail("获取题目信息失败");
      })
    }else{ // 添加
      this.setData({
        ["quesDetail.courseId"]: parseInt(options.courseId),
        ["quesDetail.teaUid"]: parseInt(options.teaUid),
      })
      wx.setNavigationBarTitle({title: "添加题目"})
    }
  },
  /**
   * 单选框发生变化
   */
  onRadioChange: function (e){
    const tempArr = [e.detail.value];
    this.setData({
      ["quesDetail.trueLabel"]: tempArr
    })
  },
  /** 
   * 多选框发生改变
  */
  checkboxChange: function (e) {
    this.setData({
      ["quesDetail.trueLabel"]: e.detail.value
    })
  },
  /**
   * 删除选项
   */
  deleteOption(event) {
    let tempOptions = this.data.quesDetail.options;
    const indexOptions = event.target.dataset.index;
    tempOptions.splice(indexOptions, 1);
    this.setData({
      ["quesDetail.options"]: tempOptions,
      ["quesDetail.trueLabel"]: []
    });
  },
  //单选、多选、判断
  onTypeSelect(event) {
    this.setData({
      ["quesDetail.type"]: event.detail
    });
  },
})