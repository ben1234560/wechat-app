// pages/checkall/checkall.js
import Toast from '/vant-weapp/toast/toast';
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textdata: "not data",
    info: null,
    search_value:'',
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    try {
      var value = wx.getStorageSync('key')
      var username = value
      // var value_secret = wx.getStorageSync('value_secret')
      console.log(value)
      if (value) {
        // Do something with return value
      }
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
        "method": "User.list",
        "params": {
          "username": { username }
        }
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res)
        // console.log(res.data.result.length)
        if (res.data.result.error) {
          // console.log("checkall_fail==========")
          const toast = Toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '请先登录',
            loadingType: 'spinner',
            selector: '#custom-selector'
          });

          let second = 2;
          const timer = setInterval(() => {
            second--;
            if (second) {
              // toast.setData({
              //   message: `请先登录 ${second} 秒`
              // }); 
            } else {
              clearInterval(timer);
              Toast.clear();
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          }, 1000);
        }
        // console.log(res.data)
        //成功执行，这里由于是请求，所以没办法同步this，所以要先赋值给that
        that.setData({ textdata: res.data.result });
      },
      fail: function (res) {
        console.log(Error.data) //失败执行
      },
      complete: function (res) {
        //绝对执行
      },

    })
  },

  onSearch:function(e){
    // console.log(this.value)
    // console.log("================")
    // console.log(e)
    // console.log(e.detail)
    if (e.detail){
      Toast.loading({
        mask: true,
        duration: 1500,
        message: '搜索中...'
      });
      try {
        wx.setStorageSync('search_data', e.detail)
      } catch (e) { }
      console.log("sucessed")
      wx.navigateTo({
        url: '/pages/checkother/checkother?title=checkother"'
      })
    }else{
      Toast.loading({
        mask: true,
        duration: 700,
        message: '无搜索值'
      });
    }
  }
})