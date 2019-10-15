import { getTeacherList, deleteTeacher, unBind, resetPwd } from '../../../service/admin'
import Toast from '../../../vant-weapp/toast/toast';
import Dialog from '../../../vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getListParam: {
      pageSize: 50,
      pageIndex: 1,
      search: ''
    },
    list: [],
    inputValue: '',
    scrollHeight: 0,
    scrollFlag: true
  },
  /**
   * 搜索
   */
  query: function (e) {
    this.setData({
      ["getListParam.search"]: e.detail.value,
      ["getListParam.pageIndex"]: 1,
      list: [],
      scrollFlag: true
    })
    this.getList();
  },
  /**
   * 输入框输入
   */
  inputBind: function (e) {
    this.setData({
      ["getListParam.search"]: e.detail.value
    })
  },
  /**
   * 取消搜索
   */
  cancel: function () {
    this.setData({
      inputValue: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 获取教师列表
    this.getList();
    // 设置列表栏的高度
    this.setScorllHeight();
  },
  /**
   * 获取教师列表
   */
  getList: function () {
    if (this.data.scrollFlag) {
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: true,
        message: '加载中...'
      });
      getTeacherList(this.data.getListParam).then(res => {
        if (res.data.length != 0) {
          const list = this.data.list.concat(res.data);
          this.setData({
            list: list
          })
        } else {
          this.setData({
            scrollFlag: false // 不允许再滚动获取数据
          })
        }
        Toast.clear();
      }).catch(err => {
        Toast.clear();
        Toast.fail(res.msg);
      })
    }
  },
  /**
   * 滚动条触底
   */
  onScrolltolower: function () {
    this.setData({
      ["getListParam.pageIndex"]: this.data.getListParam.pageIndex + 1
    })
    this.getList();
  },
  /**
   * 设置列表栏的高度
   */
  setScorllHeight: function () {
    try {
      const res = wx.getSystemInfoSync()
      this.setData({
        scrollHeight: res.windowHeight - 31
      })
    } catch (e) {
      // Do something when catch error
    }
  },
  /**
   * 删除
   */
  delete: function (e) {
    wx.showModal({
      title: '警告',
      content: '是否要删除',
      success(res) {
        if (res.confirm) {
          deleteTeacher({ uid: e.currentTarget.dataset.uid }).then(res => {
            Toast.success("删除成功");
          }).catch(err => {
            Toast.fail(err.msg);
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  /**
   * 解绑微信号
   */
  unbind: function (e) {
    wx.showModal({
      title: '警告',
      content: '是否要解绑微信号',
      success(res) {
        if (res.confirm) {
          unBind({ uid: e.currentTarget.dataset.uid }).then(res => {
            Toast.success("解绑成功");
          }).catch(err => {
            Toast.fail(err.msg);
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  /**
   * 重置密码
   */
  resetPwd: function (e) {
    wx.showModal({
      title: '警告',
      content: '是否要重置密码',
      success(res) {
        if (res.confirm) {
          resetPwd({ uid: e.currentTarget.dataset.uid }).then(res => {
            Toast.success("重置成功");
          }).catch(err => {
            Toast.fail(err.msg);
          })
        } else if (res.cancel) {
        }
      }
    })
  }
})