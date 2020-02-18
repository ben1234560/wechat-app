// pages/backtime/backtime.js
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
    var that = this; //这里需要用that，因为下面是回调，this会失效
    wx.request({
      // url: 'http://127.0.0.1:5000/api',
      url: 'https://www.ben123123.club:8080/api',
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
  onChange(event) {
    // 控制多选框内容
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
  // 获取用户输入的各个信息
  inputName: function (e) {
    this.setData({ username: e.detail });
  },
  inputPassword: function (e) {
    this.setData({ password: e.detail });
  },
  inputPassword1: function (e) {
    this.setData({ password1: e.detail });
  },
  inputPhone: function (e) {
    this.setData({ phone: e.detail });
  },
  checkSamePassword: function (e) {
    if (this.data.password != this.data.password1) {
      this.setData({ error_message_password: "两次密码不同" });
    }
    else {
      this.setData({ error_message_password: "" });
    }
  },
  checkPhoneNum: function (e) {
    if (this.data.phone.length != 11) {
      this.setData({ error_message_phone: "手机格式不正确" });
    }
    else {
      this.setData({ error_message_phone: "" });
    }
  },
  register_up: function () {
    console.log(this.data)
    // 注册点击事件，判断用户的信息是否全部输入
    if (this.data.username == "" || this.data.password == "" || this.data.password1 == "" || this.data.phone.length != 11 || this.data.department == "") {
      Toast.fail('填写有误');
    }
    else {
      console.log(this.data)
      // 下面又是关于回调，所以先将this.data赋值给新的data
      var data = this.data;
      wx.request({
        url: 'https://www.ben123123.club:8080/api',
        // url: 'http://127.0.0.1:5000/api',
        data: {
          "jsonrpc": "2.0",
          "id": 1,
          "method": "Add.user",
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
          // console.log(res.data.result.error.length)
          //成功执行，这里由于是请求，所以没办法同步this，所以要先赋值给that
          if (res.data.result.error.length >= 1) {
            Toast.fail(res.data.result.error);
          }
          else {
            // console.log("注册成功")
            const toast = Toast.loading({
              duration: 0,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              message: '注册成功,请登录', // 提示内容
              loadingType: 'spinner', // 加载图标类型
              selector: '#custom-selector'  // 自定义选择器
            });
            // 计数器
            let second = 1;
            const timer = setInterval(() => {
              second--;
              if (second) {
              } else {
                clearInterval(timer);
                Toast.clear();
                // 给缓存添加用户名
                try {
                  wx.setStorageSync('key', data.username)
                } catch (e) { }
                // 返回tarbar页需要用swichTab
                wx.switchTab({
                  url: '/pages/index/index'
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
