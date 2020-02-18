// pages/edit/edit.js
import Toast from '/vant-weapp/toast/toast';
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // textdata: "not data",
    columns: "",
    show: false,
    username: "",
    password: "",
    password1: "",
    department: "",
    phone: "",
    error_message_password: "",
    error_message_phone: "",
    // error_register_info: "",
    access: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var value = wx.getStorageSync('key')
      if (value) {
        var username = value
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
          "username": { username }
        }
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data.result)
        // console.log(res.data.result.length)
        //成功执行，这里由于是请求，所以没办法同步this，所以要先赋值给that
        if (res.data.result.length == 0) {
          console.log("未查询到任何数据")
          wx.navigateTo({
            url: '/pages/error/error?title=error"'
          })
        }
        // that.setData({ textdata: res.data.result });
        var info_data = res.data.result[0]
        that.setData({
          username: info_data.username,
          department: info_data.department_name,
          phone: info_data.mobile,
        });
      },
      fail: function (res) {
        console.log(Error.data) //失败执行
      },
      complete: function (res) {
        //绝对执行
      },

    })
    wx.request({
      url: 'https://www.ben123123.club:8080/api',
      // url: 'http://127.0.0.1:5000/api',
      data: {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "Department.list",
        "params": {
        }
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log("================")
        // console.log(res.data)
        // console.log(res.data.result.length)
        //成功执行，这里由于是请求，所以没办法同步this，所以要先赋值给that
        if (res.data.result.length == 0) {
          wx.navigateTo({
            url: '/pages/error/error?title=error"'
          })
        }
        // console.log(res.data.result[0].name_list)
        that.setData({ columns: res.data.result[0].name_list });
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  onChange(event) {
    // console.log(event.detail)
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
  onCancel() {
    Toast('取消');
    this.setData({ show: false });
  },
  onClose() {
    this.setData({ show: true });
  },
  onConfirm(e) {
    this.setData({
      show: false,
      department: e.detail.value,
    });
  },
  // inputName: function (e) {
  //   // console.log(e.detail)
  //   this.setData({ username: e.detail });
  // },
  inputPassword: function (e) {
    // console.log(e.detail)
    this.setData({ password: e.detail });
  },
  inputPassword1: function (e) {
    // console.log(e.detail)
    this.setData({ password1: e.detail });
  },
  inputPhone: function (e) {
    // console.log(e.detail)
    this.setData({ phone: e.detail });
  },
  checkSamePassword: function (e) {
    // console.log(this.data.password)
    // console.log(this.data.password1)
    if (this.data.password != this.data.password1) {
      this.setData({ error_message_password: "两次密码不同" });
    }
    else {
      this.setData({ error_message_password: "" });
    }
  },
  checkPhoneNum: function (e) {
    // console.log(this.data.phone)
    if (this.data.phone.length != 11) {
      this.setData({ error_message_phone: "手机格式不正确" });
    }
    else {
      this.setData({ error_message_phone: "" });
    }
  },
  edit_up: function () {
    // console.log(this.data)
    // console.log(this.data.username)
    if (this.data.username == "" || this.data.password == "" || this.data.password1 == "" || this.data.phone == "" || this.data.department == "") {
      console.log("-----")
      // console.log("register_fail")
      Toast.fail('有值未填写');
      // this.setData({ error_register_info: "有未填写值" });
    }
    else {
      console.log(this.data)
      // console.log("successed")
      var data = this.data;
      wx.request({
        url: 'https://www.ben123123.club:8080/api',
        // url: 'http://127.0.0.1:5000/api',
        data: {
          "jsonrpc": "2.0",
          "id": 1,
          "method": "Edit.user",
          "params": {
            "data": { data }
          }
        },
        header: {},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log("worked_edit=============")
          console.log(res)
          console.log(res.data.result.error.length)
          //成功执行，这里由于是请求，所以没办法同步this，所以要先赋值给that
          if (res.data.result.error.length >= 1) {
            // console.log("注册失败")
            Toast.fail(res.data.result.error);
          }
          else {
            // console.log("注册成功")
            // Toast.success('修改成功，请登录');
            const toast = Toast.loading({
              duration: 0,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              message: '修改成功,即将跳转',
              loadingType: 'spinner',
              selector: '#custom-selector'
            });

            let second = 2;
            const timer = setInterval(() => {
              second--;
              if (second) {
                // toast.setData({
                //   message: `修改成功/即将跳转`
                // });
              } else {
                clearInterval(timer);
                Toast.clear();
                wx.navigateTo({
                  url: '/pages/checkinfo/checkinfo?title=checkinfo"'
                })
              }
            }, 1000);
          }
        },
        fail: function (res) {
          console.log(Error.data) //失败执行
        },
        complete: function (res) {
          //绝对执行
        },

      })
    }
  },
})
