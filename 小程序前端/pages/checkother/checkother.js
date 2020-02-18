// pages/checkother/checkother.js
import Toast from '/vant-weapp/toast/toast';
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textdata: "not data",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    try {
      console.log("search_data==========")
      var value = wx.getStorageSync('search_data')
      var search_data = value
      // var value_secret = wx.getStorageSync('value_secret')
      console.log(value)
    } catch (e) {
      console.log("checkall_store===========catch")
      // Do something when catch error
    }
    var that = this;
    wx.request({
      url: 'https://www.ben123123.club:8080/api',
      // url: 'http://127.0.0.1:5000/api',
      data: {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "Search.data",
        "params": {
          "search_data": { search_data }
        }
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        // console.log(res.data.result.length)
        if (res.data.error) {
          console.log("othername_fail==========")
          Toast.fail({
            mask: true,
            duration: 1500,
            message: '无此用户'
          });
          // Toast.fail('失败文案');
        }else{
          // Toast.success('查询成功');
          console.log(res.data.result)
          that.setData({ textdata: res.data.result });
          // console.log(that.textdata)
          // Toast.success({
          //   mask: true,
          //   duration: 1500,
          //   message: '查询成功'
          // });
        }
      },
      fail: function (res) {
        console.log(Error.data) //失败执行
      },
      complete: function (res) {
        //绝对执行
      },

    })
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