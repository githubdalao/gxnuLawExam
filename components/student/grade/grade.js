Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPullDownRefresh: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 数据监听器
   */
  observers: {
    'isPullDownRefresh': function (newValue) {
      if (this.data.oldIsPullDownRefresh !== this.data.isPullDownRefresh) {
        console.log("下拉刷新了")
        this.setData({
          oldIsPullDownRefresh: newValue
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    oldIsPullDownRefresh: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    // 在组件实例刚刚被创建时执行
    created: function () {
    }
  }
})
