// pages/student/updateInfo/updateInfo.js
import { updateInfo } from '../../../service/student'
import { getUerMesage } from '../../../service/common'
import Toast from '../../../vant-weapp/toast/toast';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexColumns: ['男', '女'],
    showSex: false,
    formContent: {
      uid: null,
      sex: '',
      tel: '',
      grade: '',
      major: '',
      college: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    this.getUserInfo();
  },
  getUserInfo: function() {
    getUerMesage().then(res=>{
      const { uid, sex, tel, grade, major, college } = res.data;
      this.setData({
        ["formContent.uid"]: uid,
        ["formContent.sex"]: sex,
        ["formContent.tel"]: tel,
        ["formContent.grade"]: grade,
        ["formContent.major"]: major,
        ["formContent.college"]: college
      })
    })
  },
  onShowSex() {
    this.setData({
      showSex: true
    });
  },

  onSexClose() {
    this.setData({
      showSex: false
    });
  },
  onSexConfirm(event) {
    this.setData({
      showSex: false,
      ["formContent.sex"]: event.detail.value
    })
  },
  formSubmit: function (e) {
    const param = {
      uid: this.data.formContent.uid,
      sex: this.data.formContent.sex,
      tel: e.detail.value.tel,
      grade: e.detail.value.grade,
      major: e.detail.value.major,
      college: e.detail.value.college
    }
    updateInfo({ json: JSON.stringify(param)}).then(res => { 
      wx.showToast({
        title: '修改成功',
        duration: 2000
      })
      // 重新获取用户信息
      this.getUserInfo();
    }).catch(err => { 
      wx.showToast({
        title: `修改失败(${err.msg})`,
        image: "/assets/images/teacher/error.png",
        duration: 2000
      })
    })
  }
})