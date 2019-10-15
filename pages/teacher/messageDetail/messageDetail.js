import {
  getMessageList,
  updateMessage
} from '../../../service/common';
import Toast from '../../../vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取消息详情
    this.setData({
      info: JSON.parse(options.info)
    })
    // 将消息设为已读
    if (!this.data.info.isRead) {
      updateMessage({
        id: this.data.info.id,
        uid: this.data.info.acceptUid,
        isRead: 1
      }).then(res => {}).catch(err => {})
    }
  }
})