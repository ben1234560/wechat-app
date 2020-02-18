// pages/checkinfo/checkinfo.js

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textdata: "not data",
    info:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.username)
    try {
      var value = wx.getStorageSync('key')
      if (value) {
        var username = value
        console.log("checkin============")
        // Do something with return value
      }
    } catch (e) {
      // Do something when catch error
    }
    var that = this;
    wx.request({
      url: 'https://www.ben123123.club:8080/api',
      // url: 'http://127.0.0.1:5000/api',
      data: {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "Search.user",
        "params": {
          "username": {username}
        }
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("checkinfo--------------")
        console.log(res.data.result)
        // console.log(res.data.result[0])
        // console.log(res.data.result.length)
        //成功执行，这里由于是请求，所以没办法同步this，所以要先赋值给that
        if (res.data.result.length == 0) {
          console.log("未查询到任何数据")
          wx.navigateTo({
            url: '/pages/backtime/backtime?title=backtime"'
          })
        }
        that.setData({ textdata: res.data.result });
      },
      fail: function(res) {
        console.log(Error.data) //失败执行
      },
      complete: function(res) {
        //绝对执行
      },

    })
    // console.log(that.data.textdata)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})