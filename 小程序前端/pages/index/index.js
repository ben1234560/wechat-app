//index.js
import Toast from '/vant-weapp/toast/toast';
//获取应用实例
const app = getApp()


Page({
  data: {
    condition: false,
    // motto: 'Hello World',
    inputValue: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    username2:"null",
    username:"",
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        // username: app.globalData.username,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {

  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindKeyInput:function(e){
    app.globalData.username = e.detail.value
    this.data.username2 = e.detail.value
    this.setData({
      inputValue: e.detail.value,
      username : e.detail.value
    })
  },
  checkinfo:function(){
    Toast.loading({
      mask: true,
      duration: 2000,
      message: '加载中...'
    });
    var that = this;
    var username = that.data.username2
    console.log(username)
    wx.request({
      url: 'https://www.ben123123.club:8080/api',
      // url: 'http://127.0.0.1:5000/api', //这个本地，上面是联网
      data: {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "Search.user",
        "params": {
          "username": { username }
        }
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        // console.log(res.data.result.length)
        //成功执行，这里由于是请求，所以没办法同步this，所以要先赋值给that
        if (res.data.result.length >= 1) {
          console.log("=================sssss")
          try {
            wx.setStorageSync('key', res.data.result[0].username)
            // wx.setStorageSync('value_secret', "123131434dQADAWE")
          } catch (e) { }
          console.log("sucessed")
          wx.navigateTo({
            url: '/pages/checkinfo/checkinfo?title=checkinfo"'
          })
        }else{
          console.log("未查询到任何数据")
          wx.navigateTo({
            url: '/pages/backtime/backtime?title=backtime"'
          })
        }
      },
      fail: function (res) {
        console.log(Error.data) //失败执行
        wx.navigateTo({
          url: '/pages/error/error?title=error"'
        })
      },
      complete: function (res) {
        //绝对执行
      },

    })
  },
})

